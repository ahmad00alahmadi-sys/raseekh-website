/* Shared Terms & Conditions for Raseekh (page + client overlay). */
(function (global) {
  const TERMS_VERSION = '2026-07';
  const ACCEPT_KEY = 'raseekh_terms_accepted_v1';

  function termsHtml() {
    return `
      <div class="terms-doc">
        <div class="terms-doc-head">
          <div class="eyebrow" data-ar="الشروط" data-en="Terms">الشروط</div>
          <h2 data-ar="الشروط والأحكام" data-en="Terms & Conditions">الشروط والأحكام</h2>
          <p data-ar="باستخدام موقع راسخ أو إنشاء حساب أو إرسال طلب، فإنكم توافقون على هذه الشروط." data-en="By using the Raseekh website, creating an account, or submitting a request, you agree to these terms.">باستخدام موقع راسخ أو إنشاء حساب أو إرسال طلب، فإنكم توافقون على هذه الشروط.</p>
          <div class="terms-updated" data-ar="آخر تحديث: يوليو 2026" data-en="Last updated: July 2026">آخر تحديث: يوليو 2026</div>
        </div>
        <div class="terms-list">
          <article class="terms-item">
            <h3 data-ar="1) طبيعة الخدمة" data-en="1) Nature of service">1) طبيعة الخدمة</h3>
            <p data-ar="تقدّم راسخ خدمات تقنية إلكترونية تشمل: صيانة المواقع، تطوير وتعديل البرمجة، ربط الأنظمة وواجهات API، وبناء أنظمة ولوحات تحكم حسب احتياج العميل. نطاق كل عمل يُحدد في عرض السعر أو الاتفاق المعتمد مع العميل." data-en="Raseekh provides digital technical services including website maintenance, programming and code changes, API/system integrations, and custom systems/dashboards. Scope is defined in the approved quote or agreement.">تقدّم راسخ خدمات تقنية إلكترونية تشمل: صيانة المواقع، تطوير وتعديل البرمجة، ربط الأنظمة وواجهات API، وبناء أنظمة ولوحات تحكم حسب احتياج العميل. نطاق كل عمل يُحدد في عرض السعر أو الاتفاق المعتمد مع العميل.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="2) الطلبات وعروض الأسعار" data-en="2) Requests and quotes">2) الطلبات وعروض الأسعار</h3>
            <p data-ar="إرسال طلب عبر الموقع أو حساب العميل لا يُعد عقداً نهائياً. الأسعار الظاهرة كـ«حسب الطلب» تقديرية أو بانتظار المراجعة. يصبح العرض ملزماً بعد موافقة الطرفين على النطاق والتكلفة والمدة." data-en="Submitting a request is not a final contract. “On request” prices are provisional. A quote becomes binding after both parties approve scope, cost, and timeline.">إرسال طلب عبر الموقع أو حساب العميل لا يُعد عقداً نهائياً. الأسعار الظاهرة كـ«حسب الطلب» تقديرية أو بانتظار المراجعة. يصبح العرض ملزماً بعد موافقة الطرفين على النطاق والتكلفة والمدة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="3) حساب العميل والصلاحيات" data-en="3) Client account and roles">3) حساب العميل والصلاحيات</h3>
            <p data-ar="حساب العميل مخصص للطلب والمتابعة والدفع عند التفعيل. تعديل الكتالوج والأسعار والمخزون والمبيعات مخصص لحساب الإدارة فقط. العميل مسؤول عن سرية بيانات الدخول." data-en="A client account is for requesting, tracking, and paying when enabled. Catalog and sales editing are admin-only. Clients are responsible for login confidentiality.">حساب العميل مخصص للطلب والمتابعة والدفع عند التفعيل. تعديل الكتالوج والأسعار والمخزون والمبيعات مخصص لحساب الإدارة فقط. العميل مسؤول عن سرية بيانات الدخول.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="4) الأجهزة المادية" data-en="4) Physical hardware">4) الأجهزة المادية</h3>
            <p data-ar="توريد الأجهزة المادية متاح حالياً داخل الرياض فقط، وقد لا يظهر في واجهة العميل العامة. أي طلب أجهزة يُراجع حسب التوفر والموقع." data-en="Physical hardware supply is currently available in Riyadh only and may be hidden from the public client catalog. Hardware requests are reviewed by availability and location.">توريد الأجهزة المادية متاح حالياً داخل الرياض فقط، وقد لا يظهر في واجهة العميل العامة. أي طلب أجهزة يُراجع حسب التوفر والموقع.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="5) الخدمات البرمجية والأنظمة" data-en="5) Programming and systems">5) الخدمات البرمجية والأنظمة</h3>
            <p data-ar="التنفيذ يتم على مراحل متفق عليها. حقوق الاستخدام والتسليم للكود أو النظام تُحدد في الاتفاق الخاص بكل مشروع. يلتزم العميل بتزويد المتطلبات والبيانات والصلاحيات اللازمة في وقت مناسب." data-en="Work is delivered in agreed stages. Usage rights and delivery of code/systems are defined per project agreement. Clients must provide requirements, data, and access in good time.">التنفيذ يتم على مراحل متفق عليها. حقوق الاستخدام والتسليم للكود أو النظام تُحدد في الاتفاق الخاص بكل مشروع. يلتزم العميل بتزويد المتطلبات والبيانات والصلاحيات اللازمة في وقت مناسب.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="6) الدفع والعربون" data-en="6) Payment and deposits">6) الدفع والعربون</h3>
            <p data-ar="الدفع الإلكتروني عبر بوابة Moyasar للعملاء المسجّلين عند تفعيل السداد. العربون أو الدفعات المرحلية قد تُطلب قبل بدء التنفيذ وفق عرض السعر." data-en="Online payments use Moyasar for signed-in clients when checkout is enabled. Deposits or milestone payments may be required before work begins, per the quote.">الدفع الإلكتروني عبر بوابة Moyasar للعملاء المسجّلين عند تفعيل السداد. العربون أو الدفعات المرحلية قد تُطلب قبل بدء التنفيذ وفق عرض السعر.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="7) الخصوصية والبيانات" data-en="7) Privacy and data">7) الخصوصية والبيانات</h3>
            <p data-ar="نجمع بيانات التواصل والطلب اللازمة للرد وتنفيذ الخدمة. لا نبيع بياناتكم لأطراف ثالثة. قد تُستخدم أدوات تشغيل ضرورية فقط لغرض تقديم الخدمة أو ما يقتضيه النظام." data-en="We collect contact and request data needed to deliver the service. We do not sell your data. Essential operators may be used only to provide the service or as required by law.">نجمع بيانات التواصل والطلب اللازمة للرد وتنفيذ الخدمة. لا نبيع بياناتكم لأطراف ثالثة. قد تُستخدم أدوات تشغيل ضرورية فقط لغرض تقديم الخدمة أو ما يقتضيه النظام.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="8) حدود المسؤولية" data-en="8) Limitation of liability">8) حدود المسؤولية</h3>
            <p data-ar="تبذل راسخ جهداً معقولاً لتقديم خدمة مهنية. لا تتحمل راسخ مسؤولية الأضرار غير المباشرة أو خسائر الأرباح الناتجة عن تأخير خارج سيطرتها أو أعطال طرف ثالث." data-en="Raseekh will use reasonable care. Raseekh is not liable for indirect damages or lost profits from delays beyond its control or third-party failures.">تبذل راسخ جهداً معقولاً لتقديم خدمة مهنية. لا تتحمل راسخ مسؤولية الأضرار غير المباشرة أو خسائر الأرباح الناتجة عن تأخير خارج سيطرتها أو أعطال طرف ثالث.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="9) إساءة الاستخدام" data-en="9) Misuse">9) إساءة الاستخدام</h3>
            <p data-ar="يُحظر استخدام الموقع أو الحساب لأي غرض غير مشروع أو محاولة اختراق أو تعطيل الخدمة. يحق لراسخ تعليق أو إنهاء الوصول عند المخالفة." data-en="You may not use the website or account for unlawful purposes or to breach/disrupt the service. Raseekh may suspend or terminate access for violations.">يُحظر استخدام الموقع أو الحساب لأي غرض غير مشروع أو محاولة اختراق أو تعطيل الخدمة. يحق لراسخ تعليق أو إنهاء الوصول عند المخالفة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="10) القانون والتعديلات" data-en="10) Law and changes">10) القانون والتعديلات</h3>
            <p data-ar="تخضع هذه الشروط لأنظمة المملكة العربية السعودية. قد نحدّث الشروط عند الحاجة ويُنشر التحديث مع تاريخ آخر تعديل." data-en="These terms are governed by the laws of Saudi Arabia. Updates may be posted with a last-updated date.">تخضع هذه الشروط لأنظمة المملكة العربية السعودية. قد نحدّث الشروط عند الحاجة ويُنشر التحديث مع تاريخ آخر تعديل.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="11) التواصل" data-en="11) Contact">11) التواصل</h3>
            <p data-ar="للاستفسار استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل. الرد خلال يوم عمل قدر الإمكان." data-en="For questions, use the quote form on the website or client account. We aim to reply within one business day.">للاستفسار استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل. الرد خلال يوم عمل قدر الإمكان.</p>
          </article>
        </div>
      </div>
    `;
  }

  function readAcceptMap() {
    try {
      const raw = localStorage.getItem(ACCEPT_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writeAcceptMap(map) {
    localStorage.setItem(ACCEPT_KEY, JSON.stringify(map || {}));
  }

  function userKey(user) {
    if (!user) return '';
    return String(user.id || user.email || '').trim().toLowerCase();
  }

  function hasAccepted(user) {
    const key = userKey(user);
    if (!key) return false;
    const map = readAcceptMap();
    const row = map[key];
    return !!(row && row.version === TERMS_VERSION);
  }

  function acceptTerms(user) {
    const key = userKey(user);
    if (!key) return false;
    const map = readAcceptMap();
    const row = {
      version: TERMS_VERSION,
      at: new Date().toISOString(),
      email: user.email || ''
    };
    map[key] = row;
    writeAcceptMap(map);
    pushAcceptance(user, row);
    return true;
  }

  async function pushAcceptance(user, row) {
    try {
      const sb = global.RaseekhAuth && global.RaseekhAuth.supabase;
      if (!sb || !user) return;
      const key = userKey(user);
      if (!key) return;
      await sb.from('terms_acceptance').upsert({
        user_key: key,
        user_id: user.id || '',
        email: user.email || '',
        version: row.version || TERMS_VERSION,
        accepted_at: row.at || new Date().toISOString()
      }, { onConflict: 'user_key' });
    } catch (_) {}
  }

  async function syncAcceptance(user) {
    try {
      const sb = global.RaseekhAuth && global.RaseekhAuth.supabase;
      if (!sb || !user) return hasAccepted(user);
      const key = userKey(user);
      if (!key) return false;
      const { data, error } = await sb
        .from('terms_acceptance')
        .select('version, accepted_at, email')
        .eq('user_key', key)
        .maybeSingle();
      if (!error && data && data.version === TERMS_VERSION) {
        const map = readAcceptMap();
        map[key] = {
          version: data.version,
          at: data.accepted_at || new Date().toISOString(),
          email: data.email || user.email || ''
        };
        writeAcceptMap(map);
        return true;
      }
      return hasAccepted(user);
    } catch (_) {
      return hasAccepted(user);
    }
  }

  function renderInto(el) {
    if (!el) return;
    el.innerHTML = termsHtml();
  }

  global.RaseekhTerms = {
    TERMS_VERSION,
    termsHtml,
    renderInto,
    hasAccepted,
    acceptTerms,
    syncAcceptance,
    userKey
  };
})(typeof window !== 'undefined' ? window : globalThis);
