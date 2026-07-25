/* Shared Terms & Conditions + Privacy for Raseekh (page + client overlay). */
(function (global) {
  const TERMS_VERSION = '2026-07-25-v7';
  const ACCEPT_KEY = 'raseekh_terms_accepted_v1';

  function termsHtml() {
    return `
      <div class="terms-doc">
        <div class="terms-doc-head">
          <div class="eyebrow" data-ar="الشروط" data-en="Terms">الشروط</div>
          <h2 data-ar="الشروط والأحكام" data-en="Terms & Conditions">الشروط والأحكام</h2>
          <p data-ar="باستخدام موقع راسخ أو إنشاء حساب أو تسجيل الدخول أو إرسال طلب أو شراء منتج أو الاتفاق على عربون وفق العرض المكتوب، فإنكم توافقون على هذه الشروط — بما فيها شروط الحساب وشروط الشراء — بصيغة عادلة وواضحة للطرفين." data-en="By using the Raseekh website, creating an account, signing in, submitting a request, purchasing a product, or agreeing a deposit per the written quote, you agree to these fair and clear terms — including account and purchase terms — for both sides.">باستخدام موقع راسخ أو إنشاء حساب أو إرسال طلب أو الاتفاق على عربون وفق العرض المكتوب، فإنكم توافقون على هذه الشروط بصيغة عادلة وواضحة للطرفين.</p>
          <div class="terms-updated" data-ar="آخر تحديث: يوليو 2026" data-en="Last updated: July 2026">آخر تحديث: يوليو 2026</div>
        </div>
        <div class="terms-list">
          <article class="terms-item">
            <h3 data-ar="1) طبيعة الخدمة" data-en="1) Nature of service">1) طبيعة الخدمة</h3>
            <p data-ar="تقدّم راسخ خدمات تقنية إلكترونية تشمل: صيانة المواقع، تطوير وتعديل البرمجة، تطبيقات المخزون، حلول للمؤسسات والمنشآت، والأنظمة التشغيلية، ربط الأنظمة وواجهات API، وبناء لوحات تحكم حسب احتياج العميل. كما قد تُعرض منتجات أو أجهزة مرتبطة بالخدمة عند توفرها. نطاق كل عمل أو طلب يُحدد كتابةً في عرض السعر أو الاتفاق المعتمد قبل التنفيذ." data-en="Raseekh provides digital technical services including website maintenance, programming and code changes, inventory apps, institution solutions, operational systems, API/system integrations, and custom dashboards. Related products or hardware may also be offered when available. Scope for each job or order is written in the approved quote or agreement before work starts.">تقدّم راسخ خدمات تقنية إلكترونية تشمل: صيانة المواقع، تطوير وتعديل البرمجة، تطبيقات المخزون، حلول للمؤسسات والمنشآت، والأنظمة التشغيلية، ربط الأنظمة وواجهات API، وبناء لوحات تحكم حسب احتياج العميل. كما قد تُعرض منتجات أو أجهزة مرتبطة بالخدمة عند توفرها. نطاق كل عمل أو طلب يُحدد كتابةً في عرض السعر أو الاتفاق المعتمد قبل التنفيذ.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="2) الطلبات وعروض الأسعار" data-en="2) Requests and quotes">2) الطلبات وعروض الأسعار</h3>
            <p data-ar="إرسال طلب عبر الموقع أو حساب العميل لا يُعد عقداً نهائياً. الأسعار الظاهرة كـ«حسب الطلب» أو عبر حاسبة التقدير إرشادية إلى حين المراجعة. يصبح العرض ملزماً بعد موافقة الطرفين على النطاق والتكلفة والمدة. أي تغيير جوهري في المتطلبات قد يحدّث السعر أو الجدول باتفاق مسبق." data-en="Submitting a request is not a final contract. “On request” prices and the estimate calculator are guidance until review. A quote becomes binding after both parties approve scope, cost, and timeline. Material requirement changes may update price or schedule by prior agreement.">إرسال طلب عبر الموقع أو حساب العميل لا يُعد عقداً نهائياً. الأسعار الظاهرة كـ«حسب الطلب» أو عبر حاسبة التقدير إرشادية إلى حين المراجعة. يصبح العرض ملزماً بعد موافقة الطرفين على النطاق والتكلفة والمدة. أي تغيير جوهري في المتطلبات قد يحدّث السعر أو الجدول باتفاق مسبق.</p>
          </article>

          <article class="terms-item" id="terms-auth">
            <h3 data-ar="أ) شروط وأحكام تسجيل الدخول وإنشاء الحساب" data-en="A) Sign-in and account registration terms">أ) شروط وأحكام تسجيل الدخول وإنشاء الحساب</h3>
            <p data-ar="تنطبق البنود التالية عند تسجيل الدخول أو إنشاء حساب على موقع راسخ." data-en="The following clauses apply when signing in or creating an account on the Raseekh website.">تنطبق البنود التالية عند تسجيل الدخول أو إنشاء حساب على موقع راسخ.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="أ-1) شروط التسجيل" data-en="A-1) Registration accuracy">أ-1) شروط التسجيل</h3>
            <p data-ar="يتعهد المستخدم بأن جميع البيانات المدخلة عند التسجيل (مثل الاسم، البريد الإلكتروني، ورقم الجوال) صحيحة، دقيقة، وحديثة، ويتحمل المسؤولية الكاملة عن أي تأخير أو ضرر ناتج عن تقديم بيانات وهمية أو خاطئة." data-en="The user warrants that all registration details (such as name, email, and mobile number) are true, accurate, and up to date, and accepts full responsibility for any delay or harm caused by false or incorrect information.">يتعهد المستخدم بأن جميع البيانات المدخلة عند التسجيل (مثل الاسم، البريد الإلكتروني، ورقم الجوال) صحيحة، دقيقة، وحديثة، ويتحمل المسؤولية الكاملة عن أي تأخير أو ضرر ناتج عن تقديم بيانات وهمية أو خاطئة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="أ-2) أمان وحماية الحساب" data-en="A-2) Account security">أ-2) أمان وحماية الحساب</h3>
            <p data-ar="المستخدم هو المسؤول الوحيد عن الحفاظ على سرية بيانات حسابه (كلمة المرور، اسم المستخدم، أو رموز التحقق)، ويتحمل المسؤولية الكاملة عن كافة الأنشطة والعمليات التي تتم من خلال حسابه. ويلزم على المستخدم إبلاغ إدارة الموقع فوراً في حال اكتشاف أي استخدام غير مصرح به أو اختراق لحسابه." data-en="The user alone is responsible for keeping account credentials confidential (password, username, or verification codes) and accepts full responsibility for all activity through the account. The user must notify site administration immediately if any unauthorized use or account breach is discovered.">المستخدم هو المسؤول الوحيد عن الحفاظ على سرية بيانات حسابه (كلمة المرور، اسم المستخدم، أو رموز التحقق)، ويتحمل المسؤولية الكاملة عن كافة الأنشطة والعمليات التي تتم من خلال حسابه. ويلزم على المستخدم إبلاغ إدارة الموقع فوراً في حال اكتشاف أي استخدام غير مصرح به أو اختراق لحسابه.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="أ-3) القيود والاستخدام المقبول" data-en="A-3) Acceptable use">أ-3) القيود والاستخدام المقبول</h3>
            <p data-ar="يُمنع منعاً باتاً استخدام الحساب في أي أنشطة غير قانونية، أو محاولة اختراق الموقع، أو التلاعب بالأنظمة، أو محاولة إلحاق الضرر براسخ أو مستخدميه الآخرين. ويحق لإدارة الموقع إيقاف أو حظر أي حساب يخالف هذه الشروط دون أدنى مسؤولية." data-en="Accounts may not be used for unlawful activity, attempts to breach the site, system manipulation, or harm to Raseekh or other users. Site administration may suspend or ban any account that violates these terms without liability.">يُمنع منعاً باتاً استخدام الحساب في أي أنشطة غير قانونية، أو محاولة اختراق الموقع، أو التلاعب بالأنظمة، أو محاولة إلحاق الضرر براسخ أو مستخدميه الآخرين. ويحق لإدارة الموقع إيقاف أو حظر أي حساب يخالف هذه الشروط دون أدنى مسؤولية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="أ-4) الحسابات الوهمية والمكررة" data-en="A-4) Fake or duplicate accounts">أ-4) الحسابات الوهمية والمكررة</h3>
            <p data-ar="لا يُسمح بإنشاء حسابات وهمية أو متعددة للشخص نفسه بغرض التحايل أو إساءة استخدام العروض والخدمات، وللموقع الحق المطلق في حذف أو تجميد أي حسابات مشبوهة أو مكررة." data-en="Creating fake or multiple accounts for the same person to circumvent or abuse offers and services is not allowed. The site has absolute right to delete or freeze any suspicious or duplicate accounts.">لا يُسمح بإنشاء حسابات وهمية أو متعددة للشخص نفسه بغرض التحايل أو إساءة استخدام العروض والخدمات، وللموقع الحق المطلق في حذف أو تجميد أي حسابات مشبوهة أو مكررة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="أ-5) إيقاف أو إغلاق الحساب" data-en="A-5) Suspension or closure">أ-5) إيقاف أو إغلاق الحساب</h3>
            <p data-ar="يحق لإدارة الموقع إيقاف، تعليق، أو إغلاق أي حساب مستخدم في أي وقت ودون سابق إنذار، في حال مخالفة الشروط والأحكام، أو بناءً على طلب رسمي من الجهات المختصة، أو في حال عدم نشاط الحساب لفترات طويلة." data-en="Site administration may stop, suspend, or close any user account at any time without prior notice for terms violations, upon an official competent-authority request, or for prolonged inactivity.">يحق لإدارة الموقع إيقاف، تعليق، أو إغلاق أي حساب مستخدم في أي وقت ودون سابق إنذار، في حال مخالفة الشروط والأحكام، أو بناءً على طلب رسمي من الجهات المختصة، أو في حال عدم نشاط الحساب لفترات طويلة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="أ-6) الخصوصية عند التسجيل والدخول" data-en="A-6) Privacy on sign-in and registration">أ-6) الخصوصية عند التسجيل والدخول</h3>
            <p data-ar="باستخدامك لميزتي تسجيل الدخول أو إنشاء الحساب، فإنك توافق على جمع واستخدام بياناتك الشخصية ومعالجتها وفقاً لسياسة الخصوصية الخاصة بالموقع وبما يضمن تقديم الخدمات وتحسينها فقط." data-en="By using sign-in or account creation, you agree to collection, use, and processing of your personal data under the site Privacy Policy, solely to provide and improve services.">باستخدامك لميزتي تسجيل الدخول أو إنشاء الحساب، فإنك توافق على جمع واستخدام بياناتك الشخصية ومعالجتها وفقاً لسياسة الخصوصية الخاصة بالموقع وبما يضمن تقديم الخدمات وتحسينها فقط.</p>
          </article>

          <article class="terms-item">
            <h3 data-ar="3) حساب العميل والصلاحيات" data-en="3) Client account and roles">3) حساب العميل والصلاحيات</h3>
            <p data-ar="حساب العميل مخصص للطلب والمتابعة، وسداد العربون عند تفعيل مسار الدفع الإلكتروني أو وفق طريقة متفق عليها في العرض المكتوب. إدارة الكتالوج والخدمات وعروض الأسعار مخصصة لحساب المالك فقط. تُطبَّق أيضاً بنود «شروط تسجيل الدخول وإنشاء الحساب» أعلاه كاملةً." data-en="A client account is for requesting and tracking, and for paying a deposit when online checkout is enabled or per the written quote. Catalog, services, and quote management are owner-only. The Sign-in and account registration terms above also apply in full.">حساب العميل مخصص للطلب والمتابعة، وسداد العربون عند تفعيل مسار الدفع الإلكتروني أو وفق طريقة متفق عليها في العرض المكتوب. إدارة الكتالوج والخدمات وعروض الأسعار مخصصة لحساب المالك فقط. تُطبَّق أيضاً بنود «شروط تسجيل الدخول وإنشاء الحساب» أعلاه كاملةً.</p>
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
            <p data-ar="السداد الإلكتروني العام من الموقع متوقف مؤقتاً. طريقة الدفع والعربون تُتفقان كتابةً في عرض السعر (تحويل، تسجيل يدوي من الإدارة، أو بوابة دفع مرخّصة عند إعادة التفعيل للعملاء المسجّلين). قد يُطلب عربون أو دفعات مرحلية قبل بدء التنفيذ. سياسة الاسترداد حسب المرحلة ما لم يُتفق كتابةً على غير ذلك: (1) مرحلة الفهم/الاكتشاف قبل أي تصميم أو بناء — يُراجع ردّ العربون أو معظمه بعد خصم تكلفة الدراسة إن وُجدت؛ (2) مرحلة التصميم بعد اعتماد مخرجات تصميم — يُحتسب ما أُنجز من التصميم ويُسوّى المتبقي بحسن نية؛ (3) مرحلة البناء بعد بدء التنفيذ المسلَّم — يُحتسب العربون والدفعات ضمن قيمة العمل المنجز ولا يُفترض استرداد كامل. أي إلغاء من طرف راسخ دون سبب عائد للعميل يُعالج بردّ مناسب لما لم يُسلَّم. وتُطبَّق أيضاً بنود «شروط شراء المنتجات» أدناه عند شراء منتجات أو أجهزة." data-en="Public online checkout on the site is temporarily paused. Payment method and deposits are agreed in writing in the quote (transfer, admin-recorded deposit, or a licensed gateway when re-enabled for signed-in clients). Deposits or milestone payments may be required before work begins. Refunds by phase unless otherwise agreed in writing: (1) discovery before any design or build — deposit refund (full or most) after deducting discovery cost if any; (2) design after design deliverables are approved — completed design work is charged and the balance settled in good faith; (3) build after delivered work has started — deposits and payments apply to completed work and a full refund is not assumed. If Raseekh cancels without client cause, an appropriate refund for undelivered work applies. The Product purchase terms below also apply when buying products or hardware.">السداد الإلكتروني العام من الموقع متوقف مؤقتاً. طريقة الدفع والعربون تُتفقان كتابةً في عرض السعر (تحويل، تسجيل يدوي من الإدارة، أو بوابة دفع مرخّصة عند إعادة التفعيل للعملاء المسجّلين). قد يُطلب عربون أو دفعات مرحلية قبل بدء التنفيذ. سياسة الاسترداد حسب المرحلة ما لم يُتفق كتابةً على غير ذلك: (1) مرحلة الفهم/الاكتشاف قبل أي تصميم أو بناء — يُراجع ردّ العربون أو معظمه بعد خصم تكلفة الدراسة إن وُجدت؛ (2) مرحلة التصميم بعد اعتماد مخرجات تصميم — يُحتسب ما أُنجز من التصميم ويُسوّى المتبقي بحسن نية؛ (3) مرحلة البناء بعد بدء التنفيذ المسلَّم — يُحتسب العربون والدفعات ضمن قيمة العمل المنجز ولا يُفترض استرداد كامل. أي إلغاء من طرف راسخ دون سبب عائد للعميل يُعالج بردّ مناسب لما لم يُسلَّم. وتُطبَّق أيضاً بنود «شروط شراء المنتجات» أدناه عند شراء منتجات أو أجهزة.</p>
          </article>

          <article class="terms-item" id="terms-purchase">
            <h3 data-ar="ب) شروط وأحكام شراء المنتجات" data-en="B) Product purchase terms">ب) شروط وأحكام شراء المنتجات</h3>
            <p data-ar="تنطبق البنود التالية عند طلب أو شراء منتجات أو أجهزة عبر راسخ (بما فيها الطلب عبر الحساب أو العرض المكتوب). السداد الإلكتروني العام قد يكون متوقفاً مؤقتاً؛ عندها تُتمّم الطلبات بالاتفاق المكتوب." data-en="The following clauses apply when ordering or buying products or hardware through Raseekh (including via account or written quote). Public online checkout may be temporarily paused; orders are then completed by written agreement.">تنطبق البنود التالية عند طلب أو شراء منتجات أو أجهزة عبر راسخ (بما فيها الطلب عبر الحساب أو العرض المكتوب). السداد الإلكتروني العام قد يكون متوقفاً مؤقتاً؛ عندها تُتمّم الطلبات بالاتفاق المكتوب.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="ب-1) قبول الطلبات" data-en="B-1) Order acceptance">ب-1) قبول الطلبات</h3>
            <p data-ar="إتمام العميل لعملية الطلب وإرسالها عبر الموقع أو الحساب يُعتبر إقراراً وموافقة تامة على الالتزام بهذه الشروط. ويحتفظ راسخ بالحق المطلق في قبول أو رفض أو إلغاء أي طلب لأسباب عدة (مثل: عدم توفر المنتج، وجود خطأ في التسعير، أو عدم اجتياز عملية التحقق الأمني)." data-en="Completing and submitting an order via the site or account is full acknowledgment and acceptance of these terms. Raseekh retains absolute right to accept, reject, or cancel any order for reasons including product unavailability, pricing error, or failed security verification.">إتمام العميل لعملية الطلب وإرسالها عبر الموقع أو الحساب يُعتبر إقراراً وموافقة تامة على الالتزام بهذه الشروط. ويحتفظ راسخ بالحق المطلق في قبول أو رفض أو إلغاء أي طلب لأسباب عدة (مثل: عدم توفر المنتج، وجود خطأ في التسعير، أو عدم اجتياز عملية التحقق الأمني).</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="ب-2) الأسعار والدفع" data-en="B-2) Prices and payment">ب-2) الأسعار والدفع</h3>
            <p data-ar="جميع الأسعار المعروضة توضح بالعملة المحلية وتخضع للتحديثات المستمرة. تتم عمليات الدفع عبر وسائل وبوابات الدفع الإلكترونية المعتمدة والآمنة المتاحة، أو عبر طريقة متفق عليها كتابةً عند إيقاف السداد الإلكتروني العام. يتعهد العميل بتقديم بيانات مالية صحيحة عند إتمام السداد، ويتحمل المسؤولية الكاملة عن أي رفض لعملية الدفع يصدر من جهة إصداره البنكية." data-en="All displayed prices are in local currency and may be updated. Payments are made through approved secure electronic methods available on the site, or by a method agreed in writing when public checkout is paused. The client must provide accurate payment details and accepts full responsibility for any bank-side payment decline.">جميع الأسعار المعروضة توضح بالعملة المحلية وتخضع للتحديثات المستمرة. تتم عمليات الدفع عبر وسائل وبوابات الدفع الإلكترونية المعتمدة والآمنة المتاحة، أو عبر طريقة متفق عليها كتابةً عند إيقاف السداد الإلكتروني العام. يتعهد العميل بتقديم بيانات مالية صحيحة عند إتمام السداد، ويتحمل المسؤولية الكاملة عن أي رفض لعملية الدفع يصدر من جهة إصداره البنكية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="ب-3) الشحن والتوصيل" data-en="B-3) Shipping and delivery">ب-3) الشحن والتوصيل</h3>
            <p data-ar="عند شراء منتجات أو أجهزة قابلة للشحن، يقوم راسخ بتسليم الطلبات لشركات الشحن المعتمدة لتوصيلها إلى العنوان المسجل من قبل العميل (وتوريد الأجهزة المادية متاح حالياً داخل الرياض فقط ما لم يُتفق كتابةً على غير ذلك). المدد الزمنية المذكورة للتوصيل تقديرية، ولا يتحمل راسخ المسؤولية عن أي تأخير ناجم عن شركات الشحن أو الظروف الخارجة عن الإرادة. يتحمل العميل المسؤولية الكاملة عن صحة ودقة عنوان الشحن ورقم التواصل، وفي حال رجوع الشحنة بسبب خطأ أو نقص في البيانات، يتحمل العميل رسوم إعادة الشحن الإضافية." data-en="For shippable products or hardware, Raseekh hands orders to approved carriers for delivery to the address registered by the client (physical hardware supply is currently Riyadh-only unless otherwise agreed in writing). Stated delivery times are estimates; Raseekh is not liable for carrier delays or circumstances beyond its control. The client is fully responsible for accurate shipping address and contact number; if a shipment returns due to wrong or incomplete details, the client bears reshipping fees.">عند شراء منتجات أو أجهزة قابلة للشحن، يقوم راسخ بتسليم الطلبات لشركات الشحن المعتمدة لتوصيلها إلى العنوان المسجل من قبل العميل (وتوريد الأجهزة المادية متاح حالياً داخل الرياض فقط ما لم يُتفق كتابةً على غير ذلك). المدد الزمنية المذكورة للتوصيل تقديرية، ولا يتحمل راسخ المسؤولية عن أي تأخير ناجم عن شركات الشحن أو الظروف الخارجة عن الإرادة. يتحمل العميل المسؤولية الكاملة عن صحة ودقة عنوان الشحن ورقم التواصل، وفي حال رجوع الشحنة بسبب خطأ أو نقص في البيانات، يتحمل العميل رسوم إعادة الشحن الإضافية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="ب-4) الاسترجاع والاستبدال" data-en="B-4) Returns and exchanges">ب-4) الاسترجاع والاستبدال</h3>
            <p data-ar="يحق للعميل طلب استرجاع أو استبدال المنتجات المادية وفقاً للمدة المحددة في سياسة راسخ أو العرض المكتوب، شريطة أن يكون المنتج بحالته الأصلية، وغير مستخدم، وبغلافه الأصلي مع إرفاق إثبات الشراء. تُستثنى بعض المنتجات من الاسترجاع أو الاستبدال لأسباب صحية أو لطبيعتها الخاصة (مثل المنتجات الرقمية، أو الخدمات البرمجية، أو المنتجات المفصلة أو المجهزة خصيصاً بناءً على طلب العميل)." data-en="Clients may request return or exchange of physical products within the period set in Raseekh policy or the written quote, provided the item is unused, in original condition and packaging, with proof of purchase. Some items are excluded for health or nature reasons (such as digital products, software services, or custom-made items).">يحق للعميل طلب استرجاع أو استبدال المنتجات المادية وفقاً للمدة المحددة في سياسة راسخ أو العرض المكتوب، شريطة أن يكون المنتج بحالته الأصلية، وغير مستخدم، وبغلافه الأصلي مع إرفاق إثبات الشراء. تُستثنى بعض المنتجات من الاسترجاع أو الاستبدال لأسباب صحية أو لطبيعتها الخاصة (مثل المنتجات الرقمية، أو الخدمات البرمجية، أو المنتجات المفصلة أو المجهزة خصيصاً بناءً على طلب العميل).</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="ب-5) حدود المسؤولية في الشراء" data-en="B-5) Purchase liability limits">ب-5) حدود المسؤولية في الشراء</h3>
            <p data-ar="لا يتحمل راسخ المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن سوء استخدام المنتجات بعد استلامها من قبل العميل، وتقتصر مسؤولية راسخ القصوى المتعلقة بالمنتج محل النزاع على قيمة ذلك المنتج فقط، ما لم ينص الاتفاق الخاص على ضمان أوسع." data-en="Raseekh is not liable for direct or indirect damage from misuse of products after the client receives them. Raseekh’s maximum liability for the disputed product is limited to that product’s value, unless a specific agreement provides a broader warranty.">لا يتحمل راسخ المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن سوء استخدام المنتجات بعد استلامها من قبل العميل، وتقتصر مسؤولية راسخ القصوى المتعلقة بالمنتج محل النزاع على قيمة ذلك المنتج فقط، ما لم ينص الاتفاق الخاص على ضمان أوسع.</p>
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
            <p data-ar="نجمع بيانات التواصل والطلب اللازمة للرد وتنفيذ الخدمة. لا نبيع بياناتكم لأطراف ثالثة. قد تُستخدم أدوات تشغيل ضرورية فقط لغرض تقديم الخدمة أو ما يقتضيه النظام. راجعوا صفحة سياسة الخصوصية للتفاصيل — بما فيها الحقوق، الاحتفاظ، والنقل عبر الحدود وفق PDPL والأنظمة الدولية بالقدر المنطبق." data-en="We collect contact and request data needed to deliver the service. We do not sell your data. Essential operators may be used only to provide the service or as required by law. See the Privacy Policy for details — including rights, retention, and cross-border transfers under PDPL and international rules to the extent applicable.">نجمع بيانات التواصل والطلب اللازمة للرد وتنفيذ الخدمة. لا نبيع بياناتكم لأطراف ثالثة. قد تُستخدم أدوات تشغيل ضرورية فقط لغرض تقديم الخدمة أو ما يقتضيه النظام. راجعوا صفحة سياسة الخصوصية للتفاصيل — بما فيها الحقوق، الاحتفاظ، والنقل عبر الحدود وفق PDPL والأنظمة الدولية بالقدر المنطبق.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="12) حدود المسؤولية" data-en="12) Limitation of liability">12) حدود المسؤولية</h3>
            <p data-ar="تبذل راسخ جهداً معقولاً لتقديم خدمة مهنية. لا تتحمل راسخ مسؤولية الأضرار غير المباشرة أو خسائر الأرباح الناتجة عن تأخير خارج سيطرتها أو أعطال طرف ثالث (مثل بوابات الدفع أو الاستضافة الخارجية)، ما لم ينص الاتفاق الخاص على ضمان أوسع. وبالنسبة للمنتجات المادية تُطبَّق أيضاً حدود المسؤولية الواردة في بند الشراء أعلاه." data-en="Raseekh will use reasonable care. Raseekh is not liable for indirect damages or lost profits from delays beyond its control or third-party failures (such as payment gateways or external hosting), unless a specific agreement provides a broader warranty. For physical products, the purchase liability limits above also apply.">تبذل راسخ جهداً معقولاً لتقديم خدمة مهنية. لا تتحمل راسخ مسؤولية الأضرار غير المباشرة أو خسائر الأرباح الناتجة عن تأخير خارج سيطرتها أو أعطال طرف ثالث (مثل بوابات الدفع أو الاستضافة الخارجية)، ما لم ينص الاتفاق الخاص على ضمان أوسع. وبالنسبة للمنتجات المادية تُطبَّق أيضاً حدود المسؤولية الواردة في بند الشراء أعلاه.</p>
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
            <p data-ar="للاستفسار عن الشروط أو الخدمات استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل (البريد ورقم الجوال مطلوبان في الطلب). نرد على بريدكم أو جوالكم بعد مراجعة الطلب." data-en="For questions about these terms or services, use the quote form on the website or client account (email and phone are required on requests). We reply on your email or phone after reviewing the request.">للاستفسار عن الشروط أو الخدمات استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل (البريد ورقم الجوال مطلوبان في الطلب). نرد على بريدكم أو جوالكم بعد مراجعة الطلب.</p>
          </article>
        </div>
      </div>
    `;
  }

  function authTermsHtml() {
    return `
      <div class="terms-doc">
        <div class="terms-doc-head">
          <div class="eyebrow" data-ar="الحساب" data-en="Account">الحساب</div>
          <h2 data-ar="شروط تسجيل الدخول وإنشاء الحساب" data-en="Sign-in & account registration terms">شروط تسجيل الدخول وإنشاء الحساب</h2>
          <p data-ar="تنطبق هذه البنود عند تسجيل الدخول أو إنشاء حساب على موقع راسخ." data-en="These clauses apply when signing in or creating an account on the Raseekh website.">تنطبق هذه البنود عند تسجيل الدخول أو إنشاء حساب على موقع راسخ.</p>
          <div class="terms-updated" data-ar="آخر تحديث: يوليو 2026" data-en="Last updated: July 2026">آخر تحديث: يوليو 2026</div>
        </div>
        <div class="terms-list">
          <article class="terms-item">
            <h3 data-ar="1) شروط التسجيل" data-en="1) Registration accuracy">1) شروط التسجيل</h3>
            <p data-ar="يتعهد المستخدم بأن جميع البيانات المدخلة عند التسجيل (مثل الاسم، البريد الإلكتروني، ورقم الجوال) صحيحة، دقيقة، وحديثة، ويتحمل المسؤولية الكاملة عن أي تأخير أو ضرر ناتج عن تقديم بيانات وهمية أو خاطئة." data-en="The user warrants that all registration details (such as name, email, and mobile number) are true, accurate, and up to date, and accepts full responsibility for any delay or harm caused by false or incorrect information.">يتعهد المستخدم بأن جميع البيانات المدخلة عند التسجيل (مثل الاسم، البريد الإلكتروني، ورقم الجوال) صحيحة، دقيقة، وحديثة، ويتحمل المسؤولية الكاملة عن أي تأخير أو ضرر ناتج عن تقديم بيانات وهمية أو خاطئة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="2) أمان وحماية الحساب" data-en="2) Account security">2) أمان وحماية الحساب</h3>
            <p data-ar="المستخدم هو المسؤول الوحيد عن الحفاظ على سرية بيانات حسابه (كلمة المرور، اسم المستخدم، أو رموز التحقق)، ويتحمل المسؤولية الكاملة عن كافة الأنشطة والعمليات التي تتم من خلال حسابه. ويلزم على المستخدم إبلاغ إدارة الموقع فوراً في حال اكتشاف أي استخدام غير مصرح به أو اختراق لحسابه." data-en="The user alone is responsible for keeping account credentials confidential (password, username, or verification codes) and accepts full responsibility for all activity through the account. The user must notify site administration immediately if any unauthorized use or account breach is discovered.">المستخدم هو المسؤول الوحيد عن الحفاظ على سرية بيانات حسابه (كلمة المرور، اسم المستخدم، أو رموز التحقق)، ويتحمل المسؤولية الكاملة عن كافة الأنشطة والعمليات التي تتم من خلال حسابه. ويلزم على المستخدم إبلاغ إدارة الموقع فوراً في حال اكتشاف أي استخدام غير مصرح به أو اختراق لحسابه.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="3) القيود والاستخدام المقبول" data-en="3) Acceptable use">3) القيود والاستخدام المقبول</h3>
            <p data-ar="يُمنع منعاً باتاً استخدام الحساب في أي أنشطة غير قانونية، أو محاولة اختراق الموقع، أو التلاعب بالأنظمة، أو محاولة إلحاق الضرر براسخ أو مستخدميه الآخرين. ويحق لإدارة الموقع إيقاف أو حظر أي حساب يخالف هذه الشروط دون أدنى مسؤولية." data-en="Accounts may not be used for unlawful activity, attempts to breach the site, system manipulation, or harm to Raseekh or other users. Site administration may suspend or ban any account that violates these terms without liability.">يُمنع منعاً باتاً استخدام الحساب في أي أنشطة غير قانونية، أو محاولة اختراق الموقع، أو التلاعب بالأنظمة، أو محاولة إلحاق الضرر براسخ أو مستخدميه الآخرين. ويحق لإدارة الموقع إيقاف أو حظر أي حساب يخالف هذه الشروط دون أدنى مسؤولية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="4) الحسابات الوهمية والمكررة" data-en="4) Fake or duplicate accounts">4) الحسابات الوهمية والمكررة</h3>
            <p data-ar="لا يُسمح بإنشاء حسابات وهمية أو متعددة للشخص نفسه بغرض التحايل أو إساءة استخدام العروض والخدمات، وللموقع الحق المطلق في حذف أو تجميد أي حسابات مشبوهة أو مكررة." data-en="Creating fake or multiple accounts for the same person to circumvent or abuse offers and services is not allowed. The site has absolute right to delete or freeze any suspicious or duplicate accounts.">لا يُسمح بإنشاء حسابات وهمية أو متعددة للشخص نفسه بغرض التحايل أو إساءة استخدام العروض والخدمات، وللموقع الحق المطلق في حذف أو تجميد أي حسابات مشبوهة أو مكررة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="5) إيقاف أو إغلاق الحساب" data-en="5) Suspension or closure">5) إيقاف أو إغلاق الحساب</h3>
            <p data-ar="يحق لإدارة الموقع إيقاف، تعليق، أو إغلاق أي حساب مستخدم في أي وقت ودون سابق إنذار، في حال مخالفة الشروط والأحكام، أو بناءً على طلب رسمي من الجهات المختصة، أو في حال عدم نشاط الحساب لفترات طويلة." data-en="Site administration may stop, suspend, or close any user account at any time without prior notice for terms violations, upon an official competent-authority request, or for prolonged inactivity.">يحق لإدارة الموقع إيقاف، تعليق، أو إغلاق أي حساب مستخدم في أي وقت ودون سابق إنذار، في حال مخالفة الشروط والأحكام، أو بناءً على طلب رسمي من الجهات المختصة، أو في حال عدم نشاط الحساب لفترات طويلة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="6) الخصوصية عند التسجيل والدخول" data-en="6) Privacy on sign-in and registration">6) الخصوصية عند التسجيل والدخول</h3>
            <p data-ar="باستخدامك لميزتي تسجيل الدخول أو إنشاء حساب، فإنك توافق على جمع واستخدام بياناتك الشخصية ومعالجتها وفقاً لسياسة الخصوصية الخاصة بالموقع وبما يضمن تقديم الخدمات وتحسينها فقط." data-en="By using sign-in or account creation, you agree to collection, use, and processing of your personal data under the site Privacy Policy, solely to provide and improve services.">باستخدامك لميزتي تسجيل الدخول أو إنشاء حساب، فإنك توافق على جمع واستخدام بياناتك الشخصية ومعالجتها وفقاً لسياسة الخصوصية الخاصة بالموقع وبما يضمن تقديم الخدمات وتحسينها فقط.</p>
          </article>
          <p style="margin-top:14px;font-size:.9rem;color:var(--muted)">
            <a href="/terms/" data-ar="عرض الشروط الكاملة" data-en="View full terms">عرض الشروط الكاملة</a>
            <span aria-hidden="true"> · </span>
            <a href="/privacy/" data-ar="سياسة الخصوصية" data-en="Privacy policy">سياسة الخصوصية</a>
          </p>
        </div>
      </div>
    `;
  }

  function purchaseTermsHtml() {
    return `
      <div class="terms-doc">
        <div class="terms-doc-head">
          <div class="eyebrow" data-ar="الشراء" data-en="Purchase">الشراء</div>
          <h2 data-ar="شروط شراء المنتجات" data-en="Product purchase terms">شروط شراء المنتجات</h2>
          <p data-ar="تنطبق هذه البنود عند طلب أو شراء منتجات أو أجهزة أو طلب عرض سعر عبر راسخ (بما فيها الطلب عبر الحساب أو العرض المكتوب)." data-en="These clauses apply when ordering or buying products or hardware, or requesting a quote through Raseekh (including via account or written quote).">تنطبق هذه البنود عند طلب أو شراء منتجات أو أجهزة أو طلب عرض سعر عبر راسخ (بما فيها الطلب عبر الحساب أو العرض المكتوب).</p>
          <div class="terms-updated" data-ar="آخر تحديث: يوليو 2026" data-en="Last updated: July 2026">آخر تحديث: يوليو 2026</div>
        </div>
        <div class="terms-list">
          <article class="terms-item">
            <h3 data-ar="1) قبول الطلبات" data-en="1) Order acceptance">1) قبول الطلبات</h3>
            <p data-ar="إتمام العميل لعملية الطلب وإرسالها عبر الموقع أو الحساب يُعتبر إقراراً وموافقة تامة على الالتزام بهذه الشروط. ويحتفظ راسخ بالحق المطلق في قبول أو رفض أو إلغاء أي طلب لأسباب عدة (مثل: عدم توفر المنتج، وجود خطأ في التسعير، أو عدم اجتياز عملية التحقق الأمني)." data-en="Completing and submitting an order via the site or account is full acknowledgment and acceptance of these terms. Raseekh retains absolute right to accept, reject, or cancel any order for reasons including product unavailability, pricing error, or failed security verification.">إتمام العميل لعملية الطلب وإرسالها عبر الموقع أو الحساب يُعتبر إقراراً وموافقة تامة على الالتزام بهذه الشروط. ويحتفظ راسخ بالحق المطلق في قبول أو رفض أو إلغاء أي طلب لأسباب عدة (مثل: عدم توفر المنتج، وجود خطأ في التسعير، أو عدم اجتياز عملية التحقق الأمني).</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="2) الأسعار والدفع" data-en="2) Prices and payment">2) الأسعار والدفع</h3>
            <p data-ar="جميع الأسعار المعروضة توضح بالعملة المحلية وتخضع للتحديثات المستمرة. تتم عمليات الدفع عبر وسائل وبوابات الدفع الإلكترونية المعتمدة والآمنة المتاحة، أو عبر طريقة متفق عليها كتابةً عند إيقاف السداد الإلكتروني العام. يتعهد العميل بتقديم بيانات مالية صحيحة عند إتمام السداد، ويتحمل المسؤولية الكاملة عن أي رفض لعملية الدفع يصدر من جهة إصداره البنكية." data-en="All displayed prices are in local currency and may be updated. Payments are made through approved secure electronic methods available on the site, or by a method agreed in writing when public checkout is paused. The client must provide accurate payment details and accepts full responsibility for any bank-side payment decline.">جميع الأسعار المعروضة توضح بالعملة المحلية وتخضع للتحديثات المستمرة. تتم عمليات الدفع عبر وسائل وبوابات الدفع الإلكترونية المعتمدة والآمنة المتاحة، أو عبر طريقة متفق عليها كتابةً عند إيقاف السداد الإلكتروني العام. يتعهد العميل بتقديم بيانات مالية صحيحة عند إتمام السداد، ويتحمل المسؤولية الكاملة عن أي رفض لعملية الدفع يصدر من جهة إصداره البنكية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="3) الشحن والتوصيل" data-en="3) Shipping and delivery">3) الشحن والتوصيل</h3>
            <p data-ar="عند شراء منتجات أو أجهزة قابلة للشحن، يقوم راسخ بتسليم الطلبات لشركات الشحن المعتمدة لتوصيلها إلى العنوان المسجل من قبل العميل (وتوريد الأجهزة المادية متاح حالياً داخل الرياض فقط ما لم يُتفق كتابةً على غير ذلك). المدد الزمنية المذكورة للتوصيل تقديرية، ولا يتحمل راسخ المسؤولية عن أي تأخير ناجم عن شركات الشحن أو الظروف الخارجة عن الإرادة. يتحمل العميل المسؤولية الكاملة عن صحة ودقة عنوان الشحن ورقم التواصل، وفي حال رجوع الشحنة بسبب خطأ أو نقص في البيانات، يتحمل العميل رسوم إعادة الشحن الإضافية." data-en="For shippable products or hardware, Raseekh hands orders to approved carriers for delivery to the address registered by the client (physical hardware supply is currently Riyadh-only unless otherwise agreed in writing). Stated delivery times are estimates; Raseekh is not liable for carrier delays or circumstances beyond its control. The client is fully responsible for accurate shipping address and contact number; if a shipment returns due to wrong or incomplete details, the client bears reshipping fees.">عند شراء منتجات أو أجهزة قابلة للشحن، يقوم راسخ بتسليم الطلبات لشركات الشحن المعتمدة لتوصيلها إلى العنوان المسجل من قبل العميل (وتوريد الأجهزة المادية متاح حالياً داخل الرياض فقط ما لم يُتفق كتابةً على غير ذلك). المدد الزمنية المذكورة للتوصيل تقديرية، ولا يتحمل راسخ المسؤولية عن أي تأخير ناجم عن شركات الشحن أو الظروف الخارجة عن الإرادة. يتحمل العميل المسؤولية الكاملة عن صحة ودقة عنوان الشحن ورقم التواصل، وفي حال رجوع الشحنة بسبب خطأ أو نقص في البيانات، يتحمل العميل رسوم إعادة الشحن الإضافية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="4) الاسترجاع والاستبدال" data-en="4) Returns and exchanges">4) الاسترجاع والاستبدال</h3>
            <p data-ar="يحق للعميل طلب استرجاع أو استبدال المنتجات المادية وفقاً للمدة المحددة في سياسة راسخ أو العرض المكتوب، شريطة أن يكون المنتج بحالته الأصلية، وغير مستخدم، وبغلافه الأصلي مع إرفاق إثبات الشراء. تُستثنى بعض المنتجات من الاسترجاع أو الاستبدال لأسباب صحية أو لطبيعتها الخاصة (مثل المنتجات الرقمية، أو الخدمات البرمجية، أو المنتجات المفصلة أو المجهزة خصيصاً بناءً على طلب العميل)." data-en="Clients may request return or exchange of physical products within the period set in Raseekh policy or the written quote, provided the item is unused, in original condition and packaging, with proof of purchase. Some items are excluded for health or nature reasons (such as digital products, software services, or custom-made items).">يحق للعميل طلب استرجاع أو استبدال المنتجات المادية وفقاً للمدة المحددة في سياسة راسخ أو العرض المكتوب، شريطة أن يكون المنتج بحالته الأصلية، وغير مستخدم، وبغلافه الأصلي مع إرفاق إثبات الشراء. تُستثنى بعض المنتجات من الاسترجاع أو الاستبدال لأسباب صحية أو لطبيعتها الخاصة (مثل المنتجات الرقمية، أو الخدمات البرمجية، أو المنتجات المفصلة أو المجهزة خصيصاً بناءً على طلب العميل).</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="5) حدود المسؤولية في الشراء" data-en="5) Purchase liability limits">5) حدود المسؤولية في الشراء</h3>
            <p data-ar="لا يتحمل راسخ المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن سوء استخدام المنتجات بعد استلامها من قبل العميل، وتقتصر مسؤولية راسخ القصوى المتعلقة بالمنتج محل النزاع على قيمة ذلك المنتج فقط، ما لم ينص الاتفاق الخاص على ضمان أوسع." data-en="Raseekh is not liable for direct or indirect damage from misuse of products after the client receives them. Raseekh’s maximum liability for the disputed product is limited to that product’s value, unless a specific agreement provides a broader warranty.">لا يتحمل راسخ المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن سوء استخدام المنتجات بعد استلامها من قبل العميل، وتقتصر مسؤولية راسخ القصوى المتعلقة بالمنتج محل النزاع على قيمة ذلك المنتج فقط، ما لم ينص الاتفاق الخاص على ضمان أوسع.</p>
          </article>
          <p style="margin-top:14px;font-size:.9rem;color:var(--muted)">
            <a href="/terms/#purchase" data-ar="عرض الشروط الكاملة" data-en="View full terms">عرض الشروط الكاملة</a>
            <span aria-hidden="true"> · </span>
            <a href="/privacy/" data-ar="سياسة الخصوصية" data-en="Privacy policy">سياسة الخصوصية</a>
          </p>
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
          <p data-ar="توضح هذه السياسة كيف تجمع راسخ البيانات الشخصية وتعالجها عند استخدام الموقع أو حساب العميل أو إرسال طلب — داخل المملكة العربية السعودية وخارجها بالقدر المنطبق." data-en="This policy explains how Raseekh collects and processes personal data when you use the website, client account, or submit a request — in Saudi Arabia and internationally to the extent applicable.">توضح هذه السياسة كيف تجمع راسخ البيانات الشخصية وتعالجها عند استخدام الموقع أو حساب العميل أو إرسال طلب — داخل المملكة العربية السعودية وخارجها بالقدر المنطبق.</p>
          <div class="terms-updated" data-ar="آخر تحديث: يوليو 2026" data-en="Last updated: July 2026">آخر تحديث: يوليو 2026</div>
        </div>
        <div class="terms-list">
          <article class="terms-item">
            <h3 data-ar="1) جهة التحكم والتواصل" data-en="1) Controller and contact">1) جهة التحكم والتواصل</h3>
            <p data-ar="المتحكم في البيانات الشخصية الموضحة هنا هو راسخ (Raseekh). لطلبات الخصوصية أو ممارسة الحقوق استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل، واذكروا أن الطلب يتعلق بالخصوصية. نرد عبر البريد أو الجوال المرفقين في طلبكم بعد المراجعة." data-en="The controller for the personal data described here is Raseekh. For privacy requests or to exercise your rights, use the quote form on the website or client account and note that the request is about privacy. We reply on the email or phone you provide after review.">المتحكم في البيانات الشخصية الموضحة هنا هو راسخ (Raseekh). لطلبات الخصوصية أو ممارسة الحقوق استخدموا نموذج طلب عرض السعر في الموقع أو حساب العميل، واذكروا أن الطلب يتعلق بالخصوصية. نرد عبر البريد أو الجوال المرفقين في طلبكم بعد المراجعة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="2) ما الذي نجمعه؟" data-en="2) What we collect">2) ما الذي نجمعه؟</h3>
            <p data-ar="بيانات التواصل التي تقدّمونها (الاسم، البريد، الجوال، الشركة أو الجهة)، نص الطلب وملاحظاته، وبيانات الحساب اللازمة لتسجيل الدخول والمتابعة والسداد عند التفعيل. قد تُسجَّل إحصاءات زيارة مجمّعة لتحسين الموقع (عداد جلسات) دون بيع بيانات شخصية ودون تتبّع إعلاني لطرف ثالث." data-en="Contact details you provide (name, email, phone, company or organization), request text and notes, and account data needed for sign-in, tracking, and payment when enabled. Aggregated visit stats may be recorded to improve the site (session counters) without selling personal data and without third-party ad tracking.">بيانات التواصل التي تقدّمونها (الاسم، البريد، الجوال، الشركة أو الجهة)، نص الطلب وملاحظاته، وبيانات الحساب اللازمة لتسجيل الدخول والمتابعة والسداد عند التفعيل. قد تُسجَّل إحصاءات زيارة مجمّعة لتحسين الموقع (عداد جلسات) دون بيع بيانات شخصية ودون تتبّع إعلاني لطرف ثالث.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="3) أساس المعالجة والغرض" data-en="3) Legal basis and purpose">3) أساس المعالجة والغرض</h3>
            <p data-ar="نعالج البيانات لتنفيذ طلبكم أو العقد المرتقب (عرض السعر والتنفيذ والسداد)، وللمصلحة المشروعة في تشغيل الموقع وأمنه ومنع إساءة الاستخدام، وللامتثال للالتزامات النظامية عند الاقتضاء، وبموافقتكم عندما يطلب النظام ذلك (مثل قبول الشروط)." data-en="We process data to perform your request or prospective contract (quote, delivery, payment), for legitimate interests in running and securing the site and preventing abuse, to meet legal duties when applicable, and with your consent when the system requires it (such as accepting the terms).">نعالج البيانات لتنفيذ طلبكم أو العقد المرتقب (عرض السعر والتنفيذ والسداد)، وللمصلحة المشروعة في تشغيل الموقع وأمنه ومنع إساءة الاستخدام، وللامتثال للالتزامات النظامية عند الاقتضاء، وبموافقتكم عندما يطلب النظام ذلك (مثل قبول الشروط).</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="4) المشاركة والمعالجون" data-en="4) Sharing and processors">4) المشاركة والمعالجون</h3>
            <p data-ar="لا نبيع بياناتكم ولا نشاركها لأغراض تسويق طرف ثالث. قد يُستعان بمعالجين ضروريين فقط لتقديم الخدمة، مثل: استضافة قواعد البيانات والمصادقة (Supabase)، بوابة دفع مرخّصة عند تفعيل السداد الإلكتروني، وخدمات بريد تشغيلية عند تفعيل التنبيهات، وشبكات توصيل محتوى/خطوط عند الحاجة. يلتزم هؤلاء بالغرض التشغيلي وفق إعداداتهم الأمنية والتعاقدية." data-en="We do not sell your data or share it for third-party marketing. Essential processors may be used only to deliver the service, such as: database and auth hosting (Supabase), a licensed payment gateway when online checkout is enabled, operational email when alerts are enabled, and CDN/font providers when needed. They process data for the operational purpose under their security and contractual settings.">لا نبيع بياناتكم ولا نشاركها لأغراض تسويق طرف ثالث. قد يُستعان بمعالجين ضروريين فقط لتقديم الخدمة، مثل: استضافة قواعد البيانات والمصادقة (Supabase)، بوابة دفع مرخّصة عند تفعيل السداد الإلكتروني، وخدمات بريد تشغيلية عند تفعيل التنبيهات، وشبكات توصيل محتوى/خطوط عند الحاجة. يلتزم هؤلاء بالغرض التشغيلي وفق إعداداتهم الأمنية والتعاقدية.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="5) النقل عبر الحدود" data-en="5) Cross-border transfers">5) النقل عبر الحدود</h3>
            <p data-ar="قد تُعالَج أو تُخزَّن بعض البيانات عبر مزوّدي خدمة خارج المملكة عند اختيار استضافة سحابية عامة أو أدوات تشغيل عالمية. عند بناء نظام لكم، تُحدَّد بيئة الاستضافة في العرض (خوادمكم، سحابة متفق عليها، أو ترخيص مستضاف) مع مراعاة نظام حماية البيانات الشخصية (PDPL) والأنظمة المحلية الأخرى بالقدر المنطبق. للزوار من خارج السعودية نطبّق نفس الحد الأدنى من الشفافية والحقوق العملية الموضحة هنا، مع مراعاة قانون بلدكم إن انطبق على علاقتكم بنا." data-en="Some data may be processed or stored via providers outside Saudi Arabia when a public cloud or global ops tools are used. When we build a system for you, hosting is set in the quote (your servers, an agreed cloud, or a hosted license), considering Saudi PDPL and other local rules to the extent applicable. For visitors outside Saudi Arabia we apply the same baseline transparency and practical rights described here, and consider your local law where it applies to your relationship with us.">قد تُعالَج أو تُخزَّن بعض البيانات عبر مزوّدي خدمة خارج المملكة عند اختيار استضافة سحابية عامة أو أدوات تشغيل عالمية. عند بناء نظام لكم، تُحدَّد بيئة الاستضافة في العرض (خوادمكم، سحابة متفق عليها، أو ترخيص مستضاف) مع مراعاة نظام حماية البيانات الشخصية (PDPL) والأنظمة المحلية الأخرى بالقدر المنطبق. للزوار من خارج السعودية نطبّق نفس الحد الأدنى من الشفافية والحقوق العملية الموضحة هنا، مع مراعاة قانون بلدكم إن انطبق على علاقتكم بنا.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="6) بيانات أعمالكم داخل الأنظمة" data-en="6) Your business data inside systems">6) بيانات أعمالكم داخل الأنظمة</h3>
            <p data-ar="بيانات التشغيل داخل الأنظمة التي نبنيها لكم تبقى ملككم. نتعامل معها بسرية، ويمكن توقيع NDA قبل مشاركة تفاصيل حساسة." data-en="Operational data inside systems we build for you remains yours. We handle it confidentially, and an NDA can be signed before sensitive details are shared.">بيانات التشغيل داخل الأنظمة التي نبنيها لكم تبقى ملككم. نتعامل معها بسرية، ويمكن توقيع NDA قبل مشاركة تفاصيل حساسة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="7) الأمان والاحتفاظ" data-en="7) Security and retention">7) الأمان والاحتفاظ</h3>
            <p data-ar="نستخدم اتصال HTTPS وضوابط وصول معقولة (صلاحيات أدوار، مصادقة حساب). نحتفظ ببيانات الطلب والحساب عادةً طوال علاقة الخدمة ثم لمدة تصل إلى 24 شهراً بعد آخر نشاط ذي صلة للمتابعة المحاسبية/التشغيلية ما لم يُتفق أو يُلزم النظام بمدة مختلفة، ثم نراجع الحذف أو التقييد عند طلب مشروع." data-en="We use HTTPS and reasonable access controls (role limits, account auth). We typically retain request and account data for the service relationship plus up to 24 months after the last related activity for accounting/ops follow-up unless a different period is agreed or required by law, then review deletion or restriction on a lawful request.">نستخدم اتصال HTTPS وضوابط وصول معقولة (صلاحيات أدوار، مصادقة حساب). نحتفظ ببيانات الطلب والحساب عادةً طوال علاقة الخدمة ثم لمدة تصل إلى 24 شهراً بعد آخر نشاط ذي صلة للمتابعة المحاسبية/التشغيلية ما لم يُتفق أو يُلزم النظام بمدة مختلفة، ثم نراجع الحذف أو التقييد عند طلب مشروع.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="8) ملفات المشروع" data-en="8) Project files">8) ملفات المشروع</h3>
            <p data-ar="عند مشاركة ملفات (مثل PDF أو جداول) عبر قناة المشروع بعد قبول الطلب: تُنقل عبر قنوات مشفّرة قدر الإمكان، وتُستخدم للتنفيذ فقط. يمكن الاتفاق كتابةً على حذفها بعد التسليم أو بعد مدة محددة." data-en="When project files (such as PDFs or spreadsheets) are shared via the project channel after acceptance: they are transferred over encrypted channels where practical and used for delivery only. Written agreement can set deletion after handover or after a set period.">عند مشاركة ملفات (مثل PDF أو جداول) عبر قناة المشروع بعد قبول الطلب: تُنقل عبر قنوات مشفّرة قدر الإمكان، وتُستخدم للتنفيذ فقط. يمكن الاتفاق كتابةً على حذفها بعد التسليم أو بعد مدة محددة.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="9) حقوقكم (السعودية والدولية)" data-en="9) Your rights (Saudi and international)">9) حقوقكم (السعودية والدولية)</h3>
            <p data-ar="وفق PDPL بالقدر المنطبق، ولزوار من ولايات أخرى بالقدر العملي: يمكنكم طلب الاطلاع على بياناتكم الشخصية لدينا، تصحيحها، حذفها أو تقييد معالجتها عند توافر الشروط النظامية، والاعتراض على معالجة غير ضرورية، وطلب نسخة محمولة من البيانات التي قدّمتموها عندما يكون ذلك ممكناً تقنياً. لا نفرض رسوماً غير معقولة على طلب حقوق مشروع. قد نطلب التحقق من الهوية قبل التنفيذ." data-en="Under PDPL to the extent applicable, and for visitors in other jurisdictions to the practical extent: you may request access to your personal data we hold, correction, deletion or restriction where legal conditions are met, objection to unnecessary processing, and a portable copy of data you provided when technically feasible. We do not charge unreasonable fees for a lawful rights request. We may verify identity before acting.">وفق PDPL بالقدر المنطبق، ولزوار من ولايات أخرى بالقدر العملي: يمكنكم طلب الاطلاع على بياناتكم الشخصية لدينا، تصحيحها، حذفها أو تقييد معالجتها عند توافر الشروط النظامية، والاعتراض على معالجة غير ضرورية، وطلب نسخة محمولة من البيانات التي قدّمتموها عندما يكون ذلك ممكناً تقنياً. لا نفرض رسوماً غير معقولة على طلب حقوق مشروع. قد نطلب التحقق من الهوية قبل التنفيذ.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="10) التخزين المحلي والكوكيز" data-en="10) Local storage and cookies">10) التخزين المحلي والكوكيز</h3>
            <p data-ar="يستخدم الموقع تخزيناً محلياً في المتصفح لجلسة الحساب وتفضيل اللغة وقبول الشروط وإعدادات ضرورية للتشغيل. لا نستخدم حالياً كوكيز إعلانية لطرف ثالث. إحصاء الزيارات يعتمد على عدّاد جلسة دون ملف تعريف إعلاني." data-en="The site uses browser local storage for account session, language preference, terms acceptance, and essential ops settings. We do not currently use third-party advertising cookies. Visit counting uses a session counter without an advertising profile.">يستخدم الموقع تخزيناً محلياً في المتصفح لجلسة الحساب وتفضيل اللغة وقبول الشروط وإعدادات ضرورية للتشغيل. لا نستخدم حالياً كوكيز إعلانية لطرف ثالث. إحصاء الزيارات يعتمد على عدّاد جلسة دون ملف تعريف إعلاني.</p>
          </article>
          <article class="terms-item">
            <h3 data-ar="11) التحديثات والمراجع" data-en="11) Updates and related pages">11) التحديثات والمراجع</h3>
            <p data-ar="قد نحدّث هذه السياسة عند تغيّر المعالجة أو الأنظمة؛ يُنشر التحديث مع تاريخ آخر تعديل. راجعوا أيضاً الشروط والأحكام وصفحة الأمان. تخضع العلاقة التعاقدية لأنظمة المملكة العربية السعودية ما لم يُتفق كتابةً على غير ذلك." data-en="We may update this policy when processing or laws change; updates are posted with a last-updated date. See also the Terms and the Security page. The contractual relationship is governed by the laws of Saudi Arabia unless otherwise agreed in writing.">قد نحدّث هذه السياسة عند تغيّر المعالجة أو الأنظمة؛ يُنشر التحديث مع تاريخ آخر تعديل. راجعوا أيضاً الشروط والأحكام وصفحة الأمان. تخضع العلاقة التعاقدية لأنظمة المملكة العربية السعودية ما لم يُتفق كتابةً على غير ذلك.</p>
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

  function renderAuthInto(el) {
    if (!el) return;
    el.innerHTML = authTermsHtml();
  }

  function renderPurchaseInto(el) {
    if (!el) return;
    el.innerHTML = purchaseTermsHtml();
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
    authTermsHtml,
    purchaseTermsHtml,
    privacyHtml,
    renderInto,
    renderAuthInto,
    renderPurchaseInto,
    renderPrivacyInto,
    hasAccepted,
    acceptTerms,
    acceptTermsByEmail,
    syncAcceptance,
    probeCloud,
    userKey
  };
})(typeof window !== 'undefined' ? window : globalThis);
