document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'bg-white');
        } else {
            navbar.classList.remove('scrolled', 'bg-white');
        }
    });

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    revealOnScroll(); // Trigger on load
    window.addEventListener('scroll', revealOnScroll);

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. Kurban Selection Wizard (Inline)
    let currentStep = 1;
    const totalSteps = 5;

    const progressBar = document.getElementById('inline-progress-bar');
    const stepText = document.getElementById('inline-current-step');
    const stepName = document.getElementById('inline-step-name');
    const stepsContainer = document.getElementById('inline-wizard-steps-container');
    const nextBtn = document.getElementById('inline-w-next-btn');
    const prevBtn = document.getElementById('inline-w-prev-btn');

    let wizardData = {
        type: '',
        package: '',
        name: '',
        phone: '',
        delivery: ''
    };

    const stepTitles = ["Hisse Türü", "Paket Seçimi", "Hisse Sahibi", "Teslimat", "Hayırlı Olsun"];

    function initWizard() {
        if (!stepsContainer) return;
        currentStep = 1;
        wizardData = { type: '', package: '', name: '', phone: '', delivery: '' };
        updateWizardUI();
    }

    function updateWizardUI() {
        // Update Progress
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
        stepText.innerText = currentStep;
        stepName.innerText = stepTitles[currentStep - 1];

        // Update Buttons
        prevBtn.classList.toggle('d-none', currentStep === 1);
        nextBtn.innerText = currentStep === totalSteps ? 'WHATSAPP İLE GÖNDER' : 'İleri';
        if (currentStep === totalSteps) {
            nextBtn.classList.replace('btn-emerald', 'btn-success');
        } else {
            nextBtn.classList.replace('btn-success', 'btn-emerald');
        }

        renderStep();
    }

    function renderStep() {
        let html = '';
        switch (currentStep) {
            case 1:
                html = `
                    <div class="row g-4 justify-content-center px-lg-3">
                        <div class="col-6 col-md-5 mb-3">
                            <label class="wizard-card bg-white p-3 p-md-5 border-0 rounded-4 w-100 text-center cursor-pointer position-relative ${wizardData.type === 'Büyükbaş' ? 'border-2 border-secondary' : ''}" style="min-height: 380px; display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                                <input type="radio" name="w_type" value="Büyükbaş" class="d-none" ${wizardData.type === 'Büyükbaş' ? 'checked' : ''}>
                                <span class="badge text-white position-absolute top-0 start-50 translate-middle px-3 py-2 rounded-pill fw-bold" style="background-color: #ff6a00; font-size: 0.65rem; border: 2px solid white; white-space: nowrap;">ÇOK TERCİH EDİLEN</span>
                                <div class="my-auto py-3">
                                    <img src="assets/buyukbas.png?v=9" alt="Büyükbaş" class="img-fluid" style="max-height: 160px; object-fit: contain;">
                                </div>
                                <div class="mt-auto">
                                    <h4 class="fw-bold text-dark mb-4" style="font-size: 1.5rem; letter-spacing: -0.5px;">Büyükbaş</h4>
                                    <div class="btn rounded-pill px-2 py-2 w-100 text-muted fw-bold" style="font-size: 0.75rem; background-color: #f4f5f7; letter-spacing: 0.5px;">SEÇMEK İÇİN TIKLA</div>
                                </div>
                            </label>
                        </div>
                        <div class="col-6 col-md-5 mb-3">
                            <label class="wizard-card bg-white p-3 p-md-5 border-0 rounded-4 w-100 text-center cursor-pointer ${wizardData.type === 'Küçükbaş' ? 'border-2 border-secondary' : ''}" style="min-height: 380px; display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                                <input type="radio" name="w_type" value="Küçükbaş" class="d-none" ${wizardData.type === 'Küçükbaş' ? 'checked' : ''}>
                                <div class="my-auto py-3">
                                    <img src="assets/kucukbas.png?v=9" alt="Küçükbaş" class="img-fluid" style="max-height: 160px; object-fit: contain;">
                                </div>
                                <div class="mt-auto">
                                    <h4 class="fw-bold text-dark mb-4" style="font-size: 1.5rem; letter-spacing: -0.5px;">Küçükbaş</h4>
                                    <div class="btn rounded-pill px-2 py-2 w-100 text-muted fw-bold" style="font-size: 0.75rem; background-color: #f4f5f7; letter-spacing: 0.5px;">SEÇMEK İÇİN TIKLA</div>
                                </div>
                            </label>
                        </div>
                    </div>`;
                break;
            case 2:
                html = `<h4 class="h5 fw-bold mb-4 text-center">Hisse Paketi Seçiniz</h4><div class="row g-3">`;
                const packages = wizardData.type === 'Büyükbaş'
                    ? [
                        { val: '28.000 TL - 36.000 TL', label: '1. GRUP', desc: '28.000TL - 36.000TL Arası' },
                        { val: '36.000 TL - 42.000 TL', label: '2. GRUP', desc: '36.000TL - 42.000TL Arası', popular: true },
                        { val: '42.000 TL & Üzeri', label: '3. GRUP', desc: '42.000TL & Üzeri' }
                    ]
                    : [
                        { val: 'Standart (14.500 TL)', label: 'Koç / Koyun', desc: '20-25 KG Ortalama' },
                        { val: 'Lüks (17.000 TL)', label: 'Besi Koç', desc: '28-32 KG Ortalama' }
                    ];
                packages.forEach(pkg => {
                    html += `
                        <div class="col-12">
                            <label class="wizard-card p-3 border rounded-4 w-100 d-flex align-items-center justify-content-between cursor-pointer ${wizardData.package === pkg.val ? 'border-success bg-emerald-light' : ''}">
                                <div class="d-flex align-items-center gap-3">
                                    <input type="radio" name="w_package" value="${pkg.val}" class="form-check-input ms-0" ${wizardData.package === pkg.val ? 'checked' : ''}>
                                    <div>
                                        <div class="fw-bold fs-5">${pkg.label} ${pkg.popular ? '<span class="badge bg-warning text-dark ms-2 small">Çok Tercih Edilen</span>' : ''}</div>
                                        <div class="small text-muted">${pkg.desc}</div>
                                    </div>
                                </div>
                                <div class="fw-bold text-emerald">${pkg.val}</div>
                            </label>
                        </div>`;
                });
                html += `</div>`;
                break;
            case 3:
                html = `
                    <h4 class="h5 fw-bold mb-4 text-center">Hisse Sahibi Bilgileri</h4>
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="w_name" placeholder="Ad Soyad" value="${wizardData.name}">
                                <label for="w_name">Vekalet Veren Ad Soyad</label>
                            </div>
                            <div class="form-floating">
                                <input type="tel" class="form-control" id="w_phone" placeholder="Telefon" value="${wizardData.phone}">
                                <label for="w_phone">Telefon Numaranız</label>
                            </div>
                        </div>
                    </div>`;
                break;
            case 4:
                html = `
                    <h4 class="h5 fw-bold mb-4 text-center">Teslimat Tercihi</h4>
                    <div class="row g-3">
                        <div class="col-sm-6 text-center">
                            <label class="wizard-card p-4 border rounded-4 w-100 h-100 d-flex flex-column align-items-center cursor-pointer ${wizardData.delivery === 'Adrese Teslim' ? 'bg-emerald-light' : ''}">
                                <input type="radio" name="w_delivery" value="Adrese Teslim" class="d-none" ${wizardData.delivery === 'Adrese Teslim' ? 'checked' : ''}>
                                <i data-lucide="truck" class="text-emerald mb-2" size="40"></i>
                                <span class="fw-bold">Adrese Teslim</span>
                            </label>
                        </div>
                        <div class="col-sm-6 text-center">
                            <label class="wizard-card p-4 border rounded-4 w-100 h-100 d-flex flex-column align-items-center cursor-pointer ${wizardData.delivery === 'Kesim Yerinde' ? 'bg-emerald-light' : ''}">
                                <input type="radio" name="w_delivery" value="Kesim Yerinde" class="d-none" ${wizardData.delivery === 'Kesim Yerinde' ? 'checked' : ''}>
                                <i data-lucide="map-pin" class="text-emerald mb-2" size="40"></i>
                                <span class="fw-bold">Kesim Yerinde</span>
                            </label>
                        </div>
                    </div>`;
                break;
            case 5:
                html = `
                    <div class="text-center mb-4">
                        <div class="icon-circle bg-success text-white mx-auto mb-3" style="width: 80px; height: 80px;">
                            <i data-lucide="check" size="40"></i>
                        </div>
                        <h4 class="fw-bold">Neredeyse Hazır!</h4>
                        <p class="text-muted">Lütfen tercihlerinizi kontrol edip onaylayınız.</p>
                    </div>
                    <div class="p-3 bg-light rounded-4">
                        <div class="d-flex justify-content-between border-bottom pb-2 mb-2"><span>Tür:</span><span class="fw-bold text-emerald">${wizardData.type}</span></div>
                        <div class="d-flex justify-content-between border-bottom pb-2 mb-2"><span>Paket:</span><span class="fw-bold text-emerald">${wizardData.package}</span></div>
                        <div class="d-flex justify-content-between border-bottom pb-2 mb-2"><span>Hissedar:</span><span class="fw-bold text-emerald">${wizardData.name}</span></div>
                        <div class="d-flex justify-content-between"><span>Teslimat:</span><span class="fw-bold text-emerald">${wizardData.delivery}</span></div>
                    </div>
                    <div class="form-check mt-4 small">
                        <input class="form-check-input" type="checkbox" id="kvkk_check">
                        <label class="form-check-label text-muted" for="kvkk_check">
                            İslami usullere uygun kesim ve vekalet onayını kabul ediyorum.
                        </label>
                    </div>`;
                break;
        }
        stepsContainer.innerHTML = html;
        lucide.createIcons();
    }

    // Next Button Events
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStep < totalSteps) {
                // Save data from inputs
                if (currentStep === 1) {
                    const checkedType = document.querySelector('input[name="w_type"]:checked');
                    if (!checkedType) return alert('Lütfen seçim yapınız');
                    wizardData.type = checkedType.value;
                } else if (currentStep === 2) {
                    const checkedPkg = document.querySelector('input[name="w_package"]:checked');
                    if (!checkedPkg) return alert('Lütfen paket seçiniz');
                    wizardData.package = checkedPkg.value;
                } else if (currentStep === 3) {
                    const nameInp = document.getElementById('w_name');
                    const phoneInp = document.getElementById('w_phone');
                    if (!nameInp.value || !phoneInp.value) return alert('Lütfen bilgileri doldurun');
                    wizardData.name = nameInp.value;
                    wizardData.phone = phoneInp.value;
                } else if (currentStep === 4) {
                    const checkedDel = document.querySelector('input[name="w_delivery"]:checked');
                    if (!checkedDel) return alert('Lütfen teslimat seçiniz');
                    wizardData.delivery = checkedDel.value;
                }
                currentStep++;
                updateWizardUI();
            } else {
                // Finalize
                if (!document.getElementById('kvkk_check').checked) return alert('Lütfen onayı işaretleyiniz');
                sendWhatsApp();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStep > 1) {
                currentStep--;
                updateWizardUI();
            }
        });
    }

    function sendWhatsApp() {
        const text = `Selamün Aleyküm, ÇınarDere Kurban için kayıt yaptırmak istiyorum.
%0A%0A📌 *Kayıt Detayları:*
%0A━━━━━━━━━━━━━━━━━━
%0A🔹 *Tür:* ${wizardData.type}
%0A🔹 *Paket/Grup:* ${wizardData.package}
%0A🔹 *Vekalet Sahibi:* ${wizardData.name}
%0A🔹 *Telefon:* ${wizardData.phone}
%0A🔹 *Teslimat:* ${wizardData.delivery}
%0A━━━━━━━━━━━━━━━━━━
%0A_Allah hayırlı kurbanlar nasip eylesin._`;

        window.open(`https://wa.me/905072574034?text=${text}`, '_blank');

        // Reset after send
        setTimeout(() => {
            initWizard();
        }, 1000);
    }

    // Start inline wizard
    initWizard();

    // Contact Form Action
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('c_name').value;
            const phone = document.getElementById('c_phone').value;
            const subject = document.getElementById('c_subject').value;
            const msg = document.getElementById('c_message').value;

            const text = `Siteden Yeni Mesaj:%0A👤 *İsim:* ${name}%0A📞 *Tel:* ${phone}%0A📂 *Konu:* ${subject}%0A💬 *Mesaj:* ${msg}`;
            window.open(`https://wa.me/905072574034?text=${text}`, '_blank');
        });
    }
});
