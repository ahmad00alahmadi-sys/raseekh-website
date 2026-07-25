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
    return String(user.id || user.email || '').trim().toLowerCase();
  }

  function touch(user, opts) {
    const key = userKey(user);
    if (!key) return null;
    const store = readStore();
    const now = new Date().toISOString();
    const nowMs = Date.now();
    const prev = store.users[key] || {};
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
    store.users[key] = next;
    writeStore(store);
    pushCloud(next, isLogin);
    return next;
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

  async function pushCloud(row, isLogin) {
    try {
      const sb = global.RaseekhAuth && global.RaseekhAuth.supabase;
      if (!sb || !row) return;
      await sb.from('user_activity').upsert({
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
      if (isLogin) {
        // best-effort; ignore failures
      }
    } catch (_) {}
  }

  async function syncFromCloud() {
    try {
      const sb = global.RaseekhAuth && global.RaseekhAuth.supabase;
      if (!sb) return getStats();
      const { data, error } = await sb.from('user_activity').select('*').limit(500);
      if (error || !Array.isArray(data)) return getStats();
      const store = readStore();
      data.forEach((row) => {
        const key = String(row.user_key || row.email || row.user_id || '').toLowerCase();
        if (!key) return;
        const prev = store.users[key] || {};
        store.users[key] = {
          id: row.user_id || prev.id || '',
          email: row.email || prev.email || key,
          name: row.name || prev.name || '',
          role: row.role || prev.role || 'client',
          firstLoginAt: row.first_login_at || prev.firstLoginAt || '',
          lastLoginAt: row.last_login_at || prev.lastLoginAt || '',
          lastSeenAt: row.last_seen_at || prev.lastSeenAt || '',
          loginCount: Math.max(Number(row.login_count) || 0, Number(prev.loginCount) || 0)
        };
      });
      writeStore(store);
      return getStats();
    } catch (_) {
      return getStats();
    }
  }

  global.RaseekhActivity = {
    ACTIVE_MS,
    recordLogin,
    heartbeat,
    getStats,
    syncFromCloud,
    listUsers
  };
})(typeof window !== 'undefined' ? window : globalThis);
