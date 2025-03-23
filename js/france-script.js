//تثبيت الناف بار
const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky",window.scrollY > 180);
})




document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navList = document.querySelector(".navlist");

    menuIcon.addEventListener("click", function () {
        navList.classList.toggle("active"); // إضافة/إزالة الكلاس لتفعيل القائمة
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener("click", function (event) {
        if (!menuIcon.contains(event.target) && !navList.contains(event.target)) {
            navList.classList.remove("active");
        }
    });
});





//سلايدر عرض الاماكن
document.querySelectorAll(".slider").forEach(slider => { // تحديد جميع العناصر التي تحتوي على الكلاس "slider" وتكرار العملية لكل منها
    const form = slider.querySelector(".form"); // العثور على العنصر الفرعي الذي يحتوي على الكلاس "form" داخل كل "slider"
    let mouseDownAt = 0; // متغير لتخزين موضع الضغط بالماوس
    let left = 0; // متغير لتحديد الموضع الأفقي للعنصر القابل للتمرير

    slider.onmousedown = (e) => { // عند الضغط بالماوس على الـ slider
        mouseDownAt = e.clientX; // تخزين إحداثيات الضغط على المحور الأفقي (X)
    };

    slider.onmouseup = () => { // عند إفلات زر الماوس
        mouseDownAt = 0; // إعادة تعيين موضع الضغط إلى 0
        slider.style.userSelect = 'unset'; // إعادة تمكين تحديد النص
        slider.style.cursor = 'unset'; // إعادة تعيين شكل المؤشر
        form.style.pointerEvents = 'unset'; // إعادة تمكين الأحداث داخل العنصر
        form.classList.remove('left'); // إزالة كلاس "left"
        form.classList.remove('right'); // إزالة كلاس "right"
    };

    slider.onmousemove = (e) => { // عند تحريك الماوس أثناء الضغط
        if (mouseDownAt === 0) return; // إذا لم يكن هناك ضغط، لا تفعل شيئًا
        slider.style.userSelect = 'none'; // تعطيل تحديد النص أثناء السحب
        slider.style.cursor = 'grab'; // تغيير المؤشر إلى "إمساك"
        form.style.pointerEvents = 'none'; // تعطيل تفاعل المستخدم مع العناصر الداخلية أثناء السحب

        if (e.clientX > mouseDownAt) { // إذا كان المستخدم يسحب لليمين
            form.classList.add('left'); // إضافة كلاس "left" 
            form.classList.remove('right'); // إزالة كلاس "right"
        } else if (e.clientX < mouseDownAt) { // إذا كان المستخدم يسحب لليسار
            form.classList.remove('left'); // إزالة كلاس "left"
            form.classList.add('right'); // إضافة كلاس "right"
        }

        let speed = 3; // تحديد سرعة التحريك
        let leftTemporary = left + ((e.clientX - mouseDownAt) / speed); // حساب الموضع الجديد للتمرير
        let leftLimit = form.offsetWidth - slider.offsetWidth / 2; // تحديد الحد الأقصى للحركة

        if (leftTemporary < 0 && Math.abs(leftTemporary) < leftLimit) { // التحقق من أن التمرير ضمن الحدود
            form.style.setProperty('--left', left + 'px'); // تحديث متغير CSS للتحريك
            left = leftTemporary; // تحديث الموضع الجديد
            mouseDownAt = e.clientX; // تحديث موضع الماوس الأخير
        }
    };
});





