/* Shared Raseekh catalog: real offerings with quote-based pricing by default. */
(function (global) {
  const PUBLIC_KEY = 'raseekh_client_catalog_v1';
  const SUGGESTIONS_KEY = 'raseekh_client_suggestions_v1';
  const ADMIN_PRODUCTS_KEY = 'raseekh_admin_products_v1';
  const VERSION_KEY = 'raseekh_catalog_version';
  const SUGGESTIONS_VERSION_KEY = 'raseekh_suggestions_version';
  const CATALOG_VERSION = 9;
  const SUGGESTIONS_VERSION = 7;
  const CLIENT_REQUESTS_KEY = 'raseekh_all_client_requests_v1';
  const PAYMENTS_KEY = 'raseekh_admin_sales_v1';

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
      id: 'p5', name: 'صيانة مواقع', name_en: 'Website maintenance',
      category: 'صيانة', category_en: 'Maintenance',
      desc: 'تحديثات، إصلاح أعطال، تحسين سرعة، ومتابعة أمان — عرض شهري حسب حجم الموقع.',
      desc_en: 'Updates, fixes, speed, and security — monthly quote by site size.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p6', name: 'تطوير مواقع', name_en: 'Website development',
      category: 'برمجة', category_en: 'Programming',
      desc: 'مواقع شركات ومتاجر ولوحات عربية/إنجليزية جاهزة للتشغيل — السعر حسب النطاق.',
      desc_en: 'Company sites, stores, and dashboards in AR/EN — priced by scope.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p7', name: 'تعديل برمجة', name_en: 'Code changes',
      category: 'برمجة', category_en: 'Programming',
      desc: 'إصلاح أخطاء، إضافة مزايا، وتحسين أداء مشروعكم الحالي بعد مراجعة الكود.',
      desc_en: 'Bug fixes, features, and performance after reviewing your codebase.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p8', name: 'أنظمة ولوحات تحكم', name_en: 'Systems & dashboards',
      category: 'أنظمة', category_en: 'Systems',
      desc: 'أنظمة إدارة وعملاء وتقارير حسب نشاطكم — عرض سعر بعد تحديد المتطلبات.',
      desc_en: 'Management, CRM, and reporting systems — quote after requirements.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p9', name: 'ربط API', name_en: 'API integrations',
      category: 'أنظمة', category_en: 'Systems',
      desc: 'ربط الدفع والرسائل والأنظمة الخارجية بمشروعكم — حسب عدد الربط والتعقيد.',
      desc_en: 'Payments, messaging, and external systems — by integration complexity.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p10', name: 'نظام مخصص كامل', name_en: 'Complete custom system',
      category: 'أنظمة', category_en: 'Systems',
      desc: 'بناء نظام متكامل من الدراسة إلى التشغيل — عقد واضح ونطاق متفق عليه.',
      desc_en: 'Full system from discovery to go-live — clear scope and agreement.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p11', name: 'تطبيق مخزون', name_en: 'Inventory app',
      category: 'برمجة', category_en: 'Programming',
      desc: 'تطبيق برمجي لإدارة المخزون والمنتجات والكميات والحركات — حسب نشاطكم ومتطلباتكم.',
      desc_en: 'Custom software for inventory, products, quantities, and stock movements — scoped to your workflow.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true, region: 'online'
    },
    {
      id: 'p12', name: 'حلول للشركات', name_en: 'Business solutions',
      category: 'شركات', category_en: 'Business',
      desc: 'باقة للشركات: موقع أو نظام تشغيلي، مخزون، صلاحيات أقسام، وتقارير — عرض سعر بعد فهم نشاط الشركة.',
      desc_en: 'For companies: site or ops system, inventory, department roles, and reports — quote after we understand your business.',
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
    },
    {
      id: 'sg6',
      title: 'تطبيق مخزون وتشغيل',
      title_en: 'Inventory & ops app',
      desc: 'تطبيق مخزون + لوحة تقارير — مناسب للمحلات والمستودعات الصغيرة والمتوسطة.',
      desc_en: 'Inventory app + reporting dashboard — for shops and small/mid warehouses.',
      productIds: ['p11', 'p8'],
      badge: 'مخزون',
      badge_en: 'Inventory'
    },
    {
      id: 'sg7',
      title: 'باقة الشركات',
      title_en: 'Company package',
      desc: 'حلول للشركات + مخزون + نظام تشغيلي — مناسبة للمنشآت التي تحتاج أكثر من موقع بسيط.',
      desc_en: 'Business solutions + inventory + ops system — for companies that need more than a simple website.',
      productIds: ['p12', 'p11', 'p10'],
      badge: 'للشركات',
      badge_en: 'For companies'
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
      localStorage.setItem(VERSION_KEY, String(CATALOG_VERSION));
      // Merge seed text/new items while preserving admin price/stock/custom rows.
      return mergeProducts(products && products.length ? products : cloneList(DEFAULT_PRODUCTS));
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

  function publishClientCatalog(products, suggestions, opts) {
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
    // Default: push to cloud only on explicit saves — never clobber cloud from a stale admin boot.
    if (opts && opts.cloud) {
      const publishPromise = publishClientCatalogToCloud(clientProducts, finalSuggestions);
      if (opts && opts.awaitCloud) return publishPromise.then((ok) => ({ products: clientProducts, cloud: !!ok }));
      publishPromise.catch(() => {});
    }
    return clientProducts;
  }

  function getClientProducts() {
    const current = parseInt(localStorage.getItem(VERSION_KEY) || '0', 10) || 0;
    if (current < CATALOG_VERSION) {
      // Public seed bump: refresh local public catalog without inventing admin storage on visitor browsers.
      const adminStored = readJson(ADMIN_PRODUCTS_KEY, null);
      const ensured = ensureCatalogVersion(adminStored && adminStored.length ? adminStored : cloneList(DEFAULT_PRODUCTS));
      if (adminStored && adminStored.length) writeJson(ADMIN_PRODUCTS_KEY, ensured);
      ensureSuggestionsVersion();
      const refreshed = ensured.filter((p) => p && p.client !== false);
      publishClientCatalog(ensured, getClientSuggestions(), { cloud: false });
      return refreshed;
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
    publishClientCatalog(ensured, pruneSuggestions(ensured), { cloud: false });
    return ensured;
  }

  function hydrateAdminFromCloud(products, suggestions) {
    if (!Array.isArray(products) || !products.length) return null;
    const ensured = ensureCatalogVersion(products);
    writeJson(ADMIN_PRODUCTS_KEY, ensured);
    if (Array.isArray(suggestions) && suggestions.length) {
      writeJson(SUGGESTIONS_KEY, suggestions);
    }
    publishClientCatalog(ensured, pruneSuggestions(ensured), { cloud: false });
    return ensured;
  }

  function saveAdminProducts(products, opts) {
    const list = Array.isArray(products) ? products : [];
    writeJson(ADMIN_PRODUCTS_KEY, list);
    const wantCloud = !(opts && opts.cloud === false);
    if (wantCloud && opts && opts.awaitCloud) {
      return publishClientCatalog(list, pruneSuggestions(list), { cloud: true, awaitCloud: true });
    }
    publishClientCatalog(list, pruneSuggestions(list), { cloud: wantCloud });
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

  function publishPublicNotify(settings, opts) {
    const webhookUrl = String((settings && settings.webhookUrl) || '').trim();
    const notifyEmail = String((settings && settings.notifyEmail) || '').trim().toLowerCase();
    const notifyOnLogin = settings && settings.notifyOnLogin === false ? false : true;
    const cfg = {
      webhookUrl: webhookUrl || '',
      notifyEmail: notifyEmail || '',
      notifyOnLogin: notifyOnLogin
    };
    const existing = readObject(PUBLIC_NOTIFY_KEY);
    // Avoid wiping a published cloud/local config with an empty accidental publish.
    if (!opts || !opts.allowEmpty) {
      if (!cfg.notifyEmail && existing.notifyEmail) cfg.notifyEmail = String(existing.notifyEmail).toLowerCase();
      if (!cfg.webhookUrl && existing.webhookUrl) cfg.webhookUrl = String(existing.webhookUrl);
    }
    writeJson(PUBLIC_NOTIFY_KEY, cfg);
    const shouldPush = !!(cfg.notifyEmail || cfg.webhookUrl || (opts && opts.forceCloud) || (opts && opts.allowEmpty));
    if (!shouldPush) return opts && opts.awaitCloud ? Promise.resolve({ cfg, cloud: false }) : cfg;
    if (opts && opts.awaitCloud) {
      return pushPublicNotifyToCloud(cfg, { allowEmpty: !!(opts && opts.allowEmpty) })
        .then((ok) => ({ cfg, cloud: !!ok }));
    }
    pushPublicNotifyToCloud(cfg, { allowEmpty: !!(opts && opts.allowEmpty) }).catch(() => {});
    return cfg;
  }

  async function pushPublicNotifyToCloud(cfg, opts) {
    const sb = getSupabase();
    if (!sb || !cfg) return false;
    const allowEmpty = !!(opts && opts.allowEmpty);
    if (!cfg.notifyEmail && !cfg.webhookUrl && !allowEmpty) return false;
    try {
      const { error } = await sb.from('site_settings').upsert({
        key: 'public_notify',
        value: {
          notifyEmail: cfg.notifyEmail || '',
          webhookUrl: cfg.webhookUrl || '',
          notifyOnLogin: cfg.notifyOnLogin !== false
        },
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });
      return !error;
    } catch (_) {
      return false;
    }
  }

  async function syncPublicNotifyFromCloud() {
    const sb = getSupabase();
    if (!sb) return readObject(PUBLIC_NOTIFY_KEY);
    try {
      const { data, error } = await sb
        .from('site_settings')
        .select('value')
        .eq('key', 'public_notify')
        .maybeSingle();
      if (error || !data || !data.value) return readObject(PUBLIC_NOTIFY_KEY);
      const value = data.value && typeof data.value === 'object' ? data.value : {};
      const cloudEmail = String(value.notifyEmail || '').trim().toLowerCase();
      const cloudWebhook = String(value.webhookUrl || '').trim();
      const cloudHasNotifyOnLogin = Object.prototype.hasOwnProperty.call(value, 'notifyOnLogin');
      const local = readObject(PUBLIC_NOTIFY_KEY);
      const merged = {
        notifyEmail: cloudEmail || String(local.notifyEmail || '').trim().toLowerCase(),
        webhookUrl: cloudWebhook || String(local.webhookUrl || '').trim(),
        // Prefer cloud flag when cloud row exists; don't let stale local false suppress it.
        notifyOnLogin: cloudHasNotifyOnLogin
          ? value.notifyOnLogin !== false
          : local.notifyOnLogin !== false
      };
      writeJson(PUBLIC_NOTIFY_KEY, merged);
      return merged;
    } catch (_) {
      return readObject(PUBLIC_NOTIFY_KEY);
    }
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
    const fromWindow = typeof global !== 'undefined' && global.RASEEKH_NOTIFY_EMAIL
      ? String(global.RASEEKH_NOTIFY_EMAIL).trim().toLowerCase()
      : '';
    const publicCfg = readObject(PUBLIC_NOTIFY_KEY);
    const store = readObject('raseekh_admin_store_v1');
    return fromWindow || String(publicCfg.notifyEmail || store.notifyEmail || '').trim().toLowerCase();
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

  function fetchWithTimeout(url, options, timeoutMs) {
    const ms = timeoutMs || 12000;
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = setTimeout(() => { try { ctrl && ctrl.abort(); } catch (_) {} }, ms);
    const opts = Object.assign({}, options || {});
    if (ctrl) opts.signal = ctrl.signal;
    return fetch(url, opts).finally(() => clearTimeout(timer));
  }

  function notifyRequestWebhook(row) {
    try {
      const url = resolveWebhookUrl();
      if (!url || !/^https?:\/\//i.test(url)) return Promise.resolve(false);
      return fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'raseekh.request', request: row }),
        mode: 'cors',
        keepalive: true
      }, 12000).then((res) => !!res && res.ok).catch(() => false);
    } catch (_) {
      return Promise.resolve(false);
    }
  }

  function notifyAdminEmail(row, overrideEmail) {
    try {
      const email = String(overrideEmail || resolveNotifyEmail() || '').trim().toLowerCase();
      if (!email || email.indexOf('@') < 0) return Promise.resolve({ ok: false, reason: 'no-email' });
      const subjectPrefix = row.type === 'login'
        ? 'دخول عميل إلى راسخ — '
        : (row.type === 'payment'
          ? 'دفعة / عربون راسخ — '
          : 'طلب جديد من موقع راسخ — ');
      return fetchWithTimeout('https://formsubmit.co/ajax/' + encodeURIComponent(email), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: subjectPrefix + (row.title || row.email || row.type || 'تنبيه'),
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
      }, 12000).then(async (res) => {
        let body = null;
        try { body = await res.json(); } catch (_) {}
        const blob = JSON.stringify(body || {}).toLowerCase();
        const needsConfirm = /confirm|activate|activation|check your email|verify your email/.test(blob);
        const explicitFail = !!(body && (body.error || body.success === false || body.success === 'false'));
        const ok = !!res && res.ok && !needsConfirm && !explicitFail;
        return {
          ok: ok,
          pendingConfirm: needsConfirm,
          status: res.status,
          body: body,
          reason: needsConfirm ? 'formsubmit-confirm' : (explicitFail ? 'formsubmit-error' : '')
        };
      }).catch((err) => ({ ok: false, reason: String(err && err.message || err || 'network') }));
    } catch (err) {
      return Promise.resolve({ ok: false, reason: String(err && err.message || err || 'error') });
    }
  }

  async function pushRequestToCloud(row, opts) {
    const sb = getSupabase();
    if (!sb || !row || !row.id) return false;
    const allowUpdate = !!(opts && opts.allowUpdate);
    const payload = rowToCloud(row);
    try {
      if (allowUpdate) {
        const { error } = await sb.from('client_requests').upsert(payload, { onConflict: 'id' });
        return !error;
      }
      // Anon guests only have INSERT — avoid upsert UPDATE privilege failures.
      const { error } = await sb.from('client_requests').upsert(payload, { onConflict: 'id', ignoreDuplicates: true });
      if (!error) return true;
      const { error: insertErr } = await sb.from('client_requests').insert(payload);
      if (!insertErr) return true;
      const msg = String((insertErr && insertErr.message) || '').toLowerCase();
      return msg.includes('duplicate') || msg.includes('unique') || insertErr.code === '23505';
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

  async function probePublicNotifyCloud() {
    const sb = getSupabase();
    if (!sb) return { ok: false, reason: 'no-client', published: false };
    try {
      const { data, error } = await sb
        .from('site_settings')
        .select('value')
        .eq('key', 'public_notify')
        .maybeSingle();
      if (error) return { ok: false, reason: error.message || 'table-missing', published: false };
      const value = data && data.value && typeof data.value === 'object' ? data.value : {};
      const notifyEmail = String(value.notifyEmail || '').trim().toLowerCase();
      const webhookUrl = String(value.webhookUrl || '').trim();
      return {
        ok: true,
        published: !!(notifyEmail || webhookUrl),
        notifyEmail,
        webhookUrl
      };
    } catch (err) {
      return { ok: false, reason: String(err && err.message || err || 'error'), published: false };
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
      electronics: { ar: 'أجهزة (الرياض فقط)', en: 'Hardware (Riyadh only)' },
      hardware: { ar: 'أجهزة (الرياض فقط)', en: 'Hardware (Riyadh only)' },
      maintenance: { ar: 'صيانة مواقع', en: 'Website maintenance' },
      'web-dev': { ar: 'تطوير مواقع', en: 'Website development' },
      programming: { ar: 'خدمات البرمجة', en: 'Programming' },
      inventory: { ar: 'تطبيق مخزون', en: 'Inventory app' },
      business: { ar: 'حلول للشركات', en: 'Business solutions' },
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

  const PRODUCT_REQUEST_TYPES = {
    p1: 'hardware', p2: 'hardware', p3: 'hardware', p4: 'hardware',
    p5: 'maintenance', p6: 'web-dev', p7: 'programming',
    p8: 'systems', p9: 'api', p10: 'system', p11: 'inventory', p12: 'business'
  };

  function requestTypeForProduct(product) {
    if (!product) return 'programming';
    if (product.id && PRODUCT_REQUEST_TYPES[product.id]) return PRODUCT_REQUEST_TYPES[product.id];
    const cat = ((product.category_en || product.category || '') + ' ' + (product.name_en || product.name || '')).toLowerCase();
    if (product.kind === 'product' || product.region === 'riyadh') return 'hardware';
    if (cat.includes('maintenance') || cat.includes('صيانة')) return 'maintenance';
    if (cat.includes('website development') || cat.includes('تطوير مواقع') || cat.includes('web-dev')) return 'web-dev';
    if (cat.includes('inventory') || cat.includes('مخزون') || cat.includes('stock')) return 'inventory';
    if (cat.includes('business') || cat.includes('company') || cat.includes('شركات') || cat.includes('منشآت')) return 'business';
    if (cat.includes('api') || cat.includes('ربط')) return 'api';
    if (cat.includes('dashboard') || cat.includes('systems') || cat.includes('أنظمة') || cat.includes('لوحات')) return 'systems';
    if (cat.includes('system') || cat.includes('نظام')) return 'system';
    if (cat.includes('programming') || cat.includes('برمجة') || cat.includes('code')) return 'programming';
    return 'programming';
  }

  function requestTypeOptions() {
    return [
      { value: 'maintenance', ar: 'صيانة مواقع', en: 'Website maintenance' },
      { value: 'web-dev', ar: 'تطوير مواقع', en: 'Website development' },
      { value: 'programming', ar: 'خدمات البرمجة / تعديل كود', en: 'Programming / code changes' },
      { value: 'inventory', ar: 'تطبيق مخزون', en: 'Inventory app' },
      { value: 'business', ar: 'حلول للشركات', en: 'Business solutions' },
      { value: 'systems', ar: 'برمجة أنظمة ولوحات', en: 'Systems & dashboards' },
      { value: 'api', ar: 'ربط API وأنظمة', en: 'API & integrations' },
      { value: 'system', ar: 'نظام كامل', en: 'Complete system' },
      { value: 'hardware', ar: 'أجهزة (الرياض فقط)', en: 'Hardware (Riyadh only)' }
    ];
  }

  function getPaymentRecords() {
    return readJson(PAYMENTS_KEY, []);
  }

  function savePaymentRecords(list) {
    writeJson(PAYMENTS_KEY, (list || []).slice(0, 200));
  }

  function addPaymentRecord(payload) {
    const list = getPaymentRecords();
    const row = Object.assign({
      id: 'pay-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
      at: new Date().toISOString(),
      method: 'card',
      items: 1,
      total: 0,
      note: '',
      name: '',
      email: '',
      source: 'site',
      lines: []
    }, payload || {});
    row.total = Number(row.total) || 0;
    row.items = Number(row.items) || 1;
    if (row.paymentId) {
      const safeId = String(row.paymentId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 72);
      if (safeId) row.id = 'pay-moyasar-' + safeId;
    }
    if (!row.lines || !row.lines.length) {
      row.lines = [{
        id: 'deposit',
        name: row.note || 'Deposit / عربون',
        qty: 1,
        price: row.total
      }];
    }
    const fingerprint = row.paymentId
      ? 'moyasar:' + row.paymentId
      : [
          'pay',
          Math.floor(Date.now() / (5 * 60 * 1000)),
          String(row.total || 0),
          String(row.method || ''),
          String(row.email || row.userId || '').trim().toLowerCase(),
          String(row.note || '').trim().toLowerCase().replace(/\s+/g, ' ')
        ].join(':');
    row.fingerprint = fingerprint;
    const existing = list.find((x) =>
      (x.paymentId && row.paymentId && x.paymentId === row.paymentId) ||
      (x.fingerprint && x.fingerprint === fingerprint) ||
      (x.id && row.id && x.id === row.id)
    );
    if (existing) {
      existing.deliveryPromise = deliverPaymentRecord(existing);
      return existing;
    }
    list.unshift(row);
    savePaymentRecords(list);
    row.deliveryPromise = deliverPaymentRecord(row);
    return row;
  }

  async function pushPaymentToCloud(row) {
    const sb = getSupabase();
    if (!sb || !row || !row.id) return false;
    try {
      const payload = {
        id: row.id,
        created_at: row.at || new Date().toISOString(),
        method: row.method || 'card',
        total: Number(row.total) || 0,
        items: Number(row.items) || 1,
        note: row.note || '',
        name: row.name || '',
        email: row.email || '',
        user_id: row.userId || '',
        source: row.source || 'site',
        payment_id: row.paymentId || '',
        fingerprint: row.fingerprint || '',
        payload: row
      };
      // Anon/authenticated inserts only — no UPDATE grant on payments.
      const { error } = await sb.from('payments').upsert(payload, { onConflict: 'id', ignoreDuplicates: true });
      if (!error) return true;
      const { error: insertErr } = await sb.from('payments').insert(payload);
      if (!insertErr) return true;
      const msg = String((insertErr && insertErr.message) || '').toLowerCase();
      return msg.includes('duplicate') || msg.includes('unique') || insertErr.code === '23505';
    } catch (_) {
      return false;
    }
  }

  function cloudPaymentToRow(row) {
    if (!row) return null;
    const embedded = row.payload && typeof row.payload === 'object' ? row.payload : {};
    return Object.assign({}, embedded, {
      id: row.id || embedded.id,
      at: row.created_at || embedded.at || new Date().toISOString(),
      method: row.method || embedded.method || 'card',
      total: Number(row.total != null ? row.total : embedded.total) || 0,
      items: Number(row.items != null ? row.items : embedded.items) || 1,
      note: row.note || embedded.note || '',
      name: row.name || embedded.name || '',
      email: row.email || embedded.email || '',
      userId: row.user_id || embedded.userId || '',
      source: row.source || embedded.source || 'site',
      paymentId: row.payment_id || embedded.paymentId || '',
      fingerprint: row.fingerprint || embedded.fingerprint || '',
      lines: embedded.lines || []
    });
  }

  async function syncPaymentsFromCloud() {
    const sb = getSupabase();
    if (!sb) return getPaymentRecords();
    try {
      const { data, error } = await sb
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      if (error || !Array.isArray(data)) return getPaymentRecords();
      const local = getPaymentRecords();
      const byKey = new Map();
      const keyOf = (r) => {
        if (!r) return '';
        if (r.paymentId) return 'pid:' + String(r.paymentId);
        if (r.fingerprint) return 'fp:' + String(r.fingerprint);
        return r.id ? 'id:' + String(r.id) : '';
      };
      const put = (r) => {
        const key = keyOf(r);
        if (!key) return;
        const prev = byKey.get(key);
        if (!prev) {
          byKey.set(key, r);
          return;
        }
        const prevTime = new Date(prev.at || 0).getTime();
        const nextTime = new Date(r.at || 0).getTime();
        byKey.set(key, nextTime >= prevTime ? Object.assign({}, prev, r) : Object.assign({}, r, prev));
      };
      local.forEach(put);
      data.map(cloudPaymentToRow).filter(Boolean).forEach(put);
      const merged = Array.from(byKey.values()).sort((a, b) => new Date(b.at || 0) - new Date(a.at || 0)).slice(0, 200);
      savePaymentRecords(merged);
      return merged;
    } catch (_) {
      return getPaymentRecords();
    }
  }

  async function deliverPaymentRecord(row) {
    await syncPublicNotifyFromCloud().catch(() => {});
    const cloud = await pushPaymentToCloud(row);
    const notifyRow = {
      id: row.id || '',
      type: 'payment',
      title: ((row.total || 0) + ' SAR') + (row.note ? ' — ' + row.note : ''),
      name: row.name || 'عميل',
      email: row.email || 'client@raseekh.local',
      phone: '',
      company: '',
      message: [
        'المبلغ: ' + (row.total || 0) + ' SAR',
        'الطريقة: ' + (row.method || ''),
        'المصدر: ' + (row.source || ''),
        'ملاحظة: ' + (row.note || ''),
        'Payment ID: ' + (row.paymentId || ''),
        'Record ID: ' + (row.id || '')
      ].join('\n'),
      source: row.source || 'payment'
    };
    const email = await notifyAdminEmail(notifyRow);
    let webhook = false;
    try {
      const url = resolveWebhookUrl();
      if (url) {
        webhook = await fetchWithTimeout(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'raseekh.payment', payment: row }),
          mode: 'cors',
          keepalive: true
        }, 12000).then((res) => !!res && res.ok).catch(() => false);
      }
    } catch (_) {}
    return {
      cloud: !!cloud,
      email: !!(email && email.ok),
      webhook: !!webhook,
      emailDetail: email || null,
      pendingNotify: !!(email && email.pendingConfirm),
      delivered: !!(cloud || (email && email.ok) || webhook)
    };
  }

  function normalizeFingerprintPart(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function requestFingerprint(row) {
    const bucket = Math.floor(Date.now() / (5 * 60 * 1000));
    return [
      'req',
      bucket,
      normalizeFingerprintPart(row && row.type),
      normalizeFingerprintPart((row && (row.userId || row.email || row.phone)) || ''),
      normalizeFingerprintPart(row && row.company),
      normalizeFingerprintPart(row && row.message)
    ].join(':');
  }

  function addSharedRequest(payload) {
    const list = readJson(CLIENT_REQUESTS_KEY, []);
    const row = Object.assign({
      id: 'req-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
      at: new Date().toISOString(),
      status: 'new',
      source: 'site'
    }, payload || {});
    if (!row.fingerprint) row.fingerprint = requestFingerprint(row);
    const existing = list.find((x) => x.fingerprint && x.fingerprint === row.fingerprint);
    if (existing) {
      // Retry delivery for double-submit / refresh within the idempotency window.
      existing.deliveryPromise = deliverSharedRequest(existing);
      return existing;
    }
    list.unshift(row);
    writeJson(CLIENT_REQUESTS_KEY, list.slice(0, 200));
    // Deliver outside this browser: cloud row + email + webhook (best-effort)
    row.deliveryPromise = deliverSharedRequest(row);
    return row;
  }

  async function deliverSharedRequest(row) {
    await syncPublicNotifyFromCloud().catch(() => {});
    const cloud = await pushRequestToCloud(row);
    const email = await notifyAdminEmail(row);
    const webhook = await notifyRequestWebhook(row);
    const delivered = !!(cloud || (email && email.ok) || webhook);
    const pendingNotify = !!(email && email.pendingConfirm);
    try {
      const list = getSharedRequests();
      const idx = list.findIndex((r) => r && row && r.id === row.id);
      if (idx >= 0) {
        if (delivered) {
          delete list[idx].syncPending;
          list[idx].deliveryStatus = 'delivered';
        } else {
          list[idx].syncPending = true;
          list[idx].deliveryStatus = pendingNotify ? 'pending_notify' : 'local';
        }
        saveSharedRequests(list);
      }
    } catch (_) {}
    return {
      cloud: !!cloud,
      email: !!(email && email.ok),
      webhook: !!webhook,
      emailDetail: email || null,
      pendingNotify: pendingNotify,
      delivered: delivered,
      accepted: true
    };
  }

  async function retryPendingSharedRequests() {
    const list = getSharedRequests();
    const pending = list.filter((r) => r && (r.syncPending || r.deliveryStatus === 'local' || r.deliveryStatus === 'pending_notify'));
    for (const row of pending.slice(0, 20)) {
      try { await deliverSharedRequest(row); } catch (_) {}
    }
    return getSharedRequests();
  }

  function getSharedRequests() {
    return readJson(CLIENT_REQUESTS_KEY, []);
  }

  function saveSharedRequests(list) {
    writeJson(CLIENT_REQUESTS_KEY, (list || []).slice(0, 200));
  }

  async function updateSharedRequestStatus(id, status) {
    const list = getSharedRequests();
    const idx = list.findIndex((r) => r.id === id);
    if (idx < 0) return { ok: false, row: null };
    const prev = Object.assign({}, list[idx]);
    list[idx] = Object.assign({}, list[idx], {
      status: status || list[idx].status,
      updatedAt: new Date().toISOString(),
      syncPending: true
    });
    saveSharedRequests(list);
    try {
      const cloudOk = await pushRequestToCloud(list[idx], { allowUpdate: true });
      list[idx].syncPending = !cloudOk;
      if (cloudOk) delete list[idx].syncPending;
      saveSharedRequests(list);
      return { ok: !!cloudOk, row: list[idx], previous: prev };
    } catch (_) {
      list[idx].syncPending = true;
      saveSharedRequests(list);
      return { ok: false, row: list[idx], previous: prev };
    }
  }

  async function publishClientCatalogToCloud(products, suggestions) {
    const sb = getSupabase();
    if (!sb) return false;
    try {
      const value = {
        products: products || [],
        suggestions: suggestions || [],
        updatedAt: new Date().toISOString(),
        version: CATALOG_VERSION
      };
      const { error } = await sb.from('site_settings').upsert({
        key: 'public_catalog',
        value: value,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });
      return !error;
    } catch (_) {
      return false;
    }
  }

  async function syncPublicCatalogFromCloud() {
    const sb = getSupabase();
    if (!sb) return null;
    try {
      const { data, error } = await sb
        .from('site_settings')
        .select('value')
        .eq('key', 'public_catalog')
        .maybeSingle();
      if (error || !data || !data.value || typeof data.value !== 'object') return null;
      const cloudVersion = Number(data.value.version) || 0;
      const localVersion = parseInt(localStorage.getItem(VERSION_KEY) || '0', 10) || 0;
      // After a seed bump, ignore older cloud catalogs so they cannot wipe fresher local defaults.
      if (localVersion >= CATALOG_VERSION && cloudVersion < CATALOG_VERSION) {
        return null;
      }
      const products = Array.isArray(data.value.products) ? data.value.products : [];
      const suggestions = Array.isArray(data.value.suggestions) ? data.value.suggestions : [];
      if (products.length) writeJson(PUBLIC_KEY, products);
      if (suggestions.length) writeJson(SUGGESTIONS_KEY, suggestions);
      if (cloudVersion >= CATALOG_VERSION) {
        localStorage.setItem(VERSION_KEY, String(cloudVersion));
      }
      return { products, suggestions, updatedAt: data.value.updatedAt || '', version: cloudVersion };
    } catch (_) {
      return null;
    }
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
    hydrateAdminFromCloud,
    saveAdminProducts,
    pruneSuggestions,
    addSharedRequest,
    deliverSharedRequest,
    retryPendingSharedRequests,
    notifyRequestWebhook,
    notifyAdminEmail,
    publishPublicNotify,
    syncPublicNotifyFromCloud,
    resolveWebhookUrl,
    resolveNotifyEmail,
    getDeliveryStatus,
    probeCloudRequests,
    probePublicNotifyCloud,
    requestTypeLabel,
    requestTypeForProduct,
    requestTypeOptions,
    PAYMENTS_KEY,
    getPaymentRecords,
    savePaymentRecords,
    addPaymentRecord,
    deliverPaymentRecord,
    pushPaymentToCloud,
    syncPaymentsFromCloud,
    pushRequestToCloud,
    syncSharedRequestsFromCloud,
    publishClientCatalogToCloud,
    syncPublicCatalogFromCloud,
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

  if (typeof global.addEventListener === 'function') {
    global.addEventListener('online', () => {
      retryPendingSharedRequests().catch(() => {});
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
