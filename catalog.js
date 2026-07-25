/* Shared Raseekh catalog: real offerings with quote-based pricing by default. */
(function (global) {
  const PUBLIC_KEY = 'raseekh_client_catalog_v1';
  const SUGGESTIONS_KEY = 'raseekh_client_suggestions_v1';
  const ADMIN_PRODUCTS_KEY = 'raseekh_admin_products_v1';
  const VERSION_KEY = 'raseekh_catalog_version';
  const SUGGESTIONS_VERSION_KEY = 'raseekh_suggestions_version';
  const CATALOG_VERSION = 6;
  const SUGGESTIONS_VERSION = 4;
  const CLIENT_REQUESTS_KEY = 'raseekh_all_client_requests_v1';

  // Hardware (p1–p4) stays admin-only for now: physical supply is Riyadh-only.
  // Clients currently see digital/electronic services only.
  const DEFAULT_PRODUCTS = [
    {
      id: 'p1', name: 'أجهزة لابتوب للأعمال', name_en: 'Business laptops',
      category: 'أجهزة', category_en: 'Devices',
      desc: 'توريد أجهزة لابتوب حسب مواصفات عملكم — متاح حالياً داخل الرياض فقط.',
      desc_en: 'Business laptops to your specs — currently available in Riyadh only.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'product', client: false, region: 'riyadh'
    },
    {
      id: 'p2', name: 'طابعات وأجهزة نقاط بيع', name_en: 'Printers & POS hardware',
      category: 'أجهزة', category_en: 'Devices',
      desc: 'طابعات فواتير وتجهيزات كاشير — متاح حالياً داخل الرياض فقط.',
      desc_en: 'Receipt printers and till hardware — currently available in Riyadh only.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'product', client: false, region: 'riyadh'
    },
    {
      id: 'p3', name: 'شبكات وراوترات مكتبية', name_en: 'Office networking gear',
      category: 'شبكات', category_en: 'Networking',
      desc: 'تجهيز شبكة للمكاتب والفروع — متاح حالياً داخل الرياض فقط.',
      desc_en: 'Office/branch networking setup — currently available in Riyadh only.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'product', client: false, region: 'riyadh'
    },
    {
      id: 'p4', name: 'شاشات واكسسوارات تقنية', name_en: 'Monitors & tech accessories',
      category: 'اكسسوارات', category_en: 'Accessories',
      desc: 'شاشات وتخزين وكابلات — متاح حالياً داخل الرياض فقط.',
      desc_en: 'Monitors, storage, and cables — currently available in Riyadh only.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'product', client: false, region: 'riyadh'
    },
    {
      id: 'p5', name: 'صيانة مواقع إلكترونية', name_en: 'Website maintenance',
      category: 'خدمات', category_en: 'Services',
      desc: 'تحديثات، إصلاح أعطال، تحسين سرعة، ومتابعة أمان — عرض شهري حسب حجم الموقع.',
      desc_en: 'Updates, fixes, speed, and security — monthly quote by site size.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p6', name: 'تطوير مواقع إلكترونية', name_en: 'Website development',
      category: 'برمجة', category_en: 'Programming',
      desc: 'تصميم وبرمجة مواقع شركات ومتاجر ولوحات عربية/إنجليزية — السعر حسب النطاق.',
      desc_en: 'Company sites, stores, and dashboards in AR/EN — priced by scope.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p7', name: 'تعديل وتحسين البرمجة', name_en: 'Code modification & improvement',
      category: 'برمجة', category_en: 'Programming',
      desc: 'إصلاح أخطاء، إضافة مزايا، وتحسين أداء مشروعكم الحالي بعد مراجعة الكود.',
      desc_en: 'Bug fixes, features, and performance after reviewing your codebase.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p8', name: 'برمجة أنظمة ولوحات تحكم', name_en: 'Systems & dashboards',
      category: 'برمجة', category_en: 'Programming',
      desc: 'أنظمة إدارة ومخزون وعملاء حسب نشاطكم — عرض سعر بعد تحديد المتطلبات.',
      desc_en: 'Management, inventory, and CRM systems — quote after requirements.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p9', name: 'ربط API وأنظمة خارجية', name_en: 'API & integrations',
      category: 'برمجة', category_en: 'Programming',
      desc: 'ربط الدفع والرسائل والأنظمة الخارجية بمشروعكم — حسب عدد الربط والتعقيد.',
      desc_en: 'Payments, messaging, and external systems — by integration complexity.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p10', name: 'نظام مخصص كامل', name_en: 'Complete custom system',
      category: 'خدمات', category_en: 'Services',
      desc: 'بناء نظام متكامل من الدراسة إلى التشغيل — عقد واضح ونطاق متفق عليه.',
      desc_en: 'Full system from discovery to go-live — clear scope and agreement.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    }
  ];

  const DEFAULT_SUGGESTIONS = [
    {
      id: 'sg2',
      title: 'صيانة وتطوير موقع',
      title_en: 'Site care & development',
      desc: 'صيانة مستمرة مع تعديلات برمجية حسب احتياج موقعكم الحالي.',
      desc_en: 'Ongoing maintenance plus code changes for your current site.',
      productIds: ['p5', 'p7'],
      badge: 'للمواقع الحالية',
      badge_en: 'For existing sites'
    },
    {
      id: 'sg3',
      title: 'إطلاق موقع جديد',
      title_en: 'New website launch',
      desc: 'تطوير موقع + ربط تقني + صيانة بعد الإطلاق — عرض مفصل بعد الاجتماع.',
      desc_en: 'Website build + integrations + post-launch care — detailed quote after a call.',
      productIds: ['p6', 'p9', 'p5'],
      badge: 'الأكثر طلباً',
      badge_en: 'Most requested'
    },
    {
      id: 'sg4',
      title: 'نظام تشغيلي متكامل',
      title_en: 'Complete operating system',
      desc: 'نظام مخصص + لوحة تحكم + ربط خارجي — نبدأ بتحليل احتياجكم ثم التسعير.',
      desc_en: 'Custom system + dashboard + integrations — discovery first, then pricing.',
      productIds: ['p10', 'p8', 'p9'],
      badge: 'للمنشآت',
      badge_en: 'For businesses'
    },
    {
      id: 'sg5',
      title: 'باقة برمجة سريعة',
      title_en: 'Quick coding package',
      desc: 'تعديل برمجة + ربط بسيط — مناسبة لطلب إلكتروني واضح بدون أجهزة.',
      desc_en: 'Code change + light integration — for a clear digital request, no hardware.',
      productIds: ['p7', 'p9'],
      badge: 'إلكتروني',
      badge_en: 'Digital'
    }
  ];

  function cloneList(list) {
    return list.map((item) => Object.assign({}, item, {
      productIds: item.productIds ? item.productIds.slice() : undefined
    }));
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function isQuote(item) {
    if (!item) return true;
    if (item.priceMode === 'fixed' && Number(item.price) > 0) return false;
    if (item.priceMode === 'quote') return true;
    return !(Number(item.price) > 0);
  }

  function mergeProducts(existing) {
    const byId = new Map((existing || []).map((p) => [p.id, p]));
    DEFAULT_PRODUCTS.forEach((seed) => {
      const cur = byId.get(seed.id);
      if (!cur) {
        byId.set(seed.id, Object.assign({}, seed));
        return;
      }
      byId.set(seed.id, Object.assign({}, seed, cur, {
        name: seed.name,
        name_en: seed.name_en,
        category: seed.category,
        category_en: seed.category_en,
        desc: seed.desc,
        desc_en: seed.desc_en,
        kind: seed.kind,
        region: seed.region || cur.region || '',
        // Seed visibility wins for default catalog items (keeps hardware hidden from clients)
        client: seed.client === false ? false : (cur.client !== false),
        priceMode: cur.priceMode || seed.priceMode || 'quote',
        price: typeof cur.price === 'number' ? cur.price : seed.price,
        stock: typeof cur.stock === 'number' ? cur.stock : seed.stock
      }));
    });
    return Array.from(byId.values());
  }

  function ensureCatalogVersion(products) {
    const current = parseInt(localStorage.getItem(VERSION_KEY) || '0', 10) || 0;
    if (current < CATALOG_VERSION) {
      const seedIds = new Set(DEFAULT_PRODUCTS.map((p) => p.id));
      const custom = (products || []).filter((p) => p && !seedIds.has(p.id) && !/^p\d+$/.test(p.id));
      localStorage.setItem(VERSION_KEY, String(CATALOG_VERSION));
      return cloneList(DEFAULT_PRODUCTS).concat(custom);
    }
    return mergeProducts(products);
  }

  function ensureSuggestionsVersion() {
    const current = parseInt(localStorage.getItem(SUGGESTIONS_VERSION_KEY) || '0', 10) || 0;
    if (current < SUGGESTIONS_VERSION) {
      writeJson(SUGGESTIONS_KEY, cloneList(DEFAULT_SUGGESTIONS));
      localStorage.setItem(SUGGESTIONS_VERSION_KEY, String(SUGGESTIONS_VERSION));
    }
  }

  function pruneSuggestions(products) {
    ensureSuggestionsVersion();
    const ids = new Set((products || []).map((p) => p && p.id).filter(Boolean));
    const suggestions = getClientSuggestions().map((s) => Object.assign({}, s, {
      productIds: (s.productIds || []).filter((id) => ids.has(id))
    }));
    writeJson(SUGGESTIONS_KEY, suggestions);
    return suggestions;
  }

  function publishClientCatalog(products, suggestions) {
    const list = products || [];
    const clientProducts = list
      .filter((p) => p && p.client !== false)
      .map((p) => ({
        id: p.id,
        name: p.name,
        name_en: p.name_en || '',
        category: p.category || '',
        category_en: p.category_en || '',
        desc: p.desc || '',
        desc_en: p.desc_en || '',
        price: Number(p.price) || 0,
        priceMode: isQuote(p) ? 'quote' : 'fixed',
        stock: Number(p.stock) || 0,
        kind: p.kind || 'product',
        client: true
      }));
    const finalSuggestions = suggestions && suggestions.length
      ? suggestions
      : pruneSuggestions(list);
    writeJson(PUBLIC_KEY, clientProducts);
    writeJson(SUGGESTIONS_KEY, finalSuggestions);
    return clientProducts;
  }

  function getClientProducts() {
    const current = parseInt(localStorage.getItem(VERSION_KEY) || '0', 10) || 0;
    if (current < CATALOG_VERSION) {
      return loadAdminProducts().filter((p) => p && p.client !== false);
    }
    const stored = readJson(PUBLIC_KEY, null);
    if (stored && stored.length) return stored.filter((p) => p && p.client !== false);
    const admin = readJson(ADMIN_PRODUCTS_KEY, null);
    if (admin && admin.length) return admin.filter((p) => p && p.client !== false);
    return cloneList(DEFAULT_PRODUCTS).filter((p) => p && p.client !== false);
  }

  function getClientSuggestions() {
    ensureSuggestionsVersion();
    const stored = readJson(SUGGESTIONS_KEY, null);
    if (stored && stored.length) return stored;
    return cloneList(DEFAULT_SUGGESTIONS);
  }

  function migrateLegacyAdminProducts() {
    const existing = readJson(ADMIN_PRODUCTS_KEY, null);
    if (existing && existing.length) return existing;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || key.indexOf('raseekh_products_') !== 0) continue;
        const parsed = JSON.parse(localStorage.getItem(key) || '[]');
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (_) {}
    return null;
  }

  function loadAdminProducts() {
    const migrated = migrateLegacyAdminProducts();
    const stored = migrated || readJson(ADMIN_PRODUCTS_KEY, null);
    const ensured = ensureCatalogVersion(stored && stored.length ? stored : cloneList(DEFAULT_PRODUCTS));
    writeJson(ADMIN_PRODUCTS_KEY, ensured);
    publishClientCatalog(ensured, pruneSuggestions(ensured));
    return ensured;
  }

  function saveAdminProducts(products) {
    const list = Array.isArray(products) ? products : [];
    writeJson(ADMIN_PRODUCTS_KEY, list);
    publishClientCatalog(list, pruneSuggestions(list));
    return list;
  }

  const PUBLIC_NOTIFY_KEY = 'raseekh_public_notify_v1';

  function readObject(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function publishPublicNotify(settings) {
    const webhookUrl = String((settings && settings.webhookUrl) || '').trim();
    const notifyEmail = String((settings && settings.notifyEmail) || '').trim().toLowerCase();
    writeJson(PUBLIC_NOTIFY_KEY, {
      webhookUrl: webhookUrl || '',
      notifyEmail: notifyEmail || ''
    });
    return { webhookUrl, notifyEmail };
  }

  function resolveWebhookUrl() {
    const fromWindow = typeof global !== 'undefined' && global.RASEEKH_WEBHOOK
      ? String(global.RASEEKH_WEBHOOK).trim()
      : '';
    const publicCfg = readObject(PUBLIC_NOTIFY_KEY);
    const store = readObject('raseekh_admin_store_v1');
    return fromWindow || String(publicCfg.webhookUrl || '').trim() || String(store.webhookUrl || '').trim();
  }

  function resolveNotifyEmail() {
    const publicCfg = readObject(PUBLIC_NOTIFY_KEY);
    const store = readObject('raseekh_admin_store_v1');
    return String(publicCfg.notifyEmail || store.notifyEmail || '').trim().toLowerCase();
  }

  function getSupabase() {
    try {
      return (global.RaseekhAuth && global.RaseekhAuth.supabase) || null;
    } catch (_) {
      return null;
    }
  }

  function rowToCloud(row) {
    return {
      id: row.id,
      created_at: row.at || new Date().toISOString(),
      updated_at: row.updatedAt || null,
      name: row.name || '',
      phone: row.phone || '',
      email: row.email || '',
      company: row.company || '',
      title: row.title || '',
      message: row.message || '',
      type: row.type || 'site',
      source: row.source || 'site',
      status: row.status || 'new',
      user_id: row.userId || '',
      fingerprint: row.fingerprint || '',
      payload: row
    };
  }

  function cloudToRow(row) {
    if (!row) return null;
    const fromPayload = row.payload && typeof row.payload === 'object' ? row.payload : {};
    return Object.assign({}, fromPayload, {
      id: row.id || fromPayload.id,
      at: row.created_at || fromPayload.at,
      updatedAt: row.updated_at || fromPayload.updatedAt,
      name: row.name || fromPayload.name || '',
      phone: row.phone || fromPayload.phone || '',
      email: row.email || fromPayload.email || '',
      company: row.company || fromPayload.company || '',
      title: row.title || fromPayload.title || '',
      message: row.message || fromPayload.message || '',
      type: row.type || fromPayload.type || 'site',
      source: row.source || fromPayload.source || 'site',
      status: row.status || fromPayload.status || 'new',
      userId: row.user_id || fromPayload.userId || '',
      fingerprint: row.fingerprint || fromPayload.fingerprint || ''
    });
  }

  function notifyRequestWebhook(row) {
    try {
      const url = resolveWebhookUrl();
      if (!url || !/^https?:\/\//i.test(url)) return Promise.resolve(false);
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'raseekh.request', request: row }),
        mode: 'cors',
        keepalive: true
      }).then((res) => !!res && res.ok).catch(() => false);
    } catch (_) {
      return Promise.resolve(false);
    }
  }

  function notifyAdminEmail(row, overrideEmail) {
    try {
      const email = String(overrideEmail || resolveNotifyEmail() || '').trim().toLowerCase();
      if (!email || email.indexOf('@') < 0) return Promise.resolve({ ok: false, reason: 'no-email' });
      return fetch('https://formsubmit.co/ajax/' + encodeURIComponent(email), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'طلب جديد من موقع راسخ — ' + (row.title || row.type || 'طلب'),
          name: row.name || 'عميل',
          email: row.email || 'client@raseekh.local',
          phone: row.phone || '',
          company: row.company || '',
          type: row.type || '',
          title: row.title || '',
          message: row.message || '',
          source: row.source || '',
          request_id: row.id || '',
          _template: 'table',
          _captcha: 'false'
        }),
        mode: 'cors',
        keepalive: true
      }).then(async (res) => {
        let body = null;
        try { body = await res.json(); } catch (_) {}
        return { ok: !!res && res.ok, status: res.status, body: body };
      }).catch((err) => ({ ok: false, reason: String(err && err.message || err || 'network') }));
    } catch (err) {
      return Promise.resolve({ ok: false, reason: String(err && err.message || err || 'error') });
    }
  }

  async function pushRequestToCloud(row) {
    const sb = getSupabase();
    if (!sb || !row || !row.id) return false;
    try {
      const { error } = await sb.from('client_requests').upsert(rowToCloud(row), { onConflict: 'id' });
      return !error;
    } catch (_) {
      return false;
    }
  }

  async function probeCloudRequests() {
    const sb = getSupabase();
    if (!sb) return { ok: false, reason: 'no-client' };
    try {
      const { error } = await sb.from('client_requests').select('id').limit(1);
      if (error) return { ok: false, reason: error.message || 'table-missing' };
      return { ok: true };
    } catch (err) {
      return { ok: false, reason: String(err && err.message || err || 'error') };
    }
  }

  function getDeliveryStatus() {
    return {
      notifyEmail: resolveNotifyEmail(),
      webhookUrl: resolveWebhookUrl(),
      hasEmail: !!resolveNotifyEmail(),
      hasWebhook: !!resolveWebhookUrl(),
      hasSupabaseClient: !!getSupabase()
    };
  }

  async function syncSharedRequestsFromCloud() {
    const sb = getSupabase();
    if (!sb) return getSharedRequests();
    try {
      const { data, error } = await sb
        .from('client_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      if (error || !Array.isArray(data)) return getSharedRequests();
      const local = getSharedRequests();
      const byId = new Map();
      local.forEach((r) => { if (r && r.id) byId.set(r.id, r); });
      data.map(cloudToRow).filter(Boolean).forEach((r) => {
        const prev = byId.get(r.id);
        if (!prev) byId.set(r.id, r);
        else {
          const prevTime = new Date(prev.updatedAt || prev.at || 0).getTime();
          const nextTime = new Date(r.updatedAt || r.at || 0).getTime();
          byId.set(r.id, nextTime >= prevTime ? Object.assign({}, prev, r) : Object.assign({}, r, prev));
        }
      });
      const merged = Array.from(byId.values()).sort((a, b) => new Date(b.at || 0) - new Date(a.at || 0)).slice(0, 200);
      writeJson(CLIENT_REQUESTS_KEY, merged);
      return merged;
    } catch (_) {
      return getSharedRequests();
    }
  }

  function requestTypeLabel(type, lang) {
    const map = {
      electronics: { ar: 'منتجات إلكترونية', en: 'Electronics' },
      maintenance: { ar: 'صيانة مواقع', en: 'Website maintenance' },
      'web-dev': { ar: 'تطوير مواقع', en: 'Website development' },
      programming: { ar: 'خدمات البرمجة', en: 'Programming' },
      systems: { ar: 'أنظمة ولوحات', en: 'Systems & dashboards' },
      api: { ar: 'ربط API', en: 'API & integrations' },
      system: { ar: 'نظام كامل', en: 'Complete system' },
      product: { ar: 'منتج', en: 'Product' },
      suggestion: { ar: 'اقتراح', en: 'Suggestion' },
      site: { ar: 'طلب موقع', en: 'Website request' }
    };
    const row = map[type] || { ar: type || 'طلب', en: type || 'Request' };
    return lang === 'en' ? row.en : row.ar;
  }

  function addSharedRequest(payload) {
    const list = readJson(CLIENT_REQUESTS_KEY, []);
    const row = Object.assign({
      id: 'req-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
      at: new Date().toISOString(),
      status: 'new',
      source: 'site'
    }, payload || {});
    if (!row.fingerprint) {
      row.fingerprint = 'req:' + (row.at || '') + ':' + (row.message || '') + ':' + (row.phone || '') + ':' + (row.email || '');
    }
    const dup = list.some((x) => x.fingerprint && x.fingerprint === row.fingerprint);
    if (dup) return list.find((x) => x.fingerprint === row.fingerprint) || row;
    list.unshift(row);
    writeJson(CLIENT_REQUESTS_KEY, list.slice(0, 200));
    // Deliver outside this browser: cloud row + email + webhook (best-effort)
    Promise.resolve()
      .then(() => pushRequestToCloud(row))
      .then(() => notifyAdminEmail(row))
      .then(() => notifyRequestWebhook(row))
      .catch(() => {});
    return row;
  }

  async function deliverSharedRequest(row) {
    const cloud = await pushRequestToCloud(row);
    const email = await notifyAdminEmail(row);
    const webhook = await notifyRequestWebhook(row);
    return {
      cloud: !!cloud,
      email: !!(email && email.ok),
      webhook: !!webhook,
      emailDetail: email || null
    };
  }

  function getSharedRequests() {
    return readJson(CLIENT_REQUESTS_KEY, []);
  }

  function saveSharedRequests(list) {
    writeJson(CLIENT_REQUESTS_KEY, (list || []).slice(0, 200));
  }

  function updateSharedRequestStatus(id, status) {
    const list = getSharedRequests();
    const idx = list.findIndex((r) => r.id === id);
    if (idx < 0) return null;
    list[idx] = Object.assign({}, list[idx], { status: status || list[idx].status, updatedAt: new Date().toISOString() });
    saveSharedRequests(list);
    pushRequestToCloud(list[idx]).catch(() => {});
    return list[idx];
  }

  function money(n, lang) {
    const value = (Number(n) || 0).toFixed(2);
    return lang === 'en' ? value + ' SAR' : value + ' ر.س';
  }

  function formatPrice(item, lang) {
    if (isQuote(item)) return lang === 'en' ? 'Quote on request' : 'حسب الطلب';
    return money(item.price, lang);
  }

  function suggestionPriceLabel(suggestion, products, lang) {
    const map = new Map((products || []).map((p) => [p.id, p]));
    const items = (suggestion.productIds || []).map((id) => map.get(id)).filter(Boolean);
    if (!items.length || items.some(isQuote)) {
      return lang === 'en' ? 'Custom quote after review' : 'عرض سعر بعد المراجعة';
    }
    const total = items.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
    return (lang === 'en' ? 'Approx. total: ' : 'الإجمالي التقريبي: ') + money(total, lang);
  }

  function label(item, lang, arKey, enKey) {
    if (!item) return '';
    if (lang === 'en' && item[enKey]) return item[enKey];
    return item[arKey] || item[enKey] || '';
  }

  function suggestionTotal(suggestion, products) {
    const map = new Map((products || []).map((p) => [p.id, p]));
    return (suggestion.productIds || []).reduce((sum, id) => {
      const p = map.get(id);
      if (!p || isQuote(p)) return sum;
      return sum + (Number(p.price) || 0);
    }, 0);
  }

  function suggestionItems(suggestion, products, lang) {
    const map = new Map((products || []).map((p) => [p.id, p]));
    return (suggestion.productIds || []).map((id) => map.get(id)).filter(Boolean).map((p) => label(p, lang, 'name', 'name_en'));
  }

  global.RaseekhCatalog = {
    CATALOG_VERSION,
    CLIENT_REQUESTS_KEY,
    DEFAULT_PRODUCTS: cloneList(DEFAULT_PRODUCTS),
    DEFAULT_SUGGESTIONS: cloneList(DEFAULT_SUGGESTIONS),
    ensureCatalogVersion,
    mergeProducts,
    publishClientCatalog,
    getClientProducts,
    getClientSuggestions,
    loadAdminProducts,
    saveAdminProducts,
    pruneSuggestions,
    addSharedRequest,
    deliverSharedRequest,
    notifyRequestWebhook,
    notifyAdminEmail,
    publishPublicNotify,
    resolveWebhookUrl,
    resolveNotifyEmail,
    getDeliveryStatus,
    probeCloudRequests,
    requestTypeLabel,
    pushRequestToCloud,
    syncSharedRequestsFromCloud,
    getSharedRequests,
    saveSharedRequests,
    updateSharedRequestStatus,
    money,
    formatPrice,
    suggestionPriceLabel,
    isQuote,
    label,
    suggestionTotal,
    suggestionItems
  };
})(typeof window !== 'undefined' ? window : globalThis);
