document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Transparent to Solid Glassmorphism Navbar via Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Animation (Reveal Elements on Scroll)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // threshold before it shows

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Trigger once on load
    revealOnScroll();
    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);

    // 3. Smooth Scroll for Anchor Links (Navigating)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjusting header offset (Height of the navbar)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
    // 4. Kurban Selection Wizard Logic
    let currentStep = 1;
    const totalSteps = 5;
    const progressBar = document.getElementById('progress-bar');
    const stepText = document.getElementById('current-step');
    const wizardSteps = document.querySelectorAll('.wizard-step');
    
    // Wizard State
    let wizardData = {
        type: '',
        package: '',
        name: '',
        phone: '',
        delivery: '',
        address: ''
    };

    window.selectKurban = (type) => {
        wizardData.type = type === 'buyukbas' ? 'Büyükbaş' : 'Küçükbaş';
        
        // Show correct packages in Step 2
        document.getElementById('package-buyukbas').style.display = type === 'buyukbas' ? 'grid' : 'none';
        document.getElementById('package-kucukbas').style.display = type === 'kucukbas' ? 'grid' : 'none';
        
        nextStep();
    };

    window.selectPackage = (pkg) => {
        wizardData.package = pkg;
        
        // Visual selection
        document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
        
        // Slight delay for better UX
        setTimeout(() => {
            nextStep();
        }, 300);
    };

    window.submitStep3 = () => {
        const nameInput = document.getElementById('wizard-name');
        const phoneInput = document.getElementById('wizard-phone');
        
        if (!nameInput.value.trim() || !phoneInput.value.trim()) {
            alert('Lütfen ad soyad ve telefon bilgilerinizi eksiksiz giriniz.');
            return;
        }

        wizardData.name = nameInput.value.trim();
        wizardData.phone = phoneInput.value.trim();
        nextStep();
    };

    window.toggleAddressField = (show) => {
        document.getElementById('address-field-container').style.display = show ? 'block' : 'none';
    };

    window.submitStep4 = () => {
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
        
        if (!selectedDelivery) {
            alert('Lütfen bir teslimat tercihi seçiniz.');
            return;
        }

        wizardData.delivery = selectedDelivery.value;
        
        if (wizardData.delivery === 'Adrese Teslim Edilsin') {
            const addressInput = document.getElementById('wizard-address');
            if (!addressInput.value.trim()) {
                alert('Lütfen teslimat adresinizi giriniz.');
                return;
            }
            wizardData.address = addressInput.value.trim();
        } else {
            wizardData.address = '';
        }

        buildSummary();
        nextStep();
    };

    const buildSummary = () => {
        const summaryContainer = document.getElementById('wizard-summary');
        summaryContainer.innerHTML = `
            <div class="summary-item">
                <span>Kurban Türü</span>
                <span>${wizardData.type}</span>
            </div>
            <div class="summary-item">
                <span>Seçilen Paket</span>
                <span>${wizardData.package}</span>
            </div>
            <div class="summary-item">
                <span>Vekalet Sahibi</span>
                <span>${wizardData.name} (${wizardData.phone})</span>
            </div>
            <div class="summary-item">
                <span>Teslimat Tercihi</span>
                <span>${wizardData.delivery}</span>
            </div>
            ${wizardData.address ? `
            <div class="summary-item">
                <span>Teslimat Adresi</span>
                <span>${wizardData.address}</span>
            </div>` : ''}
        `;
    };

    window.finishWizard = () => {
        const consent = document.getElementById('wizard-consent').checked;
        
        if (!consent) {
            alert('Lütfen bilgilerin doğruluğunu onayladığınızı belirten kutucuğu işaretleyiniz.');
            return;
        }

        // Build WhatsApp Message
        let message = `Selamun Aleyküm, Ön Kayıt oluşturmak istiyorum.\n\n`;
        message += `*Kurban Türü:* ${wizardData.type}\n`;
        message += `*Paket:* ${wizardData.package}\n`;
        message += `*Vekalet Sahibi:* ${wizardData.name}\n`;
        message += `*Telefon:* ${wizardData.phone}\n`;
        message += `*Teslimat:* ${wizardData.delivery}\n`;
        
        if(wizardData.address) {
            message += `*Adres:* ${wizardData.address}\n`;
        }
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '905072574034';
        const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        window.open(url, '_blank');
    };

    // Navigation Helpers
    window.nextStep = () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateWizardUI();
        }
    };

    window.prevStep = () => {
        if (currentStep > 1) {
            currentStep--;
            updateWizardUI();
        }
    };

    const updateWizardUI = () => {
        // Update Progress Bar
        const progressPercentage = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update Step Text
        stepText.innerText = currentStep;

        // Update Step Visibility
        wizardSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });

        // Smooth scroll to top of wizard
        const wizardSection = document.getElementById('wizard');
        const headerOffset = 100;
        const elementPosition = wizardSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    };


    // 5. Contact Form Handling
    const contactForm = document.getElementById('kurban-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            console.log("Form Submitted:", formData);

            // Premium success feedback
            const submitBtn = contactForm.querySelector('.btn-form-submit');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> GÖNDERİLİYOR...';
            lucide.createIcons();
            submitBtn.disabled = true;

            // Simulate server delay
            setTimeout(() => {
                submitBtn.style.background = '#28a745';
                submitBtn.innerHTML = '<i data-lucide="check"></i> BAŞARIYLA GÖNDERİLDİ';
                lucide.createIcons();
                
                // Clear form
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.style.background = '';
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    lucide.createIcons();
                }, 3000);
            }, 1500);
        });
    }
});
