/* Shared Raseekh catalog: real offerings with quote-based pricing by default. */
(function (global) {
  const PUBLIC_KEY = 'raseekh_client_catalog_v1';
  const SUGGESTIONS_KEY = 'raseekh_client_suggestions_v1';
  const ADMIN_PRODUCTS_KEY = 'raseekh_admin_products_v1';
  const VERSION_KEY = 'raseekh_catalog_version';
  const SUGGESTIONS_VERSION_KEY = 'raseekh_suggestions_version';
  const CATALOG_VERSION = 5;
  const SUGGESTIONS_VERSION = 3;
  const CLIENT_REQUESTS_KEY = 'raseekh_all_client_requests_v1';

  const DEFAULT_PRODUCTS = [
    {
      id: 'p1', name: 'أجهزة لابتوب للأعمال', name_en: 'Business laptops',
      category: 'أجهزة', category_en: 'Devices',
      desc: 'توريد أجهزة لابتوب حسب مواصفات عملكم — السعر بعد تحديد المواصفات.',
      desc_en: 'Business laptops supplied to your specs — price after requirements.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'product', client: true
    },
    {
      id: 'p2', name: 'طابعات وأجهزة نقاط بيع', name_en: 'Printers & POS hardware',
      category: 'أجهزة', category_en: 'Devices',
      desc: 'طابعات فواتير وتجهيزات كاشير للمحلات — عرض سعر حسب الكمية والنوع.',
      desc_en: 'Receipt printers and till hardware — quote by model and quantity.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'product', client: true
    },
    {
      id: 'p3', name: 'شبكات وراوترات مكتبية', name_en: 'Office networking gear',
      category: 'شبكات', category_en: 'Networking',
      desc: 'تجهيز شبكة مستقرة للمكاتب والفروع بعد معاينة الاحتياج.',
      desc_en: 'Stable networking for offices and branches after assessing needs.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'product', client: true
    },
    {
      id: 'p4', name: 'شاشات واكسسوارات تقنية', name_en: 'Monitors & tech accessories',
      category: 'اكسسوارات', category_en: 'Accessories',
      desc: 'شاشات، تخزين، وكابلات وتجهيزات مكتبية — حسب المتوفر والطلب.',
      desc_en: 'Monitors, storage, cables, and office gear — based on availability.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'product', client: true
    },
    {
      id: 'p5', name: 'صيانة مواقع إلكترونية', name_en: 'Website maintenance',
      category: 'خدمات', category_en: 'Services',
      desc: 'تحديثات، إصلاح أعطال، تحسين سرعة، ومتابعة أمان — عرض شهري حسب حجم الموقع.',
      desc_en: 'Updates, fixes, speed, and security — monthly quote by site size.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true
    },
    {
      id: 'p6', name: 'تطوير مواقع إلكترونية', name_en: 'Website development',
      category: 'برمجة', category_en: 'Programming',
      desc: 'تصميم وبرمجة مواقع شركات ومتاجر ولوحات عربية/إنجليزية — السعر حسب النطاق.',
      desc_en: 'Company sites, stores, and dashboards in AR/EN — priced by scope.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true
    },
    {
      id: 'p7', name: 'تعديل وتحسين البرمجة', name_en: 'Code modification & improvement',
      category: 'برمجة', category_en: 'Programming',
      desc: 'إصلاح أخطاء، إضافة مزايا، وتحسين أداء مشروعكم الحالي بعد مراجعة الكود.',
      desc_en: 'Bug fixes, features, and performance after reviewing your codebase.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true
    },
    {
      id: 'p8', name: 'برمجة أنظمة ولوحات تحكم', name_en: 'Systems & dashboards',
      category: 'برمجة', category_en: 'Programming',
      desc: 'أنظمة إدارة ومخزون وعملاء حسب نشاطكم — عرض سعر بعد تحديد المتطلبات.',
      desc_en: 'Management, inventory, and CRM systems — quote after requirements.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true
    },
    {
      id: 'p9', name: 'ربط API وأنظمة خارجية', name_en: 'API & integrations',
      category: 'برمجة', category_en: 'Programming',
      desc: 'ربط الدفع والرسائل والأنظمة الخارجية بمشروعكم — حسب عدد الربط والتعقيد.',
      desc_en: 'Payments, messaging, and external systems — by integration complexity.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true
    },
    {
      id: 'p10', name: 'نظام مخصص كامل', name_en: 'Complete custom system',
      category: 'خدمات', category_en: 'Services',
      desc: 'بناء نظام متكامل من الدراسة إلى التشغيل — عقد واضح ونطاق متفق عليه.',
      desc_en: 'Full system from discovery to go-live — clear scope and agreement.',
      price: 0, priceMode: 'quote', stock: 99, kind: 'service', client: true
    }
  ];

  const DEFAULT_SUGGESTIONS = [
    {
      id: 'sg1',
      title: 'تجهيز مكتب تقني',
      title_en: 'Office tech setup',
      desc: 'أجهزة + شبكات + اكسسوارات — نحدد المواصفات ثم نرسل عرض سعر حقيقي.',
      desc_en: 'Devices + networking + accessories — we confirm specs then send a real quote.',
      productIds: ['p1', 'p3', 'p4'],
      badge: 'للمكاتب',
      badge_en: 'For offices'
    },
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
        client: cur.client !== false,
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
    if (stored && stored.length) return stored;
    const admin = readJson(ADMIN_PRODUCTS_KEY, null);
    if (admin && admin.length) return admin.filter((p) => p && p.client !== false);
    return cloneList(DEFAULT_PRODUCTS);
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
    writeJson(PUBLIC_NOTIFY_KEY, { webhookUrl: webhookUrl || '' });
    return webhookUrl;
  }

  function resolveWebhookUrl() {
    const fromWindow = typeof global !== 'undefined' && global.RASEEKH_WEBHOOK
      ? String(global.RASEEKH_WEBHOOK).trim()
      : '';
    const publicCfg = readObject(PUBLIC_NOTIFY_KEY);
    const store = readObject('raseekh_admin_store_v1');
    return fromWindow || String(publicCfg.webhookUrl || '').trim() || String(store.webhookUrl || '').trim();
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
    notifyRequestWebhook(row);
    return row;
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
    notifyRequestWebhook,
    publishPublicNotify,
    resolveWebhookUrl,
    requestTypeLabel,
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
