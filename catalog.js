/* Shared Raseekh catalog: products for clients + ready suggestions. */
(function (global) {
  const PUBLIC_KEY = 'raseekh_client_catalog_v1';
  const SUGGESTIONS_KEY = 'raseekh_client_suggestions_v1';
  const ADMIN_PRODUCTS_KEY = 'raseekh_admin_products_v1';
  const VERSION_KEY = 'raseekh_catalog_version';
  const SUGGESTIONS_VERSION_KEY = 'raseekh_suggestions_version';
  const CATALOG_VERSION = 4;
  const SUGGESTIONS_VERSION = 2;
  const CLIENT_REQUESTS_KEY = 'raseekh_all_client_requests_v1';

  const DEFAULT_PRODUCTS = [
    {
      id: 'p1', name: 'لابتوب أعمال', name_en: 'Business laptop',
      category: 'أجهزة', category_en: 'Devices',
      desc: 'جهاز مناسب للإدارة والبرمجة والعمل اليومي.',
      desc_en: 'Suitable for admin, development, and daily work.',
      price: 3200, stock: 8, kind: 'product', client: true
    },
    {
      id: 'p2', name: 'طابعة فواتير', name_en: 'Receipt printer',
      category: 'أجهزة', category_en: 'Devices',
      desc: 'طابعة فواتير للمحلات ونقاط البيع.',
      desc_en: 'Receipt printer for stores and sales desks.',
      price: 450, stock: 15, kind: 'product', client: true
    },
    {
      id: 'p3', name: 'راوتر مكتبي', name_en: 'Office router',
      category: 'شبكات', category_en: 'Networking',
      desc: 'راوتر مستقر للمكاتب والفروع.',
      desc_en: 'Stable router for offices and branches.',
      price: 380, stock: 20, kind: 'product', client: true
    },
    {
      id: 'p4', name: 'شاشة مكتبية', name_en: 'Monitor',
      category: 'اكسسوارات', category_en: 'Accessories',
      desc: 'شاشة واضحة للعمل المكتبي والتصميم.',
      desc_en: 'Clear display for office and design work.',
      price: 720, stock: 12, kind: 'product', client: true
    },
    {
      id: 'p5', name: 'وحدة تخزين SSD', name_en: 'SSD drive',
      category: 'اكسسوارات', category_en: 'Accessories',
      desc: 'تخزين سريع لتحسين أداء الأجهزة.',
      desc_en: 'Fast storage to improve device performance.',
      price: 260, stock: 30, kind: 'product', client: true
    },
    {
      id: 'p6', name: 'صيانة موقع شهرية', name_en: 'Monthly site maintenance',
      category: 'خدمات', category_en: 'Services',
      desc: 'تحديثات، إصلاح أعطال، ومتابعة أمان الموقع شهرياً.',
      desc_en: 'Monthly updates, fixes, and site security follow-up.',
      price: 500, stock: 99, kind: 'service', client: true
    },
    {
      id: 'p7', name: 'تطوير موقع إلكتروني', name_en: 'Website development',
      category: 'برمجة', category_en: 'Programming',
      desc: 'تصميم وبرمجة موقع شركة أو متجر عربي/إنجليزي.',
      desc_en: 'Design and build a company or store website in AR/EN.',
      price: 2500, stock: 99, kind: 'service', client: true
    },
    {
      id: 'p8', name: 'تعديل وتحسين برمجة', name_en: 'Code modification',
      category: 'برمجة', category_en: 'Programming',
      desc: 'إصلاح أخطاء، إضافة مزايا، وتحسين أداء مشروعكم الحالي.',
      desc_en: 'Bug fixes, new features, and performance upgrades for your project.',
      price: 350, stock: 99, kind: 'service', client: true
    },
    {
      id: 'p9', name: 'برمجة نظام ولوحة تحكم', name_en: 'System & dashboard build',
      category: 'برمجة', category_en: 'Programming',
      desc: 'نظام إدارة مخصص مع لوحة تحكم وصلاحيات.',
      desc_en: 'Custom management system with dashboard and roles.',
      price: 4500, stock: 99, kind: 'service', client: true
    },
    {
      id: 'p10', name: 'ربط API وأنظمة', name_en: 'API & integrations',
      category: 'برمجة', category_en: 'Programming',
      desc: 'ربط الدفع والرسائل والأنظمة الخارجية.',
      desc_en: 'Connect payments, messaging, and external systems.',
      price: 1200, stock: 99, kind: 'service', client: true
    },
    {
      id: 'p11', name: 'نظام مخصص كامل', name_en: 'Complete custom system',
      category: 'خدمات', category_en: 'Services',
      desc: 'بناء نظام متكامل من البداية حتى التشغيل.',
      desc_en: 'Build a complete system from start to go-live.',
      price: 5000, stock: 99, kind: 'service', client: true
    }
  ];

  const DEFAULT_SUGGESTIONS = [
    {
      id: 'sg1',
      title: 'باقة مكتب جاهز',
      title_en: 'Ready office package',
      desc: 'لابتوب + شاشة + راوتر — تجهيز سريع لمكتب جديد.',
      desc_en: 'Laptop + monitor + router — quick setup for a new office.',
      productIds: ['p1', 'p4', 'p3'],
      badge: 'موصى به',
      badge_en: 'Recommended'
    },
    {
      id: 'sg2',
      title: 'اقتراح صيانة وبرمجة',
      title_en: 'Maintenance + programming plan',
      desc: 'صيانة شهرية + تعديل برمجة لإبقاء موقعكم يعمل بسلاسة.',
      desc_en: 'Monthly maintenance plus code updates to keep your site smooth.',
      productIds: ['p6', 'p8'],
      badge: 'للعملاء الحاليين',
      badge_en: 'For existing clients'
    },
    {
      id: 'sg3',
      title: 'اقتراح إطلاق موقع جديد',
      title_en: 'New website launch plan',
      desc: 'تطوير موقع + ربط API + صيانة شهرية بعد الإطلاق.',
      desc_en: 'Website build + API integration + monthly care after launch.',
      productIds: ['p7', 'p10', 'p6'],
      badge: 'الأكثر طلباً',
      badge_en: 'Most requested'
    },
    {
      id: 'sg4',
      title: 'اقتراح نظام متكامل',
      title_en: 'Complete system proposal',
      desc: 'نظام مخصص + لوحة تحكم + ربط أنظمة خارجية.',
      desc_en: 'Custom system + dashboard + external integrations.',
      productIds: ['p11', 'p9', 'p10'],
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
      const custom = (products || []).filter((p) => p && !seedIds.has(p.id));
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

  function addSharedRequest(payload) {
    const list = readJson(CLIENT_REQUESTS_KEY, []);
    const row = Object.assign({
      id: 'req-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
      at: new Date().toISOString(),
      status: 'new',
      source: 'site'
    }, payload || {});
    list.unshift(row);
    writeJson(CLIENT_REQUESTS_KEY, list.slice(0, 200));
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

  function label(item, lang, arKey, enKey) {
    if (!item) return '';
    if (lang === 'en' && item[enKey]) return item[enKey];
    return item[arKey] || item[enKey] || '';
  }

  function suggestionTotal(suggestion, products) {
    const map = new Map((products || []).map((p) => [p.id, p]));
    return (suggestion.productIds || []).reduce((sum, id) => {
      const p = map.get(id);
      return sum + (p ? Number(p.price) || 0 : 0);
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
    getSharedRequests,
    saveSharedRequests,
    updateSharedRequestStatus,
    money,
    label,
    suggestionTotal,
    suggestionItems
  };
})(typeof window !== 'undefined' ? window : globalThis);