//النافذة المنبثقة الخاصة بالتقييم
document.addEventListener("DOMContentLoaded", function () { // تنفيذ الكود بعد تحميل محتوى الصفحة بالكامل
    const modal = document.getElementById("modal"); // الحصول على عنصر النافذة المنبثقة بالتحديد عبر الـ ID
    const openModalButtons = document.querySelectorAll(".openModalrate"); // تحديد جميع الأزرار التي تفتح النافذة المنبثقة
    const closeModal = document.querySelector(".close"); // الحصول على زر الإغلاق
    const submitReview = document.getElementById("submitReview"); // الحصول على زر إرسال التقييم

    // تأكد أن النافذة لا تفتح تلقائيًا عند تحميل الصفحة
    modal.style.display = "none"; // إخفاء النافذة عند بدء تشغيل الصفحة

    // فتح النافذة عند الضغط على أي زر يحمل الكلاس "openModalrate"
    openModalButtons.forEach(button => { // تكرار العملية لكل زر من أزرار فتح النافذة
        button.addEventListener("click", function () { // عند النقر على الزر
            modal.style.display = "flex"; // عرض النافذة المنبثقة بتنسيق "flex"
        });
    });

    // إغلاق النافذة عند النقر على زر الإغلاق
    closeModal.addEventListener("click", function () { // عند النقر على زر الإغلاق
        modal.style.display = "none"; // إخفاء النافذة المنبثقة
    });

    // إغلاق النافذة عند النقر خارج محتواها
    window.addEventListener("click", function (event) { // عند النقر في أي مكان في الصفحة
        if (event.target === modal) { // التحقق مما إذا كان النقر على خلفية النافذة وليس على محتواها
            modal.style.display = "none"; // إخفاء النافذة المنبثقة
        }
    });

    // إرسال التقييم عند النقر على زر "إرسال"
    submitReview.addEventListener("click", function () { // عند النقر على زر الإرسال
        const reviewText = document.getElementById("reviewText").value; // الحصول على النص المدخل في التقييم
        const selectedRating = document.querySelector('input[name="rate"]:checked'); // الحصول على التقييم المختار من النجوم

        if (!selectedRating) { // التحقق مما إذا لم يتم اختيار عدد النجوم
            alert("يرجى اختيار عدد النجوم للتقييم!"); // تنبيه المستخدم بضرورة اختيار تقييم
            return; // إنهاء التنفيذ دون إرسال التقييم
        }

        // عرض تنبيه يحتوي على التقييم وعدد النجوم الذي اختاره المستخدم
        alert(`تم إرسال تقييمك: ${selectedRating.value} نجوم\nمراجعتك: ${reviewText}`);

        modal.style.display = "none"; // إغلاق النافذة المنبثقة بعد إرسال التقييم
    });
});





// النوافذ المنبثقة الخاصة بالبيانات
document.addEventListener("DOMContentLoaded", function () { // تنفيذ الكود بعد تحميل محتوى الصفحة بالكامل
    const modalButtons = document.querySelectorAll(".openModal"); // الحصول على جميع الأزرار التي تفتح النوافذ المنبثقة
    const closeButtons = document.querySelectorAll(".close"); // الحصول على جميع أزرار الإغلاق داخل النوافذ المنبثقة
    const modals = document.querySelectorAll(".modal"); // الحصول على جميع النوافذ المنبثقة

    // إخفاء جميع النوافذ عند تحميل الصفحة
    modals.forEach(modal => { // تكرار العملية لكل نافذة منبثقة
        modal.style.display = "none"; // تعيين حالة العرض إلى "none" لإخفاء النافذة
    });

    // فتح النافذة المناسبة عند الضغط على زر معين
    modalButtons.forEach(button => { // تكرار العملية لكل زر من أزرار فتح النوافذ
        button.addEventListener("click", function () { // عند النقر على الزر
            const modalId = this.getAttribute("data-modal"); // الحصول على قيمة "data-modal" الخاصة بالزر
            document.getElementById(modalId).style.display = "flex"; // عرض النافذة المنبثقة المناسبة باستخدام "flex"
        });
    });

    // إغلاق النافذة عند الضغط على زر الإغلاق
    closeButtons.forEach(button => { // تكرار العملية لكل زر إغلاق
        button.addEventListener("click", function () { // عند النقر على زر الإغلاق
            this.closest(".modal").style.display = "none"; // البحث عن أقرب نافذة منبثقة وإخفاؤها
        });
    });

    // إغلاق النافذة عند النقر خارج المحتوى
    window.addEventListener("click", function (event) { // عند النقر في أي مكان في الصفحة
        modals.forEach(modal => { // التحقق لكل نافذة منبثقة
            if (event.target === modal) { // التحقق مما إذا كان النقر على خلفية النافذة
                modal.style.display = "none"; // إخفاء النافذة المنبثقة
            }
        });
    });
});

// فتح خريطة جوجل عند الضغط على زر الموقع
function openLocation(url) { // تعريف وظيفة فتح الموقع في نافذة جديدة
    window.open(url, "_blank"); // فتح الرابط في تبويب جديد
}

// إجراء مكالمة عند الضغط على زر الاتصال
function callNumber(number) { // تعريف وظيفة الاتصال برقم الهاتف
    window.location.href = `tel:${number}`; // فتح تطبيق الاتصال بالرقم المطلوب
}