const input = document.querySelector("input");
const addResult = document.querySelector(".add-results");
const addResultContainer = document.querySelector(".add-results-container");
const showContext = document.querySelector(".show-context");
const contextElem = document.querySelector(".context");

const searchData = [
    {
        id: 1,
        subject: "آشنایی با HTTP؛ ساختار، متدها و کدهای وضعیت",
        context: "HTTP پروتکل اصلی انتقال ابرمتن در وب است. ساختار آن شامل درخواست (Request) و پاسخ (Response) می‌شود. متدهای رایج: GET (دریافت داده)، POST (ارسال داده)، PUT (به‌روزرسانی کامل)، DELETE (حذف). کدهای وضعیت به پنج دسته تقسیم می‌شوند: 1xx (اطلاعاتی)، 2xx (موفقیت مانند 200)، 3xx (تغییرمسیر)، 4xx (خطای کلاینت مانند 404)، 5xx (خطای سرور مانند 500). HTTP بدون‌حافظه است (Stateless)؛ برای حفظ حالت از کوکی و نشست استفاده می‌شود. HTTP/2 و HTTP/3 نسخه‌های جدیدتر با کارایی بالاتر هستند.",
    },
    {
        id: 2,
        subject: "دارک وب چیست؟ تفاوت آن با اینترنت + خطرات و واقعیت‌ها",
        context: "اینترنت به سه لایه سطحی (Surface Web)، عمیق (Deep Web) و تاریک (Dark Web) تقسیم می‌شود. دارک وب بخش کوچکی از دیپ وب است که فقط با مرورگرهایی مانند Tor قابل دسترسی است. تفاوت اصلی: دیپ وب محتوای ایندکس‌نشده مثل ایمیل‌هاست؛ دارک وب عمداً ناشناس و رمزنگاری شده است. خطرات: خرید و فروش غیرقانونی، کلاهبرداری، بدافزار و نظارت دولتی. واقعیت: همه کاربران دارک وب مجرم نیستند؛ خبرنگاران و فعالان حقوق بشر نیز از آن استفاده می‌کنند.",
    },
    {
        id: 3,
        subject: "Ajax چیست؟ مفهوم، کاربردها و نمونه کد",
        context: `Ajax (Asynchronous JavaScript and XML) تکنیکی برای به‌روزرسانی بخشی از صفحه وب بدون بارگذاری مجدد کل صفحه است. با استفاده از شیء XMLHttpRequest یا Fetch API کار می‌کند. مثال کاربردی: جستجوی زنده، ارسال فرم بدون رفرش، بارگذاری محتوای پویا. نمونه کد:
                    fetch('api/data') .then(response => response.json()) .then(data => document.getElementById('result').innerHTML = data.title);
                    اگرچه نام XML دارد، امروزه اغلب از JSON استفاده می‌کند. Ajax اساس بسیاری از برنامه‌های تک‌صفحه‌ای (SPA) مانند Gmail است.`,
    },
    {
        id: 4,
        subject: "طراحی سایت با پایتون یا وردپرس؟ مقایسه کامل و راهنمای انتخاب درست",
        context: "وردپرس یک سیستم مدیریت محتوای آماده (CMS) است، درحالی که پایتون یک زبان برنامه‌نویسی عمومی با فریمورک‌هایی مانند Django است. وردپرس برای سایت‌های سریع و غیرفنی (فروشگاهی، شرکتی، خبری) مناسب است. پایتون برای پروژه‌های سفارشی، مقیاس‌پذیر و امنیتی بالا (سامانه‌های بزرگ، API، ماشین لرنینگ) بهتر است. هزینه وردپرس در ابتدا کمتر است، اما پایتون هزینه نگهداری و توسعه طولانی‌مدت متغیری دارد. انتخاب به بودجه، زمان، نیاز به سفارشی‌سازی و مهارت تیم بستگی دارد.",
    },
    {
        id: 5,
        subject: "مقایسه طراحی سایت با پایتون یا وردپرس",
        context: "تفاوت اصلی در رویکرد: وردپرس مبتنی بر قالب و افزونه، پایتون مبتنی بر کدنویسی خالص است. وردپرس سرعت راه‌اندازی بسیار بالایی دارد (ساعت تا یک روز)، پایتون نیاز به چند روز یا هفته برای نمونه اولیه دارد. امنیت پایتون (با Django) در حالت پیش‌فرض بالاتر است، وردپرس به دلیل افزونه‌های شخص ثالث آسیب‌پذیرتر است. مقیاس‌پذیری پایتون بهتر است، اما وردپرس با کش و CDN تا حد قابل قبولی بالا می‌رود. پایتون به برنامه‌نویس حرفه‌ای نیاز دارد، وردپرس را مدیر سایت غیربرنامه‌نویس هم می‌تواند مدیریت کند.",
    },
    {
        id: 6,
        subject: "پایتون یا وردپرس برای چه نوع سایتی بهتر است؟",
        context: "وردپرس برای وبلاگ، سایت شرکت‌های کوچک و متوسط، فروشگاه اینترنتی (با ووکامرس)، نمونه کار (پورتفولیو)، و انجمن ساده ایده‌آل است. پایتون برای سایت‌های پربازدید و پیچیده (مانند اینستاگرام)، API‌های اختصاصی، داشبوردهای تحلیلی، سیستم‌های مالی و پزشکی، سایت‌هایی که نیاز به پردازش داده سنگین یا ماشین لرنینگ دارند، مناسب‌تر است. اگر نیاز به تغییر مکرر قالب دارید و تیم فنی ندارید → وردپرس. اگر نیاز به منطق کاملاً دلخواه، امنیت نظامی و رشد بلندمدت دارید → پایتون.",
    },
    {
        id: 7,
        subject: "آیا می‌توان بعدا سایت وردپرسی را با پایتون جایگزین کرد؟",
        context: "بله، کاملاً ممکن است اما زمان‌بر و هزینه‌بر است. ابتدا باید معماری جدید را با پایتون (مثلاً Django) طراحی کنید. سپس تمام محتوا (مقالات، محصولات، کاربران) را از دیتابیس وردپرس (MySQL) به دیتابیس جدید (PostgreSQL یا هر پایگاه داده دیگر) مهاجرت دهید. وابستگی به افزونه‌های وردپرسی نیاز به بازنویسی کامل قابلیت‌ها دارد. می‌توانید به تدریج با راه‌اندازی API در پایتون و حفظ وردپرس به عنوان فرانت‌اند قدیمی، مهاجرت تدریجی (Strangler Pattern) انجام دهید. جایگزینی کامل معمولاً برای مواقعی توصیه می‌شود که سایت به شدت رشد کرده و محدودیت‌های وردپرس غیرقابل تحمل شده باشد.",
    },
];

