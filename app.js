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
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // Get navbar height
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 80;

                // For mobile offcanvas: handling close
                const offcanvasElement = document.getElementById('mobileMenu');
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }

                // If menu was closed, we wait a tiny bit for layout shift, then scroll
                const scrollTimeout = bsOffcanvas ? 250 : 0;
                
                setTimeout(() => {
                    const rect = target.getBoundingClientRect();
                    const topPos = rect.top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: topPos,
                        behavior: "smooth"
                    });
                }, scrollTimeout);
            }
        });
    });

    // 5. Kurban Selection Wizard (Inline) — 7 Adım
    let currentStep = 1;
    const totalSteps = 7;

    const progressBar = document.getElementById('inline-progress-bar');
    const stepText = document.getElementById('inline-current-step');
    const stepsContainer = document.getElementById('inline-wizard-steps-container');
    const nextBtn = document.getElementById('inline-w-next-btn');
    const prevBtn = document.getElementById('inline-w-prev-btn');

    let wizardData = {
        type: '',
        package: '',
        delivery: '',
        name: '',
        phone: '',
        address: '',
        onBehalf: 'Kendim',
        onBehalfName: '',
        hisseCount: '1',
        payment: '',
        note: ''
    };

    const stepTitles = [
        "Hisse Türü",
        "Grup Seçimi",
        "Teslimat Yöntemi",
        "Kişisel Bilgiler",
        "Hisse Detayları",
        "Ek Bilgiler",
        "Özet & Onay"
    ];

    function initWizard() {
        if (!stepsContainer) return;
        currentStep = 1;
        wizardData = {
            type: '', package: '', delivery: '',
            name: '', phone: '', address: '',
            onBehalf: 'Kendim', onBehalfName: '',
            hisseCount: '1', payment: '', note: ''
        };
        updateWizardUI();
    }

    function updateWizardUI() {
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
        stepText.innerText = currentStep;

        prevBtn.classList.toggle('d-none', currentStep === 1);

        if (currentStep === totalSteps) {
            nextBtn.innerHTML = '<i data-lucide="send" class="me-2" style="width:18px;height:18px;"></i> WHATSAPP İLE GÖNDER';
            nextBtn.classList.remove('btn-emerald');
            nextBtn.classList.add('btn-success');
        } else {
            nextBtn.innerHTML = 'İleri <i data-lucide="chevron-right" class="ms-1" style="width:18px;height:18px;"></i>';
            nextBtn.classList.remove('btn-success');
            nextBtn.classList.add('btn-emerald');
        }

        renderStep();
    }

    function renderStep() {
        let html = '';
        switch (currentStep) {

            // ───────── ADIM 1: Hayvan Türü ─────────
            case 1:
                html = `
                    <h4 class="h5 fw-bold mb-4 text-center">Kurban Türünü Seçiniz</h4>
                    <div class="row g-4 justify-content-center">
                        <div class="col-6">
                            <label class="wizard-card p-4 p-md-5 border rounded-4 text-center w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer ${wizardData.type === 'Büyükbaş' ? 'selected' : ''}" style="min-height: 200px;">
                                <input type="radio" name="w_type" value="Büyükbaş" class="d-none" ${wizardData.type === 'Büyükbaş' ? 'checked' : ''}>
                                <div class="display-1 mb-3">🐂</div>
                                <span class="fw-bold fs-5">Büyükbaş</span>
                                <small class="text-muted mt-1">Dana</small>
                            </label>
                        </div>
                        <div class="col-6">
                            <label class="wizard-card p-4 p-md-5 border rounded-4 text-center w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer ${wizardData.type === 'Küçükbaş' ? 'selected' : ''}" style="min-height: 200px;">
                                <input type="radio" name="w_type" value="Küçükbaş" class="d-none" ${wizardData.type === 'Küçükbaş' ? 'checked' : ''}>
                                <div class="display-1 mb-3">🐑</div>
                                <span class="fw-bold fs-5">Küçükbaş</span>
                                <small class="text-muted mt-1">Koç</small>
                            </label>
                        </div>
                    </div>`;
                break;

            // ───────── ADIM 2: Grup Seçimi ─────────
            case 2:
                html = `<h4 class="h5 fw-bold mb-4 text-center">Hisse Grubunuzu Seçiniz</h4><div class="row g-3">`;
                const packages = wizardData.type === 'Büyükbaş'
                    ? [
                        { val: '1. GRUP (28.000 - 36.000 TL)', label: '1. GRUP', desc: '28.000TL — 36.000TL', icon: '🥉' },
                        { val: '2. GRUP (36.000 - 42.000 TL)', label: '2. GRUP', desc: '36.000TL — 42.000TL', icon: '🥈', popular: true },
                        { val: '3. GRUP (42.000 TL & Üzeri)', label: '3. GRUP', desc: '42.000TL & Üzeri', icon: '🥇' }
                    ]
                    : [
                        { val: 'Koç / Koyun (14.500 TL)', label: 'Koç / Koyun', desc: '14.500 TL — 20-25 KG', icon: '🐑' },
                        { val: 'Besi Koç (17.000 TL)', label: 'Besi Koç', desc: '17.000 TL — 28-32 KG', icon: '🐏' }
                    ];
                packages.forEach(pkg => {
                    html += `
                        <div class="col-12">
                            <label class="wizard-card p-3 p-md-4 border rounded-4 w-100 d-flex align-items-center gap-3 cursor-pointer ${wizardData.package === pkg.val ? 'selected' : ''}">
                                <input type="radio" name="w_package" value="${pkg.val}" class="d-none" ${wizardData.package === pkg.val ? 'checked' : ''}>
                                <div class="fs-2">${pkg.icon}</div>
                                <div class="flex-grow-1">
                                    <div class="fw-bold fs-5">${pkg.label}</div>
                                    <div class="small text-muted">${pkg.desc}</div>
                                </div>
                                ${pkg.popular ? '<span class="badge rounded-pill text-white px-3 py-2 fw-bold" style="background-color: #ff6a00;">Çok Tercih Edilen</span>' : ''}
                                <div class="form-check-circle ms-auto">
                                    <div class="rounded-circle border ${wizardData.package === pkg.val ? 'bg-success border-success' : 'border-secondary'}" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                                        ${wizardData.package === pkg.val ? '<i data-lucide="check" style="width:14px;height:14px;color:white;"></i>' : ''}
                                    </div>
                                </div>
                            </label>
                        </div>`;
                });
                html += `</div>`;
                break;

            // ───────── ADIM 3: Teslimat Yöntemi ─────────
            case 3:
                html = `
                    <h4 class="h5 fw-bold mb-4 text-center">Teslimat Tercihiniz</h4>
                    <div class="row g-4 justify-content-center">
                        <div class="col-6">
                            <label class="wizard-card p-4 p-md-5 border rounded-4 text-center w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer ${wizardData.delivery === 'Eve Teslim' ? 'selected' : ''}" style="min-height: 200px;">
                                <input type="radio" name="w_delivery" value="Eve Teslim" class="d-none" ${wizardData.delivery === 'Eve Teslim' ? 'checked' : ''}>
                                <div class="display-1 mb-3">🏠</div>
                                <span class="fw-bold fs-5">Eve Teslim</span>
                                <small class="text-muted mt-1">Adresinize getirilir</small>
                            </label>
                        </div>
                        <div class="col-6">
                            <label class="wizard-card p-4 p-md-5 border rounded-4 text-center w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer ${wizardData.delivery === 'Şubeden Teslim' ? 'selected' : ''}" style="min-height: 200px;">
                                <input type="radio" name="w_delivery" value="Şubeden Teslim" class="d-none" ${wizardData.delivery === 'Şubeden Teslim' ? 'checked' : ''}>
                                <div class="display-1 mb-3">🏪</div>
                                <span class="fw-bold fs-5">Şubeden Teslim</span>
                                <small class="text-muted mt-1">Kesim yerinden alırsınız</small>
                            </label>
                        </div>
                    </div>
                    ${wizardData.delivery === 'Şubeden Teslim' ? `
                    <div class="mt-4">
                        <a href="https://maps.app.goo.gl/aAKQMa1HKVDTvkWk6?g_st=iw" target="_blank" class="btn btn-outline-success rounded-pill w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold">
                            <span class="fs-4">📍</span> Şube Konumunu Haritada Gör
                        </a>
                    </div>` : ''}
                `;
                break;

            // ───────── ADIM 4: Kişisel Bilgiler ─────────
            case 4:
                html = `
                    <h4 class="h5 fw-bold mb-4 text-center">Kişisel Bilgileriniz</h4>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="text" class="form-control rounded-3" id="w_name" placeholder="Ad Soyad" value="${wizardData.name}">
                                <label for="w_name">👤 Ad Soyad</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="tel" class="form-control rounded-3" id="w_phone" placeholder="Telefon" value="${wizardData.phone}">
                                <label for="w_phone">📞 Telefon Numarası</label>
                            </div>
                        </div>
                        ${wizardData.delivery === 'Eve Teslim' ? `
                        <div class="col-12">
                            <div class="form-floating">
                                <textarea class="form-control rounded-3" id="w_address" placeholder="Adres" style="height: 100px">${wizardData.address}</textarea>
                                <label for="w_address">📍 Teslimat Adresi</label>
                            </div>
                            <div class="form-text text-muted small mt-1"><i data-lucide="info" style="width:14px;height:14px;" class="me-1"></i>Mahalle, sokak, bina no ve daire no yazınız.</div>
                        </div>` : `
                        <div class="col-12">
                            <div class="alert alert-light border rounded-3 d-flex align-items-center gap-2 mb-0">
                                <span class="fs-4">📍</span>
                                <div>
                                    <div class="fw-bold small">Şube Adresi</div>
                                    <div class="small text-muted">Erenler / Sakarya — Kesim günü detaylar WhatsApp ile paylaşılacaktır.</div>
                                </div>
                            </div>
                        </div>`}
                    </div>`;
                break;

            // ───────── ADIM 5: Hisse Detayları ─────────
            case 5:
                html = `
                    <h4 class="h5 fw-bold mb-4 text-center">Hisse Detayları</h4>
                    <div class="row g-3">
                        <!-- Kimin Adına -->
                        <div class="col-12">
                            <label class="form-label fw-bold small text-muted text-uppercase" style="letter-spacing: 1px;">Hisse Kimin Adına?</label>
                            <div class="row g-2">
                                <div class="col-6">
                                    <label class="wizard-card p-3 border rounded-3 text-center w-100 cursor-pointer d-flex align-items-center justify-content-center gap-2 ${wizardData.onBehalf === 'Kendim' ? 'selected' : ''}">
                                        <input type="radio" name="w_onbehalf" value="Kendim" class="d-none" ${wizardData.onBehalf === 'Kendim' ? 'checked' : ''}>
                                        <span class="fw-bold">🙋 Kendim Adıma</span>
                                    </label>
                                </div>
                                <div class="col-6">
                                    <label class="wizard-card p-3 border rounded-3 text-center w-100 cursor-pointer d-flex align-items-center justify-content-center gap-2 ${wizardData.onBehalf === 'Başkası' ? 'selected' : ''}">
                                        <input type="radio" name="w_onbehalf" value="Başkası" class="d-none" ${wizardData.onBehalf === 'Başkası' ? 'checked' : ''}>
                                        <span class="fw-bold">👥 Başkası Adına</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        ${wizardData.onBehalf === 'Başkası' ? `
                        <div class="col-12">
                            <div class="form-floating">
                                <input type="text" class="form-control rounded-3" id="w_onbehalf_name" placeholder="Vekalet Sahibi" value="${wizardData.onBehalfName}">
                                <label for="w_onbehalf_name">Vekalet Verilen Kişinin Adı Soyadı</label>
                            </div>
                        </div>` : ''}

                        <!-- Hisse Sayısı -->
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted text-uppercase" style="letter-spacing: 1px;">Hisse Sayısı</label>
                            <select class="form-select rounded-3 py-3" id="w_hisse_count">
                                ${[1,2,3,4,5,6,7].map(n => `<option value="${n}" ${wizardData.hisseCount == n ? 'selected' : ''}>${n} Hisse</option>`).join('')}
                            </select>
                        </div>

                        <!-- Ödeme Tercihi -->
                        <div class="col-md-6">
                            <label class="form-label fw-bold small text-muted text-uppercase" style="letter-spacing: 1px;">Ödeme Tercihi</label>
                            <select class="form-select rounded-3 py-3" id="w_payment">
                                <option value="" ${!wizardData.payment ? 'selected' : ''} disabled>Seçiniz...</option>
                                <option value="Nakit" ${wizardData.payment === 'Nakit' ? 'selected' : ''}>💵 Nakit</option>
                                <option value="Havale / EFT" ${wizardData.payment === 'Havale / EFT' ? 'selected' : ''}>🏦 Havale / EFT</option>
                                <option value="Taksit" ${wizardData.payment === 'Taksit' ? 'selected' : ''}>💳 Taksitli Ödeme</option>
                            </select>
                        </div>
                    </div>`;
                break;

            // ───────── ADIM 6: Özel Not ─────────
            case 6:
                html = `
                    <h4 class="h5 fw-bold mb-4 text-center">Eklemek İstediğiniz Bir Not Var mı?</h4>
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="form-floating">
                                <textarea class="form-control rounded-3" id="w_note" placeholder="Notunuz" style="height: 140px">${wizardData.note}</textarea>
                                <label for="w_note">📝 Özel Notunuz (İsteğe Bağlı)</label>
                            </div>
                            <div class="form-text text-muted small mt-2"><i data-lucide="info" style="width:14px;height:14px;" class="me-1"></i>Örnek: "Sakatat ayrı paketlensin", "Kıyma çekilsin" vb.</div>
                        </div>
                        <div class="col-12 mt-3">
                            <div class="alert alert-light border rounded-3 mb-0">
                                <div class="fw-bold small mb-2">💡 Biliyor muydunuz?</div>
                                <ul class="small text-muted mb-0 ps-3">
                                    <li>Sakatat (ciğer, işkembe vb.) standart olarak teslim edilir.</li>
                                    <li>Kıyma çekilmesi ücretsiz olarak yapılabilir.</li>
                                    <li>Özel parçalama isteğinizi buraya yazabilirsiniz.</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
                break;

            // ───────── ADIM 7: Özet & Onay ─────────
            case 7:
                const onBehalfText = wizardData.onBehalf === 'Başkası' 
                    ? `${wizardData.onBehalfName} (Vekalet)` 
                    : wizardData.name;
                html = `
                    <div class="text-center mb-4">
                        <div class="display-4 mb-2">✅</div>
                        <h4 class="fw-bold">Kayıt Özetiniz</h4>
                        <p class="text-muted small">Bilgilerinizi kontrol edip onaylayın.</p>
                    </div>
                    <div class="p-3 p-md-4 bg-light rounded-4">
                        <div class="row g-0">
                            <div class="col-5 py-2 border-bottom"><span class="text-muted small">Kurban Türü</span></div>
                            <div class="col-7 py-2 border-bottom text-end fw-bold">${wizardData.type}</div>

                            <div class="col-5 py-2 border-bottom"><span class="text-muted small">Grup / Paket</span></div>
                            <div class="col-7 py-2 border-bottom text-end fw-bold">${wizardData.package}</div>

                            <div class="col-5 py-2 border-bottom"><span class="text-muted small">Teslimat</span></div>
                            <div class="col-7 py-2 border-bottom text-end fw-bold">${wizardData.delivery}</div>

                            <div class="col-5 py-2 border-bottom"><span class="text-muted small">Ad Soyad</span></div>
                            <div class="col-7 py-2 border-bottom text-end fw-bold">${wizardData.name}</div>

                            <div class="col-5 py-2 border-bottom"><span class="text-muted small">Telefon</span></div>
                            <div class="col-7 py-2 border-bottom text-end fw-bold">${wizardData.phone}</div>

                            ${wizardData.delivery === 'Eve Teslim' ? `
                            <div class="col-5 py-2 border-bottom"><span class="text-muted small">Adres</span></div>
                            <div class="col-7 py-2 border-bottom text-end fw-bold small">${wizardData.address}</div>` : ''}

                            <div class="col-5 py-2 border-bottom"><span class="text-muted small">Hisse Adına</span></div>
                            <div class="col-7 py-2 border-bottom text-end fw-bold">${onBehalfText}</div>

                            <div class="col-5 py-2 border-bottom"><span class="text-muted small">Hisse Sayısı</span></div>
                            <div class="col-7 py-2 border-bottom text-end fw-bold">${wizardData.hisseCount} Hisse</div>

                            <div class="col-5 py-2 border-bottom"><span class="text-muted small">Ödeme</span></div>
                            <div class="col-7 py-2 border-bottom text-end fw-bold">${wizardData.payment}</div>

                            ${wizardData.note ? `
                            <div class="col-5 py-2"><span class="text-muted small">Not</span></div>
                            <div class="col-7 py-2 text-end fw-bold small">${wizardData.note}</div>` : ''}
                        </div>
                    </div>
                    <div class="form-check mt-4">
                        <input class="form-check-input" type="checkbox" id="kvkk_check">
                        <label class="form-check-label text-muted small" for="kvkk_check">
                            İslami usullere uygun kesim ve vekalet onayını kabul ediyorum. Bilgilerimin doğruluğunu teyit ederim.
                        </label>
                    </div>`;
                break;
        }
        stepsContainer.innerHTML = html;
        lucide.createIcons();

        // Live-update radio selections
        stepsContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.name === 'w_type') { wizardData.type = radio.value; wizardData.package = ''; }
                if (radio.name === 'w_package') wizardData.package = radio.value;
                if (radio.name === 'w_delivery') wizardData.delivery = radio.value;
                if (radio.name === 'w_onbehalf') wizardData.onBehalf = radio.value;
                renderStep();
            });
        });
    }

    // ───────── Navigation ─────────
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStep < totalSteps) {
                // Validate current step
                if (currentStep === 1) {
                    if (!wizardData.type) return alert('Lütfen kurban türünü seçiniz.');
                } else if (currentStep === 2) {
                    if (!wizardData.package) return alert('Lütfen hisse grubunu seçiniz.');
                } else if (currentStep === 3) {
                    if (!wizardData.delivery) return alert('Lütfen teslimat yöntemini seçiniz.');
                } else if (currentStep === 4) {
                    const n = document.getElementById('w_name');
                    const p = document.getElementById('w_phone');
                    const a = document.getElementById('w_address');
                    if (!n || !n.value.trim()) return alert('Lütfen ad soyad giriniz.');
                    if (!p || !p.value.trim()) return alert('Lütfen telefon numarası giriniz.');
                    wizardData.name = n.value.trim();
                    wizardData.phone = p.value.trim();
                    if (wizardData.delivery === 'Eve Teslim') {
                        if (!a || !a.value.trim()) return alert('Lütfen teslimat adresini giriniz.');
                        wizardData.address = a.value.trim();
                    }
                } else if (currentStep === 5) {
                    const obn = document.getElementById('w_onbehalf_name');
                    const hc = document.getElementById('w_hisse_count');
                    const pm = document.getElementById('w_payment');
                    if (wizardData.onBehalf === 'Başkası' && obn && !obn.value.trim()) return alert('Lütfen vekalet verilen kişinin adını giriniz.');
                    if (wizardData.onBehalf === 'Başkası' && obn) wizardData.onBehalfName = obn.value.trim();
                    if (hc) wizardData.hisseCount = hc.value;
                    if (!pm || !pm.value) return alert('Lütfen ödeme tercihini seçiniz.');
                    wizardData.payment = pm.value;
                } else if (currentStep === 6) {
                    const noteEl = document.getElementById('w_note');
                    wizardData.note = noteEl ? noteEl.value.trim() : '';
                }
                currentStep++;
                updateWizardUI();
                // Scroll to top of wizard
                document.getElementById('wizard').scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // STEP 7 — Send
                if (!document.getElementById('kvkk_check').checked) return alert('Lütfen onay kutusunu işaretleyiniz.');
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

    // ───────── WhatsApp Mesajı ─────────
    function sendWhatsApp() {
        const onBehalfLine = wizardData.onBehalf === 'Başkası'
            ? `%0A🔹 *Vekalet:* ${wizardData.onBehalfName} adına`
            : `%0A🔹 *Vekalet:* Kendi adıma`;

        const addressLine = wizardData.delivery === 'Eve Teslim'
            ? `%0A🔹 *Adres:* ${wizardData.address}`
            : '';

        const noteLine = wizardData.note
            ? `%0A📝 *Not:* ${wizardData.note}`
            : '';

        const text = `Selamün Aleyküm, ÇınarDere Kurban için kayıt yaptırmak istiyorum.
%0A%0A📌 *Kayıt Detayları:*
%0A━━━━━━━━━━━━━━━━━━
%0A🔹 *Tür:* ${wizardData.type}
%0A🔹 *Grup:* ${wizardData.package}
%0A🔹 *Hisse Sayısı:* ${wizardData.hisseCount}
%0A🔹 *Teslimat:* ${wizardData.delivery}${addressLine}
%0A━━━━━━━━━━━━━━━━━━
%0A👤 *Ad Soyad:* ${wizardData.name}
%0A📞 *Telefon:* ${wizardData.phone}${onBehalfLine}
%0A💰 *Ödeme:* ${wizardData.payment}${noteLine}
%0A━━━━━━━━━━━━━━━━━━
%0A_Allah hayırlı kurbanlar nasip eylesin._`;

        window.open(`https://wa.me/905072574034?text=${text}`, '_blank');

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
