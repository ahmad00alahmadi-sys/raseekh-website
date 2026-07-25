/* Login + active-presence tracking for Raseekh admin stats. */
(function (global) {
  const STORE_KEY = 'raseekh_user_activity_v1';
  const ACTIVE_MS = 15 * 60 * 1000; // 15 minutes

  function readStore() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return { users: {} };
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return { users: {} };
      return { users: parsed.users && typeof parsed.users === 'object' ? parsed.users : {} };
    } catch (_) {
      return { users: {} };
    }
  }

  function writeStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store || { users: {} }));
  }

  function userKey(user) {
    if (!user) return '';
    // Prefer email so local + cloud keys stay aligned (Supabase ids differ from email keys).
    return String(user.email || user.id || '').trim().toLowerCase();
  }

  function findPrev(store, user) {
    const key = userKey(user);
    if (key && store.users[key]) return { key, prev: store.users[key] };
    const email = String(user && user.email || '').trim().toLowerCase();
    const id = String(user && user.id || '').trim().toLowerCase();
    if (email && store.users[email]) return { key: email, prev: store.users[email] };
    if (id && store.users[id]) return { key: id, prev: store.users[id] };
    return { key: key || email || id, prev: {} };
  }

  function touch(user, opts) {
    const store = readStore();
    const found = findPrev(store, user);
    const key = found.key;
    if (!key) return null;
    const now = new Date().toISOString();
    const nowMs = Date.now();
    const prev = found.prev || {};
    let isLogin = !!(opts && opts.login);
    // Avoid double-count when homepage login redirects into dashboard.
    if (isLogin && prev.lastLoginAt) {
      const last = new Date(prev.lastLoginAt).getTime();
      if (last && (nowMs - last) < 2 * 60 * 1000) isLogin = false;
    }
    const next = {
      id: user.id || prev.id || '',
      email: user.email || prev.email || key,
      name: (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.display_name)) || prev.name || '',
      role: (opts && opts.role) || prev.role || 'client',
      firstLoginAt: prev.firstLoginAt || now,
      lastLoginAt: isLogin ? now : (prev.lastLoginAt || now),
      lastSeenAt: now,
      loginCount: (Number(prev.loginCount) || 0) + (isLogin ? 1 : 0)
    };
    // Drop legacy id-keyed duplicate if we now store under email.
    if (user.email && user.id) {
      const idKey = String(user.id).trim().toLowerCase();
      if (idKey && idKey !== key && store.users[idKey]) delete store.users[idKey];
    }
    store.users[key] = next;
    writeStore(store);
    pushCloud(next).then((ok) => {
      const latest = readStore();
      if (!latest.users[key]) return;
      if (ok) delete latest.users[key].syncPending;
      else latest.users[key].syncPending = true;
      writeStore(latest);
    }).catch(() => {
      const latest = readStore();
      if (!latest.users[key]) return;
      latest.users[key].syncPending = true;
      writeStore(latest);
    });
    // Notify on login intent even when count is debounced (homepage → dashboard).
    if (opts && opts.login) notifyLoginAlert(next);
    return next;
  }

  const inFlightLoginAlerts = new Map();
  const LOGIN_NOTIFY_KEY = 'raseekh_login_notified_v1';

  function isLoginNotifyThrottled(email) {
    try {
      const map = JSON.parse(localStorage.getItem(LOGIN_NOTIFY_KEY) || '{}') || {};
      const last = map[email] ? new Date(map[email]).getTime() : 0;
      return !!(last && (Date.now() - last) < 6 * 60 * 60 * 1000);
    } catch (_) {
      return false;
    }
  }

  async function notifyLoginAlert(row, opts) {
    try {
      if (!row || row.role === 'admin') return;
      const Auth = global.RaseekhAuth;
      if (Auth && Auth.isAdminEmail && Auth.isAdminEmail(row.email)) return;
      const Catalog = global.RaseekhCatalog;
      if (!Catalog || !Catalog.notifyAdminEmail) return;
      const email = String(row.email || '').toLowerCase();
      if (!email) return;

      const existing = inFlightLoginAlerts.get(email);
      if (existing) {
        await existing;
        // First run succeeded (or soft-throttled) — stop. On hard fail, retry once.
        if (isLoginNotifyThrottled(email) || (opts && opts._retried)) return;
        return notifyLoginAlert(row, { _retried: true });
      }

      const run = (async () => {
        if (Catalog.syncPublicNotifyFromCloud) {
          try { await Catalog.syncPublicNotifyFromCloud(); } catch (_) {}
        }

        const store = (() => {
          try { return JSON.parse(localStorage.getItem('raseekh_admin_store_v1') || '{}'); }
          catch (_) { return {}; }
        })();
        const publicCfg = (() => {
          try { return JSON.parse(localStorage.getItem('raseekh_public_notify_v1') || '{}'); }
          catch (_) { return {}; }
        })();
        // Prefer published public/cloud flag; don't let a stale admin-local false suppress alerts.
        const published = !!(publicCfg.notifyEmail || publicCfg.webhookUrl);
        const loginAlertsOn = published
          ? publicCfg.notifyOnLogin !== false
          : store.notifyOnLogin !== false;
        if (!loginAlertsOn) return;
        if (!Catalog.resolveNotifyEmail || !Catalog.resolveNotifyEmail()) return;

        let map = {};
        try { map = JSON.parse(localStorage.getItem(LOGIN_NOTIFY_KEY) || '{}') || {}; } catch (_) { map = {}; }
        const last = map[email] ? new Date(map[email]).getTime() : 0;
        if (last && (Date.now() - last) < 6 * 60 * 60 * 1000) return;

        const result = await Catalog.notifyAdminEmail({
          title: 'تسجيل دخول عميل',
          type: 'login',
          name: row.name || email,
          email: email,
          phone: '',
          company: '',
          message: 'دخل العميل إلى حساب راسخ. عدد مرات الدخول: ' + (Number(row.loginCount) || 1),
          source: 'login',
          id: 'login-' + email
        });
        if (result && result.ok) {
          map[email] = new Date().toISOString();
          try { localStorage.setItem(LOGIN_NOTIFY_KEY, JSON.stringify(map)); } catch (_) {}
        } else if (result && result.pendingConfirm) {
          // Soft throttle while FormSubmit activation is pending — avoid spam, allow sooner retry than 6h.
          map[email] = new Date(Date.now() - (6 * 60 * 60 * 1000) + (15 * 60 * 1000)).toISOString();
          try { localStorage.setItem(LOGIN_NOTIFY_KEY, JSON.stringify(map)); } catch (_) {}
        }
        // Hard failures: do not stamp — next login / coalesce waiter can retry notify.
      })();

      inFlightLoginAlerts.set(email, run);
      try { await run; } finally {
        if (inFlightLoginAlerts.get(email) === run) inFlightLoginAlerts.delete(email);
      }
    } catch (_) {}
  }

  function recordLogin(user, role) {
    return touch(user, { login: true, role: role || 'client' });
  }

  function heartbeat(user, role) {
    return touch(user, { login: false, role: role || 'client' });
  }

  function listUsers() {
    const store = readStore();
    return Object.keys(store.users).map((k) => store.users[k]).filter(Boolean);
  }

  function isActive(row, nowMs) {
    if (!row || !row.lastSeenAt) return false;
    const t = new Date(row.lastSeenAt).getTime();
    if (!t) return false;
    return (nowMs - t) <= ACTIVE_MS;
  }

  function getStats() {
    const users = listUsers();
    const now = Date.now();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const startMs = start.getTime();
    const active = users.filter((u) => isActive(u, now));
    const loginsToday = users.filter((u) => {
      const t = new Date(u.lastLoginAt || 0).getTime();
      return t >= startMs;
    });
    const totalLogins = users.reduce((sum, u) => sum + (Number(u.loginCount) || 0), 0);
    return {
      registered: users.length,
      activeNow: active.length,
      loginsToday: loginsToday.length,
      totalLogins: totalLogins,
      users: users.sort((a, b) => new Date(b.lastSeenAt || 0) - new Date(a.lastSeenAt || 0))
    };
  }

  function newerIso(a, b) {
    const ta = a ? new Date(a).getTime() : 0;
    const tb = b ? new Date(b).getTime() : 0;
    if (!ta && !tb) return '';
    return ta >= tb ? (a || '') : (b || '');
  }

  function olderIso(a, b) {
    const ta = a ? new Date(a).getTime() : 0;
    const tb = b ? new Date(b).getTime() : 0;
    if (!ta) return b || '';
    if (!tb) return a || '';
    return ta <= tb ? a : b;
  }

  async function pushCloud(row) {
    try {
      const sb = global.RaseekhAuth && global.RaseekhAuth.supabase;
      if (!sb || !row) return false;
      const { error } = await sb.from('user_activity').upsert({
        user_key: String(row.email || row.id || '').toLowerCase(),
        user_id: row.id || '',
        email: row.email || '',
        name: row.name || '',
        role: row.role || 'client',
        first_login_at: row.firstLoginAt,
        last_login_at: row.lastLoginAt,
        last_seen_at: row.lastSeenAt,
        login_count: Number(row.loginCount) || 0,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_key' });
      return !error;
    } catch (_) {
      return false;
    }
  }

  function mergeUserRow(prev, incoming) {
    return {
      id: incoming.id || prev.id || '',
      email: incoming.email || prev.email || '',
      name: incoming.name || prev.name || '',
      role: (incoming.role === 'admin' || prev.role === 'admin') ? 'admin' : (incoming.role || prev.role || 'client'),
      firstLoginAt: olderIso(incoming.firstLoginAt, prev.firstLoginAt),
      lastLoginAt: newerIso(incoming.lastLoginAt, prev.lastLoginAt),
      lastSeenAt: newerIso(incoming.lastSeenAt, prev.lastSeenAt),
      loginCount: Math.max(Number(incoming.loginCount) || 0, Number(prev.loginCount) || 0)
    };
  }

  async function syncFromCloud() {
    try {
      const sb = global.RaseekhAuth && global.RaseekhAuth.supabase;
      if (!sb) return getStats();
      // Retry any local rows that never reached the cloud.
      const localStore = readStore();
      const pending = Object.keys(localStore.users || {})
        .map((k) => localStore.users[k])
        .filter((u) => u && u.syncPending);
      for (const row of pending) {
        const ok = await pushCloud(row);
        const key = String((row && (row.email || row.id)) || '').toLowerCase();
        if (ok && key && localStore.users[key]) delete localStore.users[key].syncPending;
      }
      if (pending.length) writeStore(localStore);

      const { data, error } = await sb.from('user_activity').select('*').limit(500);
      if (error || !Array.isArray(data)) return getStats();
      const store = readStore();
      data.forEach((row) => {
        const email = String(row.email || '').toLowerCase();
        const key = String(email || row.user_key || row.user_id || '').toLowerCase();
        if (!key) return;
        const prev = store.users[key] || {};
        store.users[key] = mergeUserRow(prev, {
          id: row.user_id || '',
          email: email || key,
          name: row.name || '',
          role: row.role || 'client',
          firstLoginAt: row.first_login_at || '',
          lastLoginAt: row.last_login_at || '',
          lastSeenAt: row.last_seen_at || '',
          loginCount: Number(row.login_count) || 0
        });
        delete store.users[key].syncPending;
        // Remove id-keyed duplicates after email merge.
        const idKey = String(row.user_id || '').toLowerCase();
        if (idKey && idKey !== key && store.users[idKey]) delete store.users[idKey];
      });
      writeStore(store);
      return getStats();
    } catch (_) {
      return getStats();
    }
  }

  async function probeCloud() {
    try {
      const sb = global.RaseekhAuth && global.RaseekhAuth.supabase;
      if (!sb) return { ok: false, reason: 'no-client' };
      const { error } = await sb.from('user_activity').select('user_key').limit(1);
      if (error) return { ok: false, reason: error.message || 'table-missing' };
      return { ok: true };
    } catch (err) {
      return { ok: false, reason: String(err && err.message || err || 'error') };
    }
  }

  global.RaseekhActivity = {
    ACTIVE_MS,
    recordLogin,
    heartbeat,
    getStats,
    syncFromCloud,
    listUsers,
    probeCloud
  };

  if (typeof global.addEventListener === 'function') {
    global.addEventListener('online', () => {
      syncFromCloud().catch(() => {});
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
