document.addEventListener('DOMContentLoaded', function() {
    // 🚨🚨🚨 الرابط الصحيح والنهائي لبريدكِ الإلكتروني 🚨🚨🚨
    const formSubmitUrl = 'https://formsubmit.co/benmansourmansour24@gmail.com'; 

    // 1. تحديد العناصر الأساسية
    const modalWrapper = document.getElementById("devis-modal-wrapper");
    const openBtnNav = document.getElementById("open-modal-nav");
    const openBtnHero = document.getElementById("open-modal-hero");
    const openBtnFixed = document.getElementById("open-modal-fixed");
    const closeBtn = document.getElementById("close-btn");
    const closeBtnSuccess = document.getElementById("close-modal-success");
    const form = document.getElementById('devis-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const modalTitle = document.getElementById('modal-title');
    const submitButton = document.getElementById('submit-btn');

    // 2. تحديث رابط الإرسال
    if (form) {
        form.setAttribute('action', formSubmitUrl);
    }
    
    // إعداد حقل التوجيه (لإعادة المستخدم إلى نفس الصفحة)
    const nextField = form.querySelector('input[name="_next"]');
    if (nextField) {
        nextField.value = window.location.href.split('#')[0]; 
    }
    
    // 3. وظائف فتح وإغلاق النموذج المنبثق
    function openModal(event) {
        if (event) { event.preventDefault(); }
        modalWrapper.style.display = "flex";
        form.classList.remove('hide');
        form.style.display = "flex"; 
        confirmationMessage.classList.remove('show');
        modalTitle.style.display = 'block';
        form.reset();
        submitButton.textContent = 'ENVOYER LA DEMANDE';
        submitButton.disabled = false;
    }

    function closeModal() {
        modalWrapper.style.display = "none";
    }

    // ربط الأزرار
    if (openBtnNav) openBtnNav.addEventListener('click', openModal);
    if (openBtnHero) openBtnHero.addEventListener('click', openModal);
    if (openBtnFixed) openBtnFixed.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeBtnSuccess) closeBtnSuccess.addEventListener('click', closeModal);

    // الإغلاق عند النقر خارج النموذج
    if (modalWrapper) {
        modalWrapper.addEventListener('click', function(event) {
            if (event.target === modalWrapper) {
                closeModal();
            }
        });
    }

    // 4. الاستماع لحدث إرسال النموذج (AJAX Logic)
    if (form && confirmationMessage && modalTitle) { 
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); 

            submitButton.textContent = '... جاري الإرسال';
            submitButton.disabled = true;

            const formData = new FormData(form);

            try {
                // إرسال البيانات عبر AJAX
                const response = await fetch(formSubmitUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // نجاح الإرسال
                    form.classList.add('hide'); 
                    form.style.display = 'none';
                    modalTitle.style.display = 'none'; 
                    confirmationMessage.classList.add('show'); 
                    form.reset();
                } else {
                    // في حالة وجود خطأ
                    alert('عذراً، حدث خطأ أثناء إرسال طلبكم. المرجو التأكد من جميع الحقول.');
                }
            } catch (error) {
                console.error('Network Error:', error);
                alert('فشل الإتصال. يرجى التحقق من الإنترنت والمحاولة مرة أخرى.');
            } finally {
                // إعادة الزر لوضعه الطبيعي في حال الفشل
                if (confirmationMessage.classList.contains('show') === false) {
                    submitButton.textContent = 'ENVOYER LA DEMANDE';
                    submitButton.disabled = false;
                }
            }
        });
    }
});