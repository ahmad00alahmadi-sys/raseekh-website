/* Shared Terms & Conditions for Raseekh (page + client overlay). */
(function (global) {
  const TERMS_VERSION = '2026-07-25-v2';
  const ACCEPT_KEY = 'raseekh_terms_accepted_v1';

  function termsHtml() {
    return `
      <div class="terms-doc">
        <div class="terms-doc-head">
          <div class="eyebrow" data-ar="الشروط" data-en="Terms">الشروط</div>
          <h2 data-ar="الشروط والأحكام" data-en="Terms & Conditions">الشروط والأحكام</h2>
          <p data-ar="باستخدام موقع راسخ أو إنشاء حساب أو إرسال طلب أو سداد عربون، فإنكم توافقون على هذه الشروط بصيغة عادلة وواضحة للطرفين." data-en="By using the Raseekh website, creating an account, submitting a request, or paying a deposit, you agree to these fair and clear terms for both sides.">باستخدام موقع راسخ أو إنشاء حساب أو إرسال طلب أو سداد عربون، فإنكم توافقون على هذه الشروط بصيغة عادلة وواضحة للطرفين.</p>
          <div class="terms-updated" data-ar="آخر تحديث: يوليو 2026" data-en="Last updated: July 2026">آخر تحديث: يوليو 2026</div>
        </div>
        <div class="terms-list">
          <article class="terms-item">
            <h3 data-ar="1) طبيعة الخدمة" data-en="1) Nature of service">1) طبيعة الخدمة</h3>
            <p data-ar="تقدّم راسخ خدمات تقنية إلكترونية تشمل: صيانة المواقع، تطوير وتعديل البرمجة، تطبيقات المخزون، حلول للشركات والمنشآت، والأنظمة التشغيلية، ربط الأنظمة وواجهات API، وبناء لوحات تحكم حسب احتياج العميل. نطاق كل عمل يُحدد كتابةً في عرض السعر أو الاتفاق المعتمد قبل التنفيذ." data-en="Raseekh provides digital technical services including website maintenance, programming and code changes, inventory apps, business solutions for companies, operational systems, API/system integrations, and custom dashboards. Scope is written in the approved quote or agreement before work starts.">تقدّم راسخ خدمات تقنية إلكترونية تشمل: صيانة المواقع، تطوير وتعديل البرمجة، تطبيقات المخزون، حلول للشركات والمنشآت، والأنظمة التشغيلية، ربط الأنظمة وواجهات API، وبناء لوحات تحكم حسب احتياج العميل. نطاق كل عمل يُحدد كتابةً في عرض السعر أو الاتفاق المعتمد قبل التنفيذ.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="2) الطلبات وعروض الأسعار" data-en="2) Requests and quotes">2) الطلبات وعروض الأسعار</h3>
            <p data-ar="إرسال طلب عبر الموقع أو حساب العميل لا يُعد عقداً نهائياً. الأسعار الظاهرة كـ«حسب الطلب» تقديرية إلى حين المراجعة. يصبح العرض ملزماً بعد موافقة الطرفين على النطاق والتكلفة والمدة. أي تغيير جوهري في المتطلبات قد يحدّث السعر أو الجدول باتفاق مسبق." data-en="Submitting a request is not a final contract. “On request” prices are provisional until review. A quote becomes binding after both parties approve scope, cost, and timeline. Material requirement changes may update price or schedule by prior agreement.">إرسال طلب عبر الموقع أو حساب العميل لا يُعد عقداً نهائياً. الأسعار الظاهرة كـ«حسب الطلب» تقديرية إلى حين المراجعة. يصبح العرض ملزماً بعد موافقة الطرفين على النطاق والتكلفة والمدة. أي تغيير جوهري في المتطلبات قد يحدّث السعر أو الجدول باتفاق مسبق.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="3) حساب العميل والصلاحيات" data-en="3) Client account and roles">3) حساب العميل والصلاحيات</h3>
            <p data-ar="حساب العميل مخصص للطلب والمتابعة وسداد العربون عند التفعيل. إدارة الكتالوج والخدمات وعروض الأسعار مخصصة لحساب الإدارة فقط. العميل مسؤول عن سرية بيانات الدخول وإبلاغنا فوراً عند الاشتباه بأي استخدام غير مصرّح." data-en="A client account is for requesting, tracking, and paying a deposit when enabled. Catalog, services, and quote management are admin-only. Clients are responsible for login confidentiality and must report suspected unauthorized use promptly.">حساب العميل مخصص للطلب والمتابعة وسداد العربون عند التفعيل. إدارة الكتالوج والخدمات وعروض الأسعار مخصصة لحساب الإدارة فقط. العميل مسؤول عن سرية بيانات الدخول وإبلاغنا فوراً عند الاشتباه بأي استخدام غير مصرّح.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="4) تطبيقات المخزون والأنظمة البرمجية" data-en="4) Inventory apps and software systems">4) تطبيقات المخزون والأنظمة البرمجية</h3>
            <p data-ar="نطوّر تطبيقات مخزون، إدارة منتجات، وتتبع كميات وعمليات، بالإضافة إلى أنظمة تشغيل ولوحات تقارير حسب نشاطكم. التسليم يتم على مراحل متفق عليها. ملكية بيانات العميل تبقى للعميل. حقوق استخدام الكود أو النظام تُحدد في الاتفاق الخاص بالمشروع، ويلتزم العميل بتزويد المتطلبات والصلاحيات والبيانات اللازمة في وقت مناسب." data-en="We build inventory apps, product management, and stock/process tracking, plus operational systems and reporting dashboards for your business. Delivery is in agreed stages. Client data remains yours. Usage rights for code/systems are defined per project agreement. Clients must provide requirements, access, and data in good time.">نطوّر تطبيقات مخزون، إدارة منتجات، وتتبع كميات وعمليات، بالإضافة إلى أنظمة تشغيل ولوحات تقارير حسب نشاطكم. التسليم يتم على مراحل متفق عليها. ملكية بيانات العميل تبقى للعميل. حقوق استخدام الكود أو النظام تُحدد في الاتفاق الخاص بالمشروع، ويلتزم العميل بتزويد المتطلبات والصلاحيات والبيانات اللازمة في وقت مناسب.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="5) الأجهزة المادية" data-en="5) Physical hardware">5) الأجهزة المادية</h3>
            <p data-ar="توريد الأجهزة المادية متاح حالياً داخل الرياض فقط، وقد لا يظهر في واجهة العميل العامة. أي طلب أجهزة يُراجع حسب التوفر والموقع، ولا يُلزم راسخ قبل تأكيد كتابي." data-en="Physical hardware supply is currently available in Riyadh only and may be hidden from the public client catalog. Hardware requests are reviewed by availability and location and are not binding until written confirmation.">توريد الأجهزة المادية متاح حالياً داخل الرياض فقط، وقد لا يظهر في واجهة العميل العامة. أي طلب أجهزة يُراجع حسب التوفر والموقع، ولا يُلزم راسخ قبل تأكيد كتابي.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="6) الدفع والعربون" data-en="6) Payment and deposits">6) الدفع والعربون</h3>
            <p data-ar="الدفع الإلكتروني عبر بوابة Moyasar للعملاء المسجّلين عند تفعيل السداد. قد يُطلب عربون أو دفعات مرحلية قبل بدء التنفيذ وفق عرض السعر. إذا أُلغي المشروع من طرف العميل قبل بدء العمل المتفق عليه، يُراجع ردّ العربون أو جزء منه بحسن نية حسب ما بُذل من دراسة أو تجهيز. بعد بدء التنفيذ، يُحتسب العربون ضمن قيمة العمل المنجز ما لم يُتفق على غير ذلك كتابةً." data-en="Online payments use Moyasar for signed-in clients when checkout is enabled. Deposits or milestone payments may be required before work begins, per the quote. If the client cancels before agreed work starts, deposit refund (full or partial) is reviewed in good faith against discovery/setup already done. After work starts, the deposit is applied to delivered work unless otherwise agreed in writing.">الدفع الإلكتروني عبر بوابة Moyasar للعملاء المسجّلين عند تفعيل السداد. قد يُطلب عربون أو دفعات مرحلية قبل بدء التنفيذ وفق عرض السعر. إذا أُلغي المشروع من طرف العميل قبل بدء العمل المتفق عليه، يُراجع ردّ العربون أو جزء منه بحسن نية حسب ما بُذل من دراسة أو تجهيز. بعد بدء التنفيذ، يُحتسب العربون ضمن قيمة العمل المنجز ما لم يُتفق على غير ذلك كتابةً.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="7) الجودة والدعم بعد التسليم" data-en="7) Quality and post-delivery support">7) الجودة والدعم بعد التسليم</h3>
            <p data-ar="نلتزم بتنفيذ النطاق المتفق عليه بعناية مهنية معقولة. إصلاح العيوب داخل النطاق المتفق خلال فترة مراجعة قصيرة بعد التسليم يكون دون رسوم إضافية ما لم ينص العرض على غير ذلك. الطلبات الجديدة أو خارج النطاق تُسعَّر كعمل إضافي باتفاق مسبق." data-en="We deliver the agreed scope with reasonable professional care. Fixes for defects within the agreed scope during a short post-delivery review window are free unless the quote says otherwise. New requests or out-of-scope work are quoted as additional work by prior agreement.">نلتزم بتنفيذ النطاق المتفق عليه بعناية مهنية معقولة. إصلاح العيوب داخل النطاق المتفق خلال فترة مراجعة قصيرة بعد التسليم يكون دون رسوم إضافية ما لم ينص العرض على غير ذلك. الطلبات الجديدة أو خارج النطاق تُسعَّر كعمل إضافي باتفاق مسبق.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="8) الخصوصية والبيانات" data-en="8) Privacy and data">8) الخصوصية والبيانات</h3>
            <p data-ar="نجمع بيانات التواصل والطلب اللازمة للرد وتنفيذ الخدمة. لا نبيع بياناتكم لأطراف ثالثة. قد تُستخدم أدوات تشغيل ضرورية فقط لغرض تقديم الخدمة أو ما يقتضيه النظام. بيانات أعمالكم داخل الأنظمة المبنية لكم تبقى ملككم، ونتعامل معها بسرية." data-en="We collect contact and request data needed to deliver the service. We do not sell your data. Essential operators may be used only to provide the service or as required by law. Your business data inside systems we build for you remains yours and is handled confidentially.">نجمع بيانات التواصل والطلب اللازمة للرد وتنفيذ الخدمة. لا نبيع بياناتكم لأطراف ثالثة. قد تُستخدم أدوات تشغيل ضرورية فقط لغرض تقديم الخدمة أو ما يقتضيه النظام. بيانات أعمالكم داخل الأنظمة المبنية لكم تبقى ملككم، ونتعامل معها بسرية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="9) حدود المسؤولية" data-en="9) Limitation of liability">9) حدود المسؤولية</h3>
            <p data-ar="تبذل راسخ جهداً معقولاً لتقديم خدمة مهنية. لا تتحمل راسخ مسؤولية الأضرار غير المباشرة أو خسائر الأرباح الناتجة عن تأخير خارج سيطرتها أو أعطال طرف ثالث (مثل بوابات الدفع أو الاستضافة الخارجية)، ما لم ينص الاتفاق الخاص على ضمان أوسع." data-en="Raseekh will use reasonable care. Raseekh is not liable for indirect damages or lost profits from delays beyond its control or third-party failures (such as payment gateways or external hosting), unless a specific agreement provides a broader warranty.">تبذل راسخ جهداً معقولاً لتقديم خدمة مهنية. لا تتحمل راسخ مسؤولية الأضرار غير المباشرة أو خسائر الأرباح الناتجة عن تأخير خارج سيطرتها أو أعطال طرف ثالث (مثل بوابات الدفع أو الاستضافة الخارجية)، ما لم ينص الاتفاق الخاص على ضمان أوسع.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="10) إساءة الاستخدام" data-en="10) Misuse">10) إساءة الاستخدام</h3>
            <p data-ar="يُحظر استخدام الموقع أو الحساب لأي غرض غير مشروع أو محاولة اختراق أو تعطيل الخدمة. يحق لراسخ تعليق أو إنهاء الوصول عند المخالفة، مع إشعار العميل عند الإمكان." data-en="You may not use the website or account for unlawful purposes or to breach/disrupt the service. Raseekh may suspend or terminate access for violations, with notice when reasonably possible.">يُحظر استخدام الموقع أو الحساب لأي غرض غير مشروع أو محاولة اختراق أو تعطيل الخدمة. يحق لراسخ تعليق أو إنهاء الوصول عند المخالفة، مع إشعار العميل عند الإمكان.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="11) القانون وحل الخلافات" data-en="11) Law and disputes">11) القانون وحل الخلافات</h3>
            <p data-ar="تخضع هذه الشروط لأنظمة المملكة العربية السعودية. نسعى أولاً لحل أي خلاف ودياً خلال مدة معقولة. إن تعذّر ذلك، تكون الجهة المختصة وفق الأنظمة السعودية. قد نحدّث الشروط عند الحاجة ويُنشر التحديث مع تاريخ آخر تعديل؛ استمرار الاستخدام بعد النشر يعني الموافقة على التحديث للتعاملات الجديدة." data-en="These terms are governed by the laws of Saudi Arabia. We first seek an amicable resolution within a reasonable time. If that fails, competent Saudi forums apply. Updates may be posted with a last-updated date; continued use after posting means acceptance for new dealings.">تخضع هذه الشروط لأنظمة المملكة العربية السعودية. نسعى أولاً لحل أي خلاف ودياً خلال مدة معقولة. إن تعذّر ذلك، تكون الجهة المختصة وفق الأنظمة السعودية. قد نحدّث الشروط عند الحاجة ويُنشر التحديث مع تاريخ آخر تعديل؛ استمرار الاستخدام بعد النشر يعني الموافقة على التحديث للتعاملات الجديدة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="12) التواصل" data-en="12) Contact">12) التواصل</h3>
            <p data-ar="للاستفسار عن الشروط أو الخدمات استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل. نهدف للرد خلال يوم عمل قدر الإمكان." data-en="For questions about these terms or services, use the quote form on the website or client account. We aim to reply within one business day.">للاستفسار عن الشروط أو الخدمات استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل. نهدف للرد خلال يوم عمل قدر الإمكان.</p>
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
    return String(user.email || user.id || '').trim().toLowerCase();
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
      email: (user && user.email) || key,
      syncPending: true
    };
    map[key] = row;
    writeAcceptMap(map);
    // Fire and forget, but keep syncPending until a later authenticated push succeeds.
    pushAcceptance(user, row).then((ok) => {
      if (!ok) return;
      const next = readAcceptMap();
      if (next[key]) {
        delete next[key].syncPending;
        writeAcceptMap(next);
      }
    }).catch(() => {});
    return true;
  }

  function acceptTermsByEmail(email) {
    const key = String(email || '').trim().toLowerCase();
    if (!key) return false;
    return acceptTerms({ email: key, id: '' });
  }

  async function pushAcceptance(user, row) {
    try {
      const sb = global.RaseekhAuth && global.RaseekhAuth.supabase;
      if (!sb || !user) return false;
      const key = userKey(user);
      if (!key) return false;
      // Need an authenticated session for RLS; guest email-confirm accept stays local until login.
      try {
        const { data: sess } = await sb.auth.getSession();
        if (!(sess && sess.session)) return false;
      } catch (_) {
        return false;
      }
      const { error } = await sb.from('terms_acceptance').upsert({
        user_key: key,
        user_id: user.id || '',
        email: user.email || '',
        version: (row && row.version) || TERMS_VERSION,
        accepted_at: (row && row.at) || new Date().toISOString()
      }, { onConflict: 'user_key' });
      return !error;
    } catch (_) {
      return false;
    }
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
      // Local acceptance exists for this version but cloud row missing — push after auth.
      if (hasAccepted(user)) {
        const map = readAcceptMap();
        const local = map[key];
        const ok = await pushAcceptance(user, local || { version: TERMS_VERSION, at: new Date().toISOString() });
        if (ok && map[key]) {
          delete map[key].syncPending;
          writeAcceptMap(map);
        }
        return true;
      }
      return false;
    } catch (_) {
      return hasAccepted(user);
    }
  }

  function renderInto(el) {
    if (!el) return;
    el.innerHTML = termsHtml();
  }

  async function probeCloud() {
    try {
      const sb = global.RaseekhAuth && global.RaseekhAuth.supabase;
      if (!sb) return { ok: false, reason: 'no-client' };
      const { error } = await sb.from('terms_acceptance').select('user_key').limit(1);
      if (error) return { ok: false, reason: error.message || 'table-missing' };
      return { ok: true };
    } catch (err) {
      return { ok: false, reason: String(err && err.message || err || 'error') };
    }
  }

  global.RaseekhTerms = {
    TERMS_VERSION,
    termsHtml,
    renderInto,
    hasAccepted,
    acceptTerms,
    acceptTermsByEmail,
    syncAcceptance,
    probeCloud,
    userKey
  };
})(typeof window !== 'undefined' ? window : globalThis);
