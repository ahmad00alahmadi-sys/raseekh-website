/* Shared Raseekh catalog: real offerings with quote-based pricing by default. */
(function (global) {
  const PUBLIC_KEY = 'raseekh_client_catalog_v1';
  const SUGGESTIONS_KEY = 'raseekh_client_suggestions_v1';
  const ADMIN_PRODUCTS_KEY = 'raseekh_admin_products_v1';
  const VERSION_KEY = 'raseekh_catalog_version';
  const SUGGESTIONS_VERSION_KEY = 'raseekh_suggestions_version';
  const TESTIMONIALS_KEY = 'raseekh_public_testimonials_v1';
  const CATALOG_VERSION = 10;
  const SUGGESTIONS_VERSION = 8;
  const CLIENT_REQUESTS_KEY = 'raseekh_all_client_requests_v1';
  const PAYMENTS_KEY = 'raseekh_admin_sales_v1';
  // In-flight deliveries must live outside localStorage row objects (re-parsed each call).
  const inFlightRequestDeliveries = new Map();
  const inFlightPaymentDeliveries = new Map();

  function deliveryKey(row) {
    return row && row.id ? String(row.id) : '';
  }

  function beginPaymentDelivery(row) {
    const key = deliveryKey(row);
    if (!key) return runDeliverPaymentRecord(row);
    if (inFlightPaymentDeliveries.has(key)) return inFlightPaymentDeliveries.get(key);
    const promise = Promise.resolve()
      .then(() => runDeliverPaymentRecord(row))
      .finally(() => { inFlightPaymentDeliveries.delete(key); });
    inFlightPaymentDeliveries.set(key, promise);
    return promise;
  }

  function beginRequestDelivery(row) {
    const key = deliveryKey(row);
    if (!key) return runDeliverSharedRequest(row);
    if (inFlightRequestDeliveries.has(key)) return inFlightRequestDeliveries.get(key);
    const promise = Promise.resolve()
      .then(() => runDeliverSharedRequest(row))
      .finally(() => { inFlightRequestDeliveries.delete(key); });
    inFlightRequestDeliveries.set(key, promise);
    return promise;
  }

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
      id: 'p12', name: 'نسخة للمؤسسات', name_en: 'Institution edition',
      category: 'مؤسسات', category_en: 'Institutions',
      desc: 'باقة للمؤسسات: موقع أو نظام تشغيلي، مخزون، صلاحيات أقسام، وتقارير — عرض سعر بعد فهم نشاط المؤسسة.',
      desc_en: 'Institution edition: site or ops system, inventory, department roles, and reports — quote after we understand your organization.',
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
      title: 'نسخة للمؤسسات',
      title_en: 'Institution edition',
      desc: 'نسخة للمؤسسات + مخزون + نظام تشغيلي — مناسبة للمؤسسات التي تحتاج أكثر من موقع بسيط.',
      desc_en: 'Institution edition + inventory + ops system — for organizations that need more than a simple website.',
      productIds: ['p12', 'p11', 'p10'],
      badge: 'للمؤسسات',
      badge_en: 'For institutions'
    }
  ];

  const DEFAULT_TESTIMONIALS = [
    {
      id: 'tv1',
      name_ar: 'فهد العتيبي',
      name_en: 'Fahad Al-Otaibi',
      role_ar: 'مدير تشغيل · تجزئة · الرياض',
      role_en: 'Ops manager · Retail · Riyadh',
      quote_ar: 'قبل راسخ كان نقص الصنف يفاجئنا وقت الذروة. الآن التنبيه يجي قبل ما الرف يفضى، والفريق ما عاد يعتمد على واتساب.',
      quote_en: 'Before Raseekh, stockouts surprised us at peak hours. Now alerts arrive before the shelf empties, and the team no longer relies on WhatsApp.',
      stars: 5
    },
    {
      id: 'tv2',
      name_ar: 'نورة الشمري',
      name_en: 'Noura Al-Shammari',
      role_ar: 'منسّقة عيادة · القصيم',
      role_en: 'Clinic coordinator · Qassim',
      quote_ar: 'همّنا كان المواعيد وصلاحيات الاستقبال. النظام رتّب اليوم بدون تعقيد، وكل واحد يشوف اللي يخصّه فقط.',
      quote_en: 'Our priority was appointments and reception roles. The system ordered the day without clutter, and each person only sees what they need.',
      stars: 5
    },
    {
      id: 'tv3',
      name_ar: 'سلمان الحربي',
      name_en: 'Salman Al-Harbi',
      role_ar: 'مدير مشاريع · مقاولات · جدة',
      role_en: 'Project manager · Contracting · Jeddah',
      quote_ar: 'كنت أتابع المشاريع من رسائل متفرقة. لوحة العميل خلّت حالة الطلب والمواد واضحة للمشرفين في الموقع.',
      quote_en: 'I tracked projects through scattered messages. The client board made request and materials status clear for site supervisors.',
      stars: 5
    }
  ];

  function cloneList(list) {
    return list.map((item) => Object.assign({}, item, {
      productIds: item.productIds ? item.productIds.slice() : undefined
    }));
  }

  function normalizeTestimonial(row) {
    if (!row || typeof row !== 'object') return null;
    const stars = Math.max(1, Math.min(5, parseInt(row.stars, 10) || 5));
    const id = String(row.id || ('tv_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)));
    const quote_ar = String(row.quote_ar || row.quote || '').trim();
    const quote_en = String(row.quote_en || row.quote || quote_ar).trim();
    const name_ar = String(row.name_ar || row.name || '').trim();
    const name_en = String(row.name_en || row.name || name_ar).trim();
    if (!quote_ar && !quote_en) return null;
    if (!name_ar && !name_en) return null;
    return {
      id: id,
      name_ar: name_ar || name_en,
      name_en: name_en || name_ar,
      role_ar: String(row.role_ar || row.role || '').trim(),
      role_en: String(row.role_en || row.role || row.role_ar || '').trim(),
      quote_ar: quote_ar || quote_en,
      quote_en: quote_en || quote_ar,
      stars: stars,
      createdAt: row.createdAt || new Date().toISOString()
    };
  }

  function getTestimonials() {
    const stored = readJson(TESTIMONIALS_KEY, null);
    if (Array.isArray(stored)) {
      return stored.map(normalizeTestimonial).filter(Boolean);
    }
    const seeded = cloneList(DEFAULT_TESTIMONIALS).map(normalizeTestimonial).filter(Boolean);
    writeJson(TESTIMONIALS_KEY, seeded);
    return seeded;
  }

  async function publishTestimonialsToCloud(list) {
    const sb = getSupabase();
    if (!sb) return false;
    try {
      const value = {
        items: Array.isArray(list) ? list : [],
        updatedAt: new Date().toISOString()
      };
      const { error } = await sb.from('site_settings').upsert({
        key: 'public_testimonials',
        value: value,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });
      return !error;
    } catch (_) {
      return false;
    }
  }

  function saveTestimonials(list, opts) {
    const normalized = (Array.isArray(list) ? list : []).map(normalizeTestimonial).filter(Boolean);
    writeJson(TESTIMONIALS_KEY, normalized);
    if (opts && opts.cloud) {
      const pub = publishTestimonialsToCloud(normalized);
      if (opts && opts.awaitCloud) return pub.then((ok) => ({ items: normalized, cloud: !!ok }));
      pub.catch(() => {});
    }
    return { items: normalized, cloud: false };
  }

  function addTestimonial(input, opts) {
    const row = normalizeTestimonial(Object.assign({}, input, {
      id: input && input.id ? input.id : ('tv_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)),
      createdAt: new Date().toISOString()
    }));
    if (!row) return { ok: false, reason: 'invalid' };
    const list = getTestimonials();
    list.unshift(row);
    const saved = saveTestimonials(list, opts || { cloud: true });
    return { ok: true, row: row, saved: saved };
  }

  function deleteTestimonial(id, opts) {
    const key = String(id || '');
    if (!key) return { ok: false };
    const list = getTestimonials().filter((row) => row.id !== key);
    const saved = saveTestimonials(list, opts || { cloud: true });
    return { ok: true, items: list, saved: saved };
  }

  async function syncTestimonialsFromCloud() {
    const sb = getSupabase();
    if (!sb) return null;
    try {
      const { data, error } = await sb
        .from('site_settings')
        .select('value')
        .eq('key', 'public_testimonials')
        .maybeSingle();
      if (error || !data || !data.value || typeof data.value !== 'object') return null;
      const items = Array.isArray(data.value.items) ? data.value.items.map(normalizeTestimonial).filter(Boolean) : null;
      if (!items) return null;
      writeJson(TESTIMONIALS_KEY, items);
      return { items: items, updatedAt: data.value.updatedAt || '' };
    } catch (_) {
      return null;
    }
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

  function mergeSuggestions(existing) {
    const byId = new Map((existing || []).map((s) => [s && s.id, s]).filter((entry) => entry[0]));
    DEFAULT_SUGGESTIONS.forEach((seed) => {
      const cur = byId.get(seed.id);
      if (!cur) {
        byId.set(seed.id, Object.assign({}, seed, {
          productIds: seed.productIds ? seed.productIds.slice() : []
        }));
        return;
      }
      // Seed adds new packs; preserve admin title/desc/badge/productIds customizations.
      byId.set(seed.id, Object.assign({}, seed, cur, {
        title: cur.title || seed.title,
        title_en: cur.title_en || seed.title_en,
        desc: cur.desc != null && cur.desc !== '' ? cur.desc : seed.desc,
        desc_en: cur.desc_en != null && cur.desc_en !== '' ? cur.desc_en : seed.desc_en,
        badge: cur.badge != null && cur.badge !== '' ? cur.badge : seed.badge,
        badge_en: cur.badge_en != null && cur.badge_en !== '' ? cur.badge_en : seed.badge_en,
        productIds: (cur.productIds && cur.productIds.length)
          ? cur.productIds.slice()
          : (seed.productIds ? seed.productIds.slice() : [])
      }));
    });
    return Array.from(byId.values());
  }

  function ensureSuggestionsVersion() {
    const current = parseInt(localStorage.getItem(SUGGESTIONS_VERSION_KEY) || '0', 10) || 0;
    if (current < SUGGESTIONS_VERSION) {
      const existing = readJson(SUGGESTIONS_KEY, []);
      writeJson(
        SUGGESTIONS_KEY,
        mergeSuggestions(existing && existing.length ? existing : cloneList(DEFAULT_SUGGESTIONS))
      );
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

  const ADMIN_CATALOG_SAVED_AT_KEY = 'raseekh_admin_catalog_saved_at';

  function hydrateAdminFromCloud(products, suggestions, opts) {
    if (!Array.isArray(products) || !products.length) return null;
    try {
      const cloudUpdated = opts && opts.updatedAt ? new Date(opts.updatedAt).getTime() : 0;
      const localSavedRaw = localStorage.getItem(ADMIN_CATALOG_SAVED_AT_KEY) || '';
      const localSaved = localSavedRaw ? new Date(localSavedRaw).getTime() : 0;
      // Do not overwrite newer local admin edits (POS/restock) with a slower cloud hydrate.
      if (localSaved && cloudUpdated && localSaved > cloudUpdated) return null;
    } catch (_) {}
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
    try { localStorage.setItem(ADMIN_CATALOG_SAVED_AT_KEY, new Date().toISOString()); } catch (_) {}
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

  function notifyEmailConfigured() {
    const email = resolveNotifyEmail();
    return !!(email && email.indexOf('@') >= 0);
  }

  /** Cloud/webhook alone is not "delivered" when admin email is configured but failed. */
  function settleDeliveryChannels(cloud, email, webhook) {
    const emailOk = !!(email && email.ok);
    const pendingConfirm = !!(email && email.pendingConfirm);
    const wantEmail = notifyEmailConfigured();
    const anyChannel = !!(cloud || webhook || emailOk);
    const delivered = anyChannel && (!wantEmail || emailOk);
    // Keep retrying email when cloud/webhook worked but FormSubmit did not.
    const pendingNotify = pendingConfirm || !!(wantEmail && !emailOk && (cloud || webhook));
    return {
      emailOk: emailOk,
      pendingNotify: pendingNotify,
      delivered: delivered
    };
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
      const isDup = msg.includes('duplicate') || msg.includes('unique') || insertErr.code === '23505';
      if (!isDup) return false;
      // Unique/fingerprint collision is only success when THIS id is already stored.
      try {
        const { data: byId } = await sb.from('client_requests').select('id').eq('id', row.id).maybeSingle();
        if (byId && byId.id === row.id) return true;
      } catch (_) {}
      return false;
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
          const merged = nextTime >= prevTime ? Object.assign({}, prev, r) : Object.assign({}, r, prev);
          // Never let a newer status-only cloud row wipe local email-retry marks.
          if (prev.deliveryStatus === 'local' || prev.deliveryStatus === 'pending_notify') {
            merged.deliveryStatus = prev.deliveryStatus;
            merged.syncPending = true;
          }
          byId.set(r.id, merged);
        }
      });
      const merged = Array.from(byId.values()).sort((a, b) => new Date(b.at || 0) - new Date(a.at || 0)).slice(0, 200);
      writeJson(CLIENT_REQUESTS_KEY, merged);
      return merged;
    } catch (_) {
      return getSharedRequests();
    }
  }

  const REQUEST_TYPE_META = {
    maintenance: {
      ar: 'صيانة مواقع',
      en: 'Website maintenance',
      summary_ar: 'متابعة دورية لموقعكم الحالي بدون إعادة بناء.',
      summary_en: 'Ongoing care for your current site — no rebuild required.',
      features_ar: ['تحديثات وإصلاح أعطال', 'تحسين السرعة والأداء', 'متابعة أمان ونسخ احتياطي', 'عرض شهري حسب حجم الموقع'],
      features_en: ['Updates and bug fixes', 'Speed and performance tuning', 'Security checks and backups', 'Monthly quote by site size']
    },
    'web-dev': {
      ar: 'تطوير مواقع',
      en: 'Website development',
      summary_ar: 'موقع جديد جاهز للتشغيل بالعربية والإنجليزية.',
      summary_en: 'A new AR/EN site ready to launch.',
      features_ar: ['مواقع شركات ومتاجر', 'تصميم متجاوب للجوال', 'نماذج تواصل وربط أساسي', 'التسعير حسب نطاق الصفحات'],
      features_en: ['Company and store sites', 'Mobile-responsive layout', 'Contact forms and basic wiring', 'Priced by page scope']
    },
    programming: {
      ar: 'خدمات البرمجة / تعديل كود',
      en: 'Programming / code changes',
      summary_ar: 'تعديل عملي على مشروعكم الحالي بعد مراجعة الكود.',
      summary_en: 'Practical changes on your current project after a code review.',
      features_ar: ['إصلاح أخطاء وإضافة مزايا', 'تحسين أداء الكود', 'مراجعة المشروع قبل التنفيذ', 'نطاق تسليم واضح'],
      features_en: ['Bug fixes and new features', 'Code performance improvements', 'Review before implementation', 'Clear delivery scope']
    },
    inventory: {
      ar: 'تطبيق مخزون',
      en: 'Inventory app',
      summary_ar: 'تطبيق لإدارة المنتجات والكميات والحركات حسب نشاطكم.',
      summary_en: 'Software for products, quantities, and stock movements.',
      features_ar: ['منتجات وكميات وحركات مخزون', 'تنبيهات نقص المخزون', 'تقارير مبسطة للتشغيل', 'مخصص لسير عمل منشأتكم'],
      features_en: ['Products, quantities, and movements', 'Low-stock alerts', 'Simple ops reports', 'Scoped to your workflow']
    },
    business: {
      ar: 'نسخة للمؤسسات',
      en: 'Institution edition',
      summary_ar: 'باقة للمؤسسات والمنشآت: تشغيل ومخزون وصلاحيات حسب الهيكل.',
      summary_en: 'Institution edition: ops, inventory, and roles by structure.',
      features_ar: ['موقع أو نظام تشغيلي', 'مخزون وصلاحيات أقسام', 'تقارير للإدارة', 'عرض سعر بعد فهم نشاط المؤسسة'],
      features_en: ['Site or operations system', 'Inventory and department roles', 'Management reports', 'Quote after we understand the organization']
    },
    systems: {
      ar: 'برمجة أنظمة ولوحات',
      en: 'Systems & dashboards',
      summary_ar: 'نظام إدارة ولوحة متابعة بصلاحيات واضحة.',
      summary_en: 'Management system and dashboard with clear roles.',
      features_ar: ['إدارة وعملاء وتقارير', 'صلاحيات مستخدمين', 'لوحات متابعة يومية', 'يبنى حسب نشاطكم'],
      features_en: ['Ops, CRM, and reports', 'User permissions', 'Daily monitoring dashboards', 'Built around your activity']
    },
    api: {
      ar: 'ربط API وأنظمة',
      en: 'API & integrations',
      summary_ar: 'ربط الدفع والرسائل والأنظمة الخارجية بمشروعكم.',
      summary_en: 'Connect payments, messaging, and external systems.',
      features_ar: ['دفع ورسائل وإشعارات', 'مزامنة بيانات بين الأنظمة', 'معالجة أخطاء وإعادة محاولة', 'التسعير حسب عدد الربط والتعقيد'],
      features_en: ['Payments, messaging, and alerts', 'Data sync between systems', 'Error handling and retries', 'Priced by integration complexity']
    },
    system: {
      ar: 'نظام كامل',
      en: 'Complete system',
      summary_ar: 'بناء نظام متكامل من الدراسة حتى التشغيل.',
      summary_en: 'Full system from discovery through go-live.',
      features_ar: ['تحليل احتياج ونطاق واضح', 'تطوير على مراحل', 'اختبار وتسليم تشغيلي', 'عقد ومتطلبات متفق عليها'],
      features_en: ['Discovery and clear scope', 'Phased development', 'Testing and operational handoff', 'Agreed contract and requirements']
    },
    hardware: {
      ar: 'أجهزة (الرياض فقط)',
      en: 'Hardware (Riyadh only)',
      summary_ar: 'شاشات وتخزين وملحقات — متوفر حالياً داخل الرياض.',
      summary_en: 'Monitors, storage, and accessories — Riyadh only for now.',
      features_ar: ['شاشات وتخزين وملحقات', 'عرض حسب التوفر', 'توصيل داخل الرياض فقط', 'ليس بديلاً عن الخدمات البرمجية'],
      features_en: ['Monitors, storage, and accessories', 'Quote by availability', 'Delivery inside Riyadh only', 'Not a substitute for software services']
    }
  };
  REQUEST_TYPE_META.electronics = REQUEST_TYPE_META.hardware;

  function requestTypeMeta(type) {
    const key = type === 'electronics' ? 'hardware' : type;
    return REQUEST_TYPE_META[key] || null;
  }

  function requestTypeLabel(type, lang) {
    const meta = requestTypeMeta(type);
    if (meta) return lang === 'en' ? meta.en : meta.ar;
    const fallback = {
      product: { ar: 'منتج', en: 'Product' },
      suggestion: { ar: 'اقتراح', en: 'Suggestion' },
      site: { ar: 'طلب موقع', en: 'Website request' }
    };
    const row = fallback[type] || { ar: type || 'طلب', en: type || 'Request' };
    return lang === 'en' ? row.en : row.ar;
  }

  function requestTypeFeatures(type, lang) {
    const meta = requestTypeMeta(type);
    if (!meta) return [];
    return lang === 'en' ? (meta.features_en || []).slice() : (meta.features_ar || []).slice();
  }

  function requestTypeSummary(type, lang) {
    const meta = requestTypeMeta(type);
    if (!meta) return '';
    return lang === 'en' ? (meta.summary_en || '') : (meta.summary_ar || '');
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
    if (cat.includes('business') || cat.includes('company') || cat.includes('institution') || cat.includes('شركات') || cat.includes('منشآت') || cat.includes('مؤسسات')) return 'business';
    if (cat.includes('api') || cat.includes('ربط')) return 'api';
    if (cat.includes('dashboard') || cat.includes('systems') || cat.includes('أنظمة') || cat.includes('لوحات')) return 'systems';
    if (cat.includes('system') || cat.includes('نظام')) return 'system';
    if (cat.includes('programming') || cat.includes('برمجة') || cat.includes('code')) return 'programming';
    return 'programming';
  }

  function requestTypeOptions() {
    return ['maintenance', 'web-dev', 'programming', 'inventory', 'business', 'systems', 'api', 'system', 'hardware']
      .map((value) => {
        const meta = REQUEST_TYPE_META[value];
        return {
          value: value,
          ar: meta.ar,
          en: meta.en,
          summary_ar: meta.summary_ar,
          summary_en: meta.summary_en,
          features_ar: (meta.features_ar || []).slice(),
          features_en: (meta.features_en || []).slice()
        };
      });
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
      : (row.source === 'admin-pos' || row.source === 'admin-manual')
        ? ['pay', row.source, row.id, String(row.total || 0), String(row.method || '')].join(':')
        : [
            'pay',
            row.id,
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
      // Reuse module-level in-flight delivery; if already delivered, do not re-notify.
      if (existing.deliveryStatus === 'delivered') {
        existing.deliveryPromise = Promise.resolve({
          cloud: true,
          email: true,
          webhook: false,
          delivered: true,
          duplicate: true
        });
        return existing;
      }
      existing.deliveryPromise = beginPaymentDelivery(existing);
      return existing;
    }
    list.unshift(row);
    savePaymentRecords(list);
    row.deliveryPromise = beginPaymentDelivery(row);
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
      const isDup = msg.includes('duplicate') || msg.includes('unique') || insertErr.code === '23505';
      if (!isDup) return false;
      try {
        const { data: byId } = await sb.from('payments').select('id').eq('id', row.id).maybeSingle();
        if (byId && byId.id === row.id) return true;
        if (row.paymentId) {
          const { data: byPid } = await sb.from('payments').select('id,payment_id').eq('payment_id', row.paymentId).maybeSingle();
          if (byPid && byPid.id === row.id) return true;
        }
      } catch (_) {}
      return false;
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

  async function runDeliverPaymentRecord(row) {
    if (row && row.deliveryStatus === 'delivered') {
      return {
        cloud: true,
        email: false,
        webhook: false,
        emailDetail: null,
        pendingNotify: false,
        delivered: true,
        duplicate: true
      };
    }
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
    const settled = settleDeliveryChannels(cloud, email, webhook);
    try {
      const list = getPaymentRecords();
      const idx = list.findIndex((r) => r && row && r.id === row.id);
      if (idx >= 0) {
        if (settled.delivered) {
          delete list[idx].syncPending;
          list[idx].deliveryStatus = 'delivered';
        } else {
          list[idx].syncPending = true;
          list[idx].deliveryStatus = settled.pendingNotify ? 'pending_notify' : 'local';
        }
        savePaymentRecords(list);
        row.deliveryStatus = list[idx].deliveryStatus;
        row.syncPending = list[idx].syncPending;
      }
    } catch (_) {}
    return {
      cloud: !!cloud,
      email: settled.emailOk,
      webhook: !!webhook,
      emailDetail: email || null,
      pendingNotify: settled.pendingNotify,
      delivered: settled.delivered
    };
  }

  async function retryPendingPayments() {
    const list = getPaymentRecords();
    const pending = list.filter((r) => r && (r.syncPending || r.deliveryStatus === 'local' || r.deliveryStatus === 'pending_notify'));
    for (const row of pending.slice(0, 20)) {
      try {
        const key = deliveryKey(row);
        if (key && inFlightPaymentDeliveries.has(key)) {
          await inFlightPaymentDeliveries.get(key);
        }
        const fresh = getPaymentRecords().find((r) => r && r.id === row.id) || row;
        if (fresh.deliveryStatus === 'delivered' && !fresh.syncPending) continue;
        await beginPaymentDelivery(fresh);
      } catch (_) {}
    }
    return getPaymentRecords();
  }

  function normalizeFingerprintPart(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function requestContentFingerprint(row) {
    return [
      'req',
      normalizeFingerprintPart(row && row.type),
      normalizeFingerprintPart((row && (row.userId || row.email || row.phone)) || ''),
      normalizeFingerprintPart(row && row.company),
      normalizeFingerprintPart(row && row.message)
    ].join(':');
  }

  function requestFingerprint(row) {
    // Bucket keeps DB unique windows short; local dedupe matches content without the bucket.
    const bucket = Math.floor(Date.now() / (5 * 60 * 1000));
    return [requestContentFingerprint(row), bucket].join(':');
  }

  function findExistingSharedRequest(list, row) {
    if (!row) return null;
    const content = requestContentFingerprint(row);
    const windowMs = 60 * 60 * 1000;
    const now = Date.now();
    return (list || []).find((x) => {
      if (!x) return false;
      if (row.fingerprint && x.fingerprint && x.fingerprint === row.fingerprint) return true;
      if (requestContentFingerprint(x) !== content) return false;
      const at = new Date(x.at || 0).getTime();
      return !!(at && (now - at) < windowMs);
    }) || null;
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
    const existing = findExistingSharedRequest(list, row);
    if (existing) {
      // Already delivered in this fingerprint window — do not re-email/webhook.
      if (existing.deliveryStatus === 'delivered') {
        existing.deliveryPromise = Promise.resolve({
          cloud: true,
          email: false,
          webhook: false,
          pendingNotify: false,
          delivered: true,
          accepted: true,
          duplicate: true
        });
        return existing;
      }
      // Reuse module-level in-flight delivery; settled failures retry via begin*.
      existing.deliveryPromise = beginRequestDelivery(existing);
      return existing;
    }
    list.unshift(row);
    writeJson(CLIENT_REQUESTS_KEY, list.slice(0, 200));
    // Deliver outside this browser: cloud row + email + webhook (best-effort)
    row.deliveryPromise = beginRequestDelivery(row);
    return row;
  }

  async function runDeliverSharedRequest(row) {
    // Status sync / cloud-hydrated rows: update cloud only — do not re-email/webhook.
    // local | pending_notify still need a full delivery attempt.
    const needsFullDeliver = !!(row && (row.deliveryStatus === 'local' || row.deliveryStatus === 'pending_notify'));
    if (row && row.syncPending && !needsFullDeliver) {
      const cloud = await pushRequestToCloud(row, { allowUpdate: true });
      try {
        const list = getSharedRequests();
        const idx = list.findIndex((r) => r && row && r.id === row.id);
        if (idx >= 0) {
          if (cloud) {
            delete list[idx].syncPending;
            list[idx].deliveryStatus = list[idx].deliveryStatus || 'delivered';
          } else {
            list[idx].syncPending = true;
          }
          saveSharedRequests(list);
        }
      } catch (_) {}
      return {
        cloud: !!cloud,
        email: false,
        webhook: false,
        emailDetail: null,
        pendingNotify: false,
        delivered: !!cloud,
        accepted: true,
        statusOnly: true
      };
    }
    await syncPublicNotifyFromCloud().catch(() => {});
    const cloud = await pushRequestToCloud(row);
    const email = await notifyAdminEmail(row);
    const webhook = await notifyRequestWebhook(row);
    const settled = settleDeliveryChannels(cloud, email, webhook);
    try {
      const list = getSharedRequests();
      const idx = list.findIndex((r) => r && row && r.id === row.id);
      if (idx >= 0) {
        if (settled.delivered) {
          delete list[idx].syncPending;
          list[idx].deliveryStatus = 'delivered';
        } else {
          list[idx].syncPending = true;
          list[idx].deliveryStatus = settled.pendingNotify ? 'pending_notify' : 'local';
        }
        saveSharedRequests(list);
        row.deliveryStatus = list[idx].deliveryStatus;
        row.syncPending = list[idx].syncPending;
      }
    } catch (_) {}
    return {
      cloud: !!cloud,
      email: settled.emailOk,
      webhook: !!webhook,
      emailDetail: email || null,
      pendingNotify: settled.pendingNotify,
      delivered: settled.delivered,
      accepted: true
    };
  }

  async function retryPendingSharedRequests() {
    const list = getSharedRequests();
    const pending = list.filter((r) => r && (r.syncPending || r.deliveryStatus === 'local' || r.deliveryStatus === 'pending_notify'));
    for (const row of pending.slice(0, 20)) {
      try {
        const key = deliveryKey(row);
        if (key && inFlightRequestDeliveries.has(key)) {
          await inFlightRequestDeliveries.get(key);
        }
        const fresh = getSharedRequests().find((r) => r && r.id === row.id) || row;
        if (fresh.deliveryStatus === 'delivered' && !fresh.syncPending) continue;
        await beginRequestDelivery(fresh);
      } catch (_) {}
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
    const prevDelivery = list[idx].deliveryStatus;
    list[idx] = Object.assign({}, list[idx], {
      status: status || list[idx].status,
      updatedAt: new Date().toISOString(),
      syncPending: true,
      // Keep failed local delivery marks; otherwise treat as already-known for status-only sync.
      deliveryStatus: (prevDelivery === 'local' || prevDelivery === 'pending_notify')
        ? prevDelivery
        : (prevDelivery || 'delivered')
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
      try {
        const cloudUpdated = data.value.updatedAt ? new Date(data.value.updatedAt).getTime() : 0;
        const localSavedRaw = localStorage.getItem(ADMIN_CATALOG_SAVED_AT_KEY) || '';
        const localSaved = localSavedRaw ? new Date(localSavedRaw).getTime() : 0;
        // Same freshness gate as admin hydrate — do not clobber newer local POS/restock.
        if (localSaved && cloudUpdated && localSaved > cloudUpdated) return null;
      } catch (_) {}
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
    retryPendingSharedRequests,
    retryPendingPayments,
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
    requestTypeFeatures,
    requestTypeSummary,
    requestTypeMeta,
    requestTypeForProduct,
    requestTypeOptions,
    PAYMENTS_KEY,
    getPaymentRecords,
    savePaymentRecords,
    addPaymentRecord,
    deliverPaymentRecord: beginPaymentDelivery,
    deliverSharedRequest: beginRequestDelivery,
    pushPaymentToCloud,
    syncPaymentsFromCloud,
    pushRequestToCloud,
    syncSharedRequestsFromCloud,
    publishClientCatalogToCloud,
    syncPublicCatalogFromCloud,
    getTestimonials,
    saveTestimonials,
    addTestimonial,
    deleteTestimonial,
    publishTestimonialsToCloud,
    syncTestimonialsFromCloud,
    DEFAULT_TESTIMONIALS: cloneList(DEFAULT_TESTIMONIALS),
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
      retryPendingPayments().catch(() => {});
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
