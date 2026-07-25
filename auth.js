/* Raseekh auth: Supabase when available, local fallback when cloud auth is down. */
(function (global) {
  const SUPABASE_URL = 'https://dupdkohciluepwrfuhod.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_UVbMT7eplHHBNdZbOpLssw_UUEYTxFA';
  const USERS_KEY = 'raseekh_local_users_v1';
  const SESSION_KEY = 'raseekh_local_session_v1';
  const SALT = 'raseekh-auth-v1';
  /* Only these accounts can edit catalog / sales desk. Everyone else is a client. */
  const ADMIN_EMAILS = ['ahmad00alahmadi@gmail.com'];

  let supabaseClient = null;
  let cloudReady = null;

  try {
    if (global.supabase) {
      supabaseClient = global.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
    }
  } catch (e) {
    console.warn('Supabase init failed', e);
    supabaseClient = null;
  }

  function readUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch (_) { return []; }
  }

  function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function isAdminEmail(email) {
    return ADMIN_EMAILS.indexOf(normalizeEmail(email)) !== -1;
  }

  function isAdmin(user) {
    if (!user) return false;
    return isAdminEmail(user.email);
  }

  function withRole(user) {
    if (!user) return null;
    const role = isAdmin(user) ? 'admin' : 'client';
    const meta = Object.assign({}, user.user_metadata || {}, { role: role });
    const app = Object.assign({}, user.app_metadata || {}, { role: role });
    return Object.assign({}, user, { user_metadata: meta, app_metadata: app, role: role });
  }

  function publicUser(row) {
    return withRole({
      id: row.id,
      email: row.email,
      user_metadata: {
        full_name: row.full_name || '',
        phone: row.phone || '',
        display_name: row.full_name || ''
      },
      app_metadata: { provider: 'local' }
    });
  }

  async function hashPassword(password) {
    const data = new TextEncoder().encode(SALT + '::' + password);
    if (global.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback for very old browsers
    let h = 0;
    const s = SALT + '::' + password;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return 'x' + Math.abs(h);
  }

  function setLocalSession(user) {
    const session = { user: publicUser(user), at: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function clearLocalSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getLocalSession() {
    try {
      const raw = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      if (!raw || !raw.user) return null;
      return raw;
    } catch (_) {
      return null;
    }
  }

  function isNetworkAuthError(err) {
    if (!err) return false;
    const msg = String(err.message || err).toLowerCase();
    return (
      msg.includes('load failed') ||
      msg.includes('failed to fetch') ||
      msg.includes('network') ||
      msg.includes('fetch') ||
      msg.includes('timeout') ||
      msg.includes('dns') ||
      err.name === 'TypeError'
    );
  }

  async function probeCloud(timeoutMs) {
    if (!supabaseClient) return false;
    if (cloudReady !== null) return cloudReady;
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = setTimeout(() => { try { ctrl && ctrl.abort(); } catch (_) {} }, timeoutMs || 2500);
    try {
      const res = await fetch(SUPABASE_URL + '/auth/v1/health', {
        method: 'GET',
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY },
        signal: ctrl ? ctrl.signal : undefined
      });
      cloudReady = res.ok || res.status === 401 || res.status === 404;
    } catch (_) {
      cloudReady = false;
    } finally {
      clearTimeout(timer);
    }
    return cloudReady;
  }

  async function localSignUp({ email, password, full_name, phone }) {
    const normalized = String(email || '').trim().toLowerCase();
    if (!normalized || !password || password.length < 6) {
      throw new Error('INVALID_INPUT');
    }
    const users = readUsers();
    if (users.some(u => u.email === normalized)) {
      throw new Error('ALREADY_REGISTERED');
    }
    const row = {
      id: 'local-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8),
      email: normalized,
      password_hash: await hashPassword(password),
      full_name: String(full_name || '').trim(),
      phone: String(phone || '').trim(),
      created_at: new Date().toISOString()
    };
    users.push(row);
    writeUsers(users);
    const session = setLocalSession(row);
    return { user: session.user, session: { user: session.user }, provider: 'local' };
  }

  async function localSignIn({ email, password }) {
    const normalized = String(email || '').trim().toLowerCase();
    const users = readUsers();
    const row = users.find(u => u.email === normalized);
    if (!row) throw new Error('INVALID_CREDENTIALS');
    const hash = await hashPassword(password);
    if (hash !== row.password_hash) throw new Error('INVALID_CREDENTIALS');
    const session = setLocalSession(row);
    return { user: session.user, session: { user: session.user }, provider: 'local' };
  }

  async function localUpdatePassword(email, newPassword) {
    const normalized = String(email || '').trim().toLowerCase();
    const users = readUsers();
    const idx = users.findIndex(u => u.email === normalized);
    if (idx < 0) throw new Error('NOT_FOUND');
    users[idx].password_hash = await hashPassword(newPassword);
    writeUsers(users);
    setLocalSession(users[idx]);
    return true;
  }

  async function localUpdateProfile(userId, { full_name, phone, password }) {
    const users = readUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx < 0) throw new Error('NOT_FOUND');
    if (full_name != null) users[idx].full_name = String(full_name).trim();
    if (phone != null) users[idx].phone = String(phone).trim();
    if (password) users[idx].password_hash = await hashPassword(password);
    writeUsers(users);
    setLocalSession(users[idx]);
    return publicUser(users[idx]);
  }

  async function signUp({ email, password, full_name, phone }) {
    const cloud = await probeCloud(2000);
    if (cloud && supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: { data: { full_name: full_name || '', phone: phone || '' } }
        });
        if (error) {
          if (isNetworkAuthError(error)) return localSignUp({ email, password, full_name, phone });
          throw error;
        }
        if (data.user) {
          try {
            await supabaseClient.from('profiles').upsert({
              id: data.user.id,
              full_name: full_name || '',
              phone: phone || '',
              email
            });
          } catch (_) {}
        }
        // Email confirmation enabled: account created in cloud but no JWT yet.
        // Do NOT invent a local session — cloud sync/RLS would silently fail.
        if (!data.session) {
          return {
            user: data.user ? withRole(data.user) : null,
            session: null,
            provider: 'supabase',
            needsEmailConfirm: true
          };
        }
        clearLocalSession();
        return { user: withRole(data.user), session: data.session, provider: 'supabase' };
      } catch (err) {
        if (isNetworkAuthError(err)) return localSignUp({ email, password, full_name, phone });
        throw err;
      }
    }
    return localSignUp({ email, password, full_name, phone });
  }

  async function signIn({ email, password }) {
    const cloud = await probeCloud(2000);
    if (cloud && supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) {
          // Only fall back to local when the cloud is unreachable — never on wrong password.
          if (isNetworkAuthError(error)) return localSignIn({ email, password });
          throw error;
        }
        clearLocalSession();
        return { user: withRole(data.user), session: data.session, provider: 'supabase' };
      } catch (err) {
        if (isNetworkAuthError(err)) return localSignIn({ email, password });
        throw err;
      }
    }
    return localSignIn({ email, password });
  }

  async function signOut() {
    clearLocalSession();
    if (supabaseClient) {
      try { await supabaseClient.auth.signOut(); } catch (_) {}
    }
  }

  async function getSession() {
    if (supabaseClient) {
      try {
        const cloud = await probeCloud(1500);
        if (cloud) {
          const { data } = await supabaseClient.auth.getSession();
          if (data?.session?.user) {
            clearLocalSession();
            const user = withRole(data.session.user);
            return { user: user, session: data.session, provider: 'supabase' };
          }
        }
      } catch (_) {}
    }
    const local = getLocalSession();
    if (local?.user) {
      const user = withRole(local.user);
      return { user: user, session: Object.assign({}, local, { user: user }), provider: 'local' };
    }
    return { user: null, session: null, provider: null };
  }

  async function resetPasswordRequest(email) {
    const cloud = await probeCloud(2000);
    if (cloud && supabaseClient) {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: global.location.origin + '/#reset'
      });
      if (error && !isNetworkAuthError(error)) throw error;
      if (!error) return { provider: 'supabase' };
    }
    // Local fallback: stash email for reset panel
    const users = readUsers();
    const exists = users.some(u => u.email === String(email || '').trim().toLowerCase());
    if (!exists) throw new Error('NOT_FOUND');
    sessionStorage.setItem('raseekh_reset_email', String(email || '').trim().toLowerCase());
    return { provider: 'local' };
  }

  async function completePasswordReset(newPassword) {
    if (supabaseClient) {
      try {
        const { data } = await supabaseClient.auth.getSession();
        if (data?.session) {
          const { error } = await supabaseClient.auth.updateUser({ password: newPassword });
          if (!error) return { provider: 'supabase' };
        }
      } catch (_) {}
    }
    const email = sessionStorage.getItem('raseekh_reset_email') || getLocalSession()?.user?.email;
    if (!email) throw new Error('NOT_FOUND');
    await localUpdatePassword(email, newPassword);
    sessionStorage.removeItem('raseekh_reset_email');
    return { provider: 'local' };
  }

  async function updateUser({ full_name, phone, password }) {
    const current = await getSession();
    if (!current.user) throw new Error('NOT_FOUND');
    if (current.provider === 'supabase' && supabaseClient) {
      try {
        const updates = {};
        if (password) updates.password = password;
        const meta = Object.assign({}, current.user.user_metadata || {});
        if (full_name != null) {
          meta.full_name = String(full_name).trim();
          meta.display_name = meta.full_name;
        }
        if (phone != null) meta.phone = String(phone).trim();
        if (full_name != null || phone != null) updates.data = meta;
        if (Object.keys(updates).length) {
          const { data, error } = await supabaseClient.auth.updateUser(updates);
          if (error && !isNetworkAuthError(error)) throw error;
          if (!error) {
            try {
              await supabaseClient.from('profiles').upsert({
                id: current.user.id,
                full_name: meta.full_name || '',
                phone: meta.phone || '',
                email: current.user.email || ''
              });
            } catch (_) {}
            return withRole(data && data.user ? data.user : Object.assign({}, current.user, { user_metadata: meta }));
          }
        }
      } catch (err) {
        if (!isNetworkAuthError(err)) throw err;
      }
    }
    return localUpdateProfile(current.user.id, { full_name, phone, password });
  }

  function friendlyError(err, lang) {
    const code = String(err && err.message ? err.message : err || '');
    const ar = lang !== 'en';
    if (code === 'ALREADY_REGISTERED' || /already registered|already been registered/i.test(code)) {
      return ar ? 'هذا البريد مسجّل مسبقاً' : 'Email already registered';
    }
    if (code === 'INVALID_CREDENTIALS' || /invalid login|invalid credentials|invalid email or password/i.test(code)) {
      return ar ? 'البريد أو كلمة المرور غير صحيحة' : 'Incorrect email or password';
    }
    if (code === 'INVALID_INPUT') {
      return ar ? 'تأكد من البريد وكلمة المرور (6 أحرف على الأقل)' : 'Check email and password (min 6 chars)';
    }
    if (code === 'NOT_FOUND') {
      return ar ? 'الحساب غير موجود' : 'Account not found';
    }
    if (code === 'EMAIL_CONFIRM_REQUIRED' || /email.*confirm|confirm.*email|email not confirmed/i.test(code)) {
      return ar ? 'تحققوا من البريد لتفعيل الحساب ثم سجّلوا الدخول' : 'Check your email to activate the account, then sign in';
    }
    if (isNetworkAuthError(err)) {
      return ar ? 'تعذّر الاتصال بالخادم، تم استخدام الحساب المحلي' : 'Cloud unavailable, using local account';
    }
    return ar ? 'حدث خطأ، حاول مرة أخرى' : 'Something went wrong, please try again';
  }

  global.RaseekhAuth = {
    ADMIN_EMAILS: ADMIN_EMAILS.slice(),
    signUp,
    signIn,
    signOut,
    getSession,
    resetPasswordRequest,
    completePasswordReset,
    updateUser,
    friendlyError,
    probeCloud,
    isAdmin,
    isAdminEmail,
    withRole,
    get supabase() { return supabaseClient; }
  };
})(window);
