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

    window.selectKurban = (type) => {
        console.log("Selected:", type);
        nextStep();
    };

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
