/* Shared Terms & Conditions + Privacy for Raseekh (page + client overlay). */
(function (global) {
  const TERMS_VERSION = '2026-07-25-v3';
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
            <p data-ar="تقدّم راسخ خدمات تقنية إلكترونية تشمل: صيانة المواقع، تطوير وتعديل البرمجة، تطبيقات المخزون، حلول للمؤسسات والمنشآت، والأنظمة التشغيلية، ربط الأنظمة وواجهات API، وبناء لوحات تحكم حسب احتياج العميل. نطاق كل عمل يُحدد كتابةً في عرض السعر أو الاتفاق المعتمد قبل التنفيذ." data-en="Raseekh provides digital technical services including website maintenance, programming and code changes, inventory apps, institution solutions, operational systems, API/system integrations, and custom dashboards. Scope is written in the approved quote or agreement before work starts.">تقدّم راسخ خدمات تقنية إلكترونية تشمل: صيانة المواقع، تطوير وتعديل البرمجة، تطبيقات المخزون، حلول للمؤسسات والمنشآت، والأنظمة التشغيلية، ربط الأنظمة وواجهات API، وبناء لوحات تحكم حسب احتياج العميل. نطاق كل عمل يُحدد كتابةً في عرض السعر أو الاتفاق المعتمد قبل التنفيذ.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="2) الطلبات وعروض الأسعار" data-en="2) Requests and quotes">2) الطلبات وعروض الأسعار</h3>
            <p data-ar="إرسال طلب عبر الموقع أو حساب العميل لا يُعد عقداً نهائياً. الأسعار الظاهرة كـ«حسب الطلب» أو عبر حاسبة التقدير إرشادية إلى حين المراجعة. يصبح العرض ملزماً بعد موافقة الطرفين على النطاق والتكلفة والمدة. أي تغيير جوهري في المتطلبات قد يحدّث السعر أو الجدول باتفاق مسبق." data-en="Submitting a request is not a final contract. “On request” prices and the estimate calculator are guidance until review. A quote becomes binding after both parties approve scope, cost, and timeline. Material requirement changes may update price or schedule by prior agreement.">إرسال طلب عبر الموقع أو حساب العميل لا يُعد عقداً نهائياً. الأسعار الظاهرة كـ«حسب الطلب» أو عبر حاسبة التقدير إرشادية إلى حين المراجعة. يصبح العرض ملزماً بعد موافقة الطرفين على النطاق والتكلفة والمدة. أي تغيير جوهري في المتطلبات قد يحدّث السعر أو الجدول باتفاق مسبق.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="3) حساب العميل والصلاحيات" data-en="3) Client account and roles">3) حساب العميل والصلاحيات</h3>
            <p data-ar="حساب العميل مخصص للطلب والمتابعة وسداد العربون عند التفعيل. إدارة الكتالوج والخدمات وعروض الأسعار مخصصة لحساب المالك فقط. العميل مسؤول عن سرية بيانات الدخول وإبلاغنا فوراً عند الاشتباه بأي استخدام غير مصرّح." data-en="A client account is for requesting, tracking, and paying a deposit when enabled. Catalog, services, and quote management are owner-only. Clients are responsible for login confidentiality and must report suspected unauthorized use promptly.">حساب العميل مخصص للطلب والمتابعة وسداد العربون عند التفعيل. إدارة الكتالوج والخدمات وعروض الأسعار مخصصة لحساب المالك فقط. العميل مسؤول عن سرية بيانات الدخول وإبلاغنا فوراً عند الاشتباه بأي استخدام غير مصرّح.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="4) ملكية النظام والملكية الفكرية" data-en="4) System ownership and IP">4) ملكية النظام والملكية الفكرية</h3>
            <p data-ar="ما لم يُنص على غير ذلك في العرض المكتوب: (أ) البناء المخصّص المنشور على بنية العميل — تنتقل ملكية المخرجات المتفق عليها للعميل بعد السداد الكامل والتسليم، مع احتفاظ راسخ بحقوق أدواتها العامة ومكتباتها الداخلية غير الخاصة بالمشروع؛ (ب) الترخيص المستضاف — يمنح العميل حق استخدام النظام وفق مدة الترخيص دون نقل ملكية الكود كاملاً. بيانات أعمال العميل داخل النظام تبقى ملك العميل في الحالتين." data-en="Unless the written quote says otherwise: (a) custom build on client infrastructure — agreed deliverables ownership transfers to the client after full payment and handover, while Raseekh retains rights to its general tools and internal libraries not specific to the project; (b) hosted license — the client receives a right to use the system for the license term without full code ownership transfer. Client business data inside the system remains the client’s in both cases.">ما لم يُنص على غير ذلك في العرض المكتوب: (أ) البناء المخصّص المنشور على بنية العميل — تنتقل ملكية المخرجات المتفق عليها للعميل بعد السداد الكامل والتسليم، مع احتفاظ راسخ بحقوق أدواتها العامة ومكتباتها الداخلية غير الخاصة بالمشروع؛ (ب) الترخيص المستضاف — يمنح العميل حق استخدام النظام وفق مدة الترخيص دون نقل ملكية الكود كاملاً. بيانات أعمال العميل داخل النظام تبقى ملك العميل في الحالتين.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="5) تطبيقات المخزون والأنظمة البرمجية" data-en="5) Inventory apps and software systems">5) تطبيقات المخزون والأنظمة البرمجية</h3>
            <p data-ar="نطوّر تطبيقات مخزون، إدارة منتجات، وتتبع كميات وعمليات، بالإضافة إلى أنظمة تشغيل ولوحات تقارير حسب نشاطكم. التسليم يتم على مراحل متفق عليها. يلتزم العميل بتزويد المتطلبات والصلاحيات والبيانات اللازمة في وقت مناسب." data-en="We build inventory apps, product management, and stock/process tracking, plus operational systems and reporting dashboards for your business. Delivery is in agreed stages. Clients must provide requirements, access, and data in good time.">نطوّر تطبيقات مخزون، إدارة منتجات، وتتبع كميات وعمليات، بالإضافة إلى أنظمة تشغيل ولوحات تقارير حسب نشاطكم. التسليم يتم على مراحل متفق عليها. يلتزم العميل بتزويد المتطلبات والصلاحيات والبيانات اللازمة في وقت مناسب.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="6) الاستضافة والبيانات" data-en="6) Hosting and data">6) الاستضافة والبيانات</h3>
            <p data-ar="خيارات الاستضافة تُحدد في العرض حسب طلب العميل: خوادم العميل، أو بيئة سحابية متفق عليها، أو ترخيص مستضاف. نراعي متطلبات التشغيل وأمن الوصول، ونتعامل مع البيانات الشخصية وفق أنظمة المملكة بما فيها نظام حماية البيانات الشخصية (PDPL) بالقدر المنطبق على الخدمة." data-en="Hosting options are set in the quote per client request: the client’s servers, an agreed cloud environment, or a hosted license. We consider ops needs and access security, and handle personal data under Saudi rules including PDPL to the extent applicable to the service.">خيارات الاستضافة تُحدد في العرض حسب طلب العميل: خوادم العميل، أو بيئة سحابية متفق عليها، أو ترخيص مستضاف. نراعي متطلبات التشغيل وأمن الوصول، ونتعامل مع البيانات الشخصية وفق أنظمة المملكة بما فيها نظام حماية البيانات الشخصية (PDPL) بالقدر المنطبق على الخدمة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="7) الأجهزة المادية" data-en="7) Physical hardware">7) الأجهزة المادية</h3>
            <p data-ar="توريد الأجهزة المادية متاح حالياً داخل الرياض فقط، وقد لا يظهر في واجهة العميل العامة. أي طلب أجهزة يُراجع حسب التوفر والموقع، ولا يُلزم راسخ قبل تأكيد كتابي." data-en="Physical hardware supply is currently available in Riyadh only and may be hidden from the public client catalog. Hardware requests are reviewed by availability and location and are not binding until written confirmation.">توريد الأجهزة المادية متاح حالياً داخل الرياض فقط، وقد لا يظهر في واجهة العميل العامة. أي طلب أجهزة يُراجع حسب التوفر والموقع، ولا يُلزم راسخ قبل تأكيد كتابي.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="8) الدفع والعربون وسياسة الاسترداد" data-en="8) Payment, deposits, and refunds">8) الدفع والعربون وسياسة الاسترداد</h3>
            <p data-ar="الدفع الإلكتروني عبر بوابة Moyasar للعملاء المسجّلين عند تفعيل السداد. قد يُطلب عربون أو دفعات مرحلية قبل بدء التنفيذ وفق عرض السعر. سياسة الاسترداد حسب المرحلة ما لم يُتفق كتابةً على غير ذلك: (1) مرحلة الفهم/الاكتشاف قبل أي تصميم أو بناء — يُراجع ردّ العربون أو معظمه بعد خصم تكلفة الدراسة إن وُجدت؛ (2) مرحلة التصميم بعد اعتماد مخرجات تصميم — يُحتسب ما أُنجز من التصميم ويُسوّى المتبقي بحسن نية؛ (3) مرحلة البناء بعد بدء التنفيذ المسلَّم — يُحتسب العربون والدفعات ضمن قيمة العمل المنجز ولا يُفترض استرداد كامل. أي إلغاء من طرف راسخ دون سبب عائد للعميل يُعالج بردّ مناسب لما لم يُسلَّم." data-en="Online payments use Moyasar for signed-in clients when checkout is enabled. Deposits or milestone payments may be required before work begins, per the quote. Refunds by phase unless otherwise agreed in writing: (1) discovery before any design or build — deposit refund (full or most) after deducting discovery cost if any; (2) design after design deliverables are approved — completed design work is charged and the balance settled in good faith; (3) build after delivered work has started — deposits and payments apply to completed work and a full refund is not assumed. If Raseekh cancels without client cause, an appropriate refund for undelivered work applies.">الدفع الإلكتروني عبر بوابة Moyasar للعملاء المسجّلين عند تفعيل السداد. قد يُطلب عربون أو دفعات مرحلية قبل بدء التنفيذ وفق عرض السعر. سياسة الاسترداد حسب المرحلة ما لم يُتفق كتابةً على غير ذلك: (1) مرحلة الفهم/الاكتشاف قبل أي تصميم أو بناء — يُراجع ردّ العربون أو معظمه بعد خصم تكلفة الدراسة إن وُجدت؛ (2) مرحلة التصميم بعد اعتماد مخرجات تصميم — يُحتسب ما أُنجز من التصميم ويُسوّى المتبقي بحسن نية؛ (3) مرحلة البناء بعد بدء التنفيذ المسلَّم — يُحتسب العربون والدفعات ضمن قيمة العمل المنجز ولا يُفترض استرداد كامل. أي إلغاء من طرف راسخ دون سبب عائد للعميل يُعالج بردّ مناسب لما لم يُسلَّم.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="9) الجودة والدعم بعد التسليم" data-en="9) Quality and post-delivery support">9) الجودة والدعم بعد التسليم</h3>
            <p data-ar="نلتزم بتنفيذ النطاق المتفق عليه بعناية مهنية معقولة. إصلاح عيوب النطاق خلال 30 يوماً بعد التسليم يكون دون رسوم إضافية ما لم ينص العرض على غير ذلك. بعدها تتوفر عقود صيانة اختيارية. الطلبات الجديدة أو خارج النطاق أو التوسيع بعد التشغيل تُسعَّر كعمل إضافي باتفاق مسبق." data-en="We deliver the agreed scope with reasonable professional care. Fixes for in-scope defects within 30 days after delivery are free unless the quote says otherwise. Optional maintenance contracts are available afterward. New requests, out-of-scope work, or post-go-live upgrades are quoted as additional work by prior agreement.">نلتزم بتنفيذ النطاق المتفق عليه بعناية مهنية معقولة. إصلاح عيوب النطاق خلال 30 يوماً بعد التسليم يكون دون رسوم إضافية ما لم ينص العرض على غير ذلك. بعدها تتوفر عقود صيانة اختيارية. الطلبات الجديدة أو خارج النطاق أو التوسيع بعد التشغيل تُسعَّر كعمل إضافي باتفاق مسبق.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="10) السرية واتفاقية عدم الإفصاح (NDA)" data-en="10) Confidentiality and NDA">10) السرية واتفاقية عدم الإفصاح (NDA)</h3>
            <p data-ar="نتعامل بسرية مع معلومات أعمالكم غير العامة التي تصلنا لتنفيذ الخدمة. عند الحاجة وقبل مشاركة تفاصيل حساسة، يمكن توقيع اتفاقية عدم إفصاح (NDA) بناءً على طلبكم عبر نموذج التواصل أو حساب العميل. سياسة الخصوصية التفصيلية متاحة في صفحة مستقلة على الموقع." data-en="We treat non-public business information you share for delivery as confidential. When needed and before sensitive details are shared, an NDA can be signed at your request via the contact form or client account. A detailed privacy policy is available on a separate site page.">نتعامل بسرية مع معلومات أعمالكم غير العامة التي تصلنا لتنفيذ الخدمة. عند الحاجة وقبل مشاركة تفاصيل حساسة، يمكن توقيع اتفاقية عدم إفصاح (NDA) بناءً على طلبكم عبر نموذج التواصل أو حساب العميل. سياسة الخصوصية التفصيلية متاحة في صفحة مستقلة على الموقع.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="11) الخصوصية والبيانات" data-en="11) Privacy and data">11) الخصوصية والبيانات</h3>
            <p data-ar="نجمع بيانات التواصل والطلب اللازمة للرد وتنفيذ الخدمة. لا نبيع بياناتكم لأطراف ثالثة. قد تُستخدم أدوات تشغيل ضرورية فقط لغرض تقديم الخدمة أو ما يقتضيه النظام. راجعوا صفحة سياسة الخصوصية للتفاصيل." data-en="We collect contact and request data needed to deliver the service. We do not sell your data. Essential operators may be used only to provide the service or as required by law. See the Privacy Policy page for details.">نجمع بيانات التواصل والطلب اللازمة للرد وتنفيذ الخدمة. لا نبيع بياناتكم لأطراف ثالثة. قد تُستخدم أدوات تشغيل ضرورية فقط لغرض تقديم الخدمة أو ما يقتضيه النظام. راجعوا صفحة سياسة الخصوصية للتفاصيل.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="12) حدود المسؤولية" data-en="12) Limitation of liability">12) حدود المسؤولية</h3>
            <p data-ar="تبذل راسخ جهداً معقولاً لتقديم خدمة مهنية. لا تتحمل راسخ مسؤولية الأضرار غير المباشرة أو خسائر الأرباح الناتجة عن تأخير خارج سيطرتها أو أعطال طرف ثالث (مثل بوابات الدفع أو الاستضافة الخارجية)، ما لم ينص الاتفاق الخاص على ضمان أوسع." data-en="Raseekh will use reasonable care. Raseekh is not liable for indirect damages or lost profits from delays beyond its control or third-party failures (such as payment gateways or external hosting), unless a specific agreement provides a broader warranty.">تبذل راسخ جهداً معقولاً لتقديم خدمة مهنية. لا تتحمل راسخ مسؤولية الأضرار غير المباشرة أو خسائر الأرباح الناتجة عن تأخير خارج سيطرتها أو أعطال طرف ثالث (مثل بوابات الدفع أو الاستضافة الخارجية)، ما لم ينص الاتفاق الخاص على ضمان أوسع.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="13) إساءة الاستخدام" data-en="13) Misuse">13) إساءة الاستخدام</h3>
            <p data-ar="يُحظر استخدام الموقع أو الحساب لأي غرض غير مشروع أو محاولة اختراق أو تعطيل الخدمة. يحق لراسخ تعليق أو إنهاء الوصول عند المخالفة، مع إشعار العميل عند الإمكان." data-en="You may not use the website or account for unlawful purposes or to breach/disrupt the service. Raseekh may suspend or terminate access for violations, with notice when reasonably possible.">يُحظر استخدام الموقع أو الحساب لأي غرض غير مشروع أو محاولة اختراق أو تعطيل الخدمة. يحق لراسخ تعليق أو إنهاء الوصول عند المخالفة، مع إشعار العميل عند الإمكان.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="14) القانون وحل الخلافات" data-en="14) Law and disputes">14) القانون وحل الخلافات</h3>
            <p data-ar="تخضع هذه الشروط لأنظمة المملكة العربية السعودية. نسعى أولاً لحل أي خلاف ودياً خلال مدة معقولة. إن تعذّر ذلك، تكون الجهة المختصة وفق الأنظمة السعودية. قد نحدّث الشروط عند الحاجة ويُنشر التحديث مع تاريخ آخر تعديل؛ استمرار الاستخدام بعد النشر يعني الموافقة على التحديث للتعاملات الجديدة." data-en="These terms are governed by the laws of Saudi Arabia. We first seek an amicable resolution within a reasonable time. If that fails, competent Saudi forums apply. Updates may be posted with a last-updated date; continued use after posting means acceptance for new dealings.">تخضع هذه الشروط لأنظمة المملكة العربية السعودية. نسعى أولاً لحل أي خلاف ودياً خلال مدة معقولة. إن تعذّر ذلك، تكون الجهة المختصة وفق الأنظمة السعودية. قد نحدّث الشروط عند الحاجة ويُنشر التحديث مع تاريخ آخر تعديل؛ استمرار الاستخدام بعد النشر يعني الموافقة على التحديث للتعاملات الجديدة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="15) التواصل" data-en="15) Contact">15) التواصل</h3>
            <p data-ar="للاستفسار عن الشروط أو الخدمات استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل (البريد ورقم الجوال مطلوبان في الطلب). نهدف للرد خلال يوم عمل قدر الإمكان." data-en="For questions about these terms or services, use the quote form on the website or client account (email and phone are required on requests). We aim to reply within one business day.">للاستفسار عن الشروط أو الخدمات استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل (البريد ورقم الجوال مطلوبان في الطلب). نهدف للرد خلال يوم عمل قدر الإمكان.</p>
          </article>
        </div>
      </div>
    `;
  }

  function privacyHtml() {
    return `
      <div class="terms-doc">
        <div class="terms-doc-head">
          <div class="eyebrow" data-ar="الخصوصية" data-en="Privacy">الخصوصية</div>
          <h2 data-ar="سياسة الخصوصية" data-en="Privacy Policy">سياسة الخصوصية</h2>
          <p data-ar="توضح هذه السياسة كيف تجمع راسخ بياناتكم وتعالجها عند استخدام الموقع أو حساب العميل أو إرسال طلب." data-en="This policy explains how Raseekh collects and processes your data when you use the website, client account, or submit a request.">توضح هذه السياسة كيف تجمع راسخ بياناتكم وتعالجها عند استخدام الموقع أو حساب العميل أو إرسال طلب.</p>
          <div class="terms-updated" data-ar="آخر تحديث: يوليو 2026" data-en="Last updated: July 2026">آخر تحديث: يوليو 2026</div>
        </div>
        <div class="terms-list">
          <article class="terms-item">
            <h3 data-ar="1) ما الذي نجمعه؟" data-en="1) What we collect">1) ما الذي نجمعه؟</h3>
            <p data-ar="بيانات التواصل التي تقدّمونها (الاسم، البريد، الجوال، الشركة)، نص الطلب، وبيانات الحساب اللازمة لتسجيل الدخول والمتابعة والسداد. قد تُسجَّل إحصاءات زيارة مجمّعة لتحسين الخدمة دون بيع بيانات شخصية." data-en="Contact details you provide (name, email, phone, company), request text, and account data needed for sign-in, tracking, and payment. Aggregated visit stats may be recorded to improve the service without selling personal data.">بيانات التواصل التي تقدّمونها (الاسم، البريد، الجوال، الشركة)، نص الطلب، وبيانات الحساب اللازمة لتسجيل الدخول والمتابعة والسداد. قد تُسجَّل إحصاءات زيارة مجمّعة لتحسين الخدمة دون بيع بيانات شخصية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="2) لماذا نجمعها؟" data-en="2) Why we collect it">2) لماذا نجمعها؟</h3>
            <p data-ar="للرد على طلباتكم، إعداد عروض الأسعار، تنفيذ الخدمة، متابعة الحالة من حساب العميل، وإتمام العربون عند التفعيل، والامتثال للالتزامات النظامية عند الاقتضاء." data-en="To reply to requests, prepare quotes, deliver the service, track status in the client account, complete deposits when enabled, and meet legal duties when applicable.">للرد على طلباتكم، إعداد عروض الأسعار، تنفيذ الخدمة، متابعة الحالة من حساب العميل، وإتمام العربون عند التفعيل، والامتثال للالتزامات النظامية عند الاقتضاء.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="3) المشاركة مع أطراف ثالثة" data-en="3) Sharing with third parties">3) المشاركة مع أطراف ثالثة</h3>
            <p data-ar="لا نبيع بياناتكم. قد تُستخدم أدوات تشغيل ضرورية فقط (مثل الاستضافة، البريد التشغيلي، أو بوابة الدفع Moyasar) لغرض تقديم الخدمة وفق إعداداتها الأمنية." data-en="We do not sell your data. Essential operators only (such as hosting, operational email, or the Moyasar payment gateway) may be used to deliver the service under their security settings.">لا نبيع بياناتكم. قد تُستخدم أدوات تشغيل ضرورية فقط (مثل الاستضافة، البريد التشغيلي، أو بوابة الدفع Moyasar) لغرض تقديم الخدمة وفق إعداداتها الأمنية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="4) بيانات أعمالكم داخل الأنظمة" data-en="4) Your business data inside systems">4) بيانات أعمالكم داخل الأنظمة</h3>
            <p data-ar="بيانات التشغيل داخل الأنظمة التي نبنيها لكم تبقى ملككم. نتعامل معها بسرية، ويمكن توقيع NDA قبل مشاركة تفاصيل حساسة." data-en="Operational data inside systems we build for you remains yours. We handle it confidentially, and an NDA can be signed before sensitive details are shared.">بيانات التشغيل داخل الأنظمة التي نبنيها لكم تبقى ملككم. نتعامل معها بسرية، ويمكن توقيع NDA قبل مشاركة تفاصيل حساسة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="5) الأمان والاحتفاظ" data-en="5) Security and retention">5) الأمان والاحتفاظ</h3>
            <p data-ar="نستخدم اتصال HTTPS وإجراءات وصول معقولة. نحتفظ ببيانات الطلب والحساب للمدة اللازمة لتقديم الخدمة والمتابعة النظامية، ثم نراجع الحذف أو التقييد عند الطلب المشروع." data-en="We use HTTPS and reasonable access controls. We retain request and account data as needed to deliver the service and meet legal follow-up, then review deletion or restriction on a lawful request.">نستخدم اتصال HTTPS وإجراءات وصول معقولة. نحتفظ ببيانات الطلب والحساب للمدة اللازمة لتقديم الخدمة والمتابعة النظامية، ثم نراجع الحذف أو التقييد عند الطلب المشروع.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="6) ملفات المشروع والخصوصية" data-en="6) Project files and privacy">6) ملفات المشروع والخصوصية</h3>
            <p data-ar="عند مشاركة ملفات (مثل PDF أو جداول) عبر قناة المشروع بعد قبول الطلب: تُنقل عبر قنوات مشفّرة قدر الإمكان (HTTPS أو قناة متفق عليها)، وتُستخدم للتنفيذ فقط دون مشاركة لأغراض تسويق طرف ثالث. يمكن الاتفاق كتابةً على حذف الملفات بعد التسليم أو بعد مدة محددة. نعالج البيانات الشخصية وفق أنظمة المملكة بما فيها PDPL بالقدر المنطبق." data-en="When project files (such as PDFs or spreadsheets) are shared via the project channel after acceptance: they are transferred over encrypted channels where practical (HTTPS or an agreed channel), used for delivery only, and not shared for third-party marketing. Written agreement can set deletion after handover or after a set period. We process personal data under Saudi rules including PDPL to the extent applicable.">عند مشاركة ملفات (مثل PDF أو جداول) عبر قناة المشروع بعد قبول الطلب: تُنقل عبر قنوات مشفّرة قدر الإمكان (HTTPS أو قناة متفق عليها)، وتُستخدم للتنفيذ فقط دون مشاركة لأغراض تسويق طرف ثالث. يمكن الاتفاق كتابةً على حذف الملفات بعد التسليم أو بعد مدة محددة. نعالج البيانات الشخصية وفق أنظمة المملكة بما فيها PDPL بالقدر المنطبق.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="7) حقوقكم والتواصل" data-en="7) Your rights and contact">7) حقوقكم والتواصل</h3>
            <p data-ar="يمكنكم طلب تصحيح بيانات التواصل أو الاستفسار عن المعالجة عبر نموذج التواصل أو حساب العميل. تخضع المعالجة لأنظمة المملكة بما فيها PDPL بالقدر المنطبق. راجعوا أيضاً الشروط والأحكام وصفحة الأمان." data-en="You may request correction of contact data or ask about processing via the contact form or client account. Processing follows Saudi rules including PDPL to the extent applicable. See also the Terms & Conditions and the Security page.">يمكنكم طلب تصحيح بيانات التواصل أو الاستفسار عن المعالجة عبر نموذج التواصل أو حساب العميل. تخضع المعالجة لأنظمة المملكة بما فيها PDPL بالقدر المنطبق. راجعوا أيضاً الشروط والأحكام وصفحة الأمان.</p>
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

  function renderPrivacyInto(el) {
    if (!el) return;
    el.innerHTML = privacyHtml();
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
    privacyHtml,
    renderInto,
    renderPrivacyInto,
    hasAccepted,
    acceptTerms,
    acceptTermsByEmail,
    syncAcceptance,
    probeCloud,
    userKey
  };
})(typeof window !== 'undefined' ? window : globalThis);