const hideAddResultContainer = () => {
    addResultContainer.classList.add("hidden")
};
const showAddResultContainer = () => {
    addResultContainer.classList.remove("hidden")
};

const autoSearchCompelete = event => {
    let results = [];
    
    const value = event.target.value.trim();
    if (value) {
        searchData.forEach((elem)=>{
            if (elem.subject.includes(value)){
                let obj = {
                    id: elem.id,
                    subject: elem.subject,
                };
                results.push(obj);
            };
        });  
    };
    addSearchResult(results);
};

const addSearchResult = (results) => {
    addResult.innerHTML = "";

    if (results.length) {
        showAddResultContainer();
    }else{
        hideAddResultContainer();
    };

    results.forEach(result => {
        addResult.insertAdjacentHTML(
            "beforeend",
            `
            <div class="py-1.5">
                <p  data-id="${result.id}" class="subject max-md:text-sm text-orange-300 hover:bg-orange-300/5 p-1.5 select-none cursor-pointer transition-colors line-clamp-1 rounded-lg">
                    ${result.subject}
                </p>
            </div>
            `
        );
    });
};

const selectSearchItem = event => {
    const selectedSearch = searchData.find(elem => event.target.dataset.id == elem.id);
    contextElem.innerHTML = selectedSearch.context;
    input.value = "";
    addSearchResult([]);
};

input.addEventListener("keyup", autoSearchCompelete);
addResultContainer.addEventListener("click", event => {
    if (event.target.classList.contains("subject")) {
        selectSearchItem(event);
    };
});