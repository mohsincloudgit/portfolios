/**
 * GSAP & LENIS ORCHESTRATION ENGINE
 * Smooth scrolling, scroll-triggered reveals, and micro-interactions
 */

(function initAnimations() {
  // 1. Lenis Smooth Scroll Engine
  let lenisInstance = null;
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. GSAP ScrollTrigger Integration
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    if (lenisInstance) {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Navbar Scroll Transition
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }

    // Hero Section Stagger
    gsap.from('.hero-info > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.14,
      ease: 'power3.out'
    });

    // Hero Avatar Stage Scale Entrance
    const avatarStage = document.getElementById('avatarStage') || document.getElementById('hudCard');
    if (avatarStage) {
      gsap.from(avatarStage, {
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        delay: 0.35,
        ease: 'power3.out'
      });
    }

    // Capability Pillar Cards ScrollTrigger
    gsap.utils.toArray('.tilt-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 45,
        opacity: 0,
        duration: 0.8,
        delay: (index % 3) * 0.12,
        ease: 'power2.out'
      });
    });

    // Project Cards ScrollTrigger
    gsap.utils.toArray('.project-showcase-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.85,
        delay: (index % 2) * 0.15,
        ease: 'power2.out'
      });
    });

    // Why Choose Us Feature Cards
    gsap.utils.toArray('.why-feature-box').forEach((box, index) => {
      gsap.from(box, {
        scrollTrigger: {
          trigger: box,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.75,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    // Score Donut Animated Numbers in Audit Section
    const scoreDonuts = document.querySelectorAll('.score-donut');
    scoreDonuts.forEach(donut => {
      ScrollTrigger.create({
        trigger: donut,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          let count = { val: 0 };
          gsap.to(count, {
            val: 100,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              donut.textContent = Math.round(count.val);
            }
          });
        }
      });
    });
  }

  // 3. Contact Form Submission Handler (Live Email Dispatch via FormSubmit to mohsincloudmail@gmail.com)
  const contactForm = document.getElementById('contactForm');
  const contactFormStatus = document.getElementById('contactFormStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('contactSubmitBtn') || contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      const nameInput = contactForm.querySelector('[name="name"]');
      const emailInput = contactForm.querySelector('[name="email"]');
      const inquiryInput = contactForm.querySelector('[name="inquiry_type"]');
      const messageInput = contactForm.querySelector('[name="message"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const inquiryType = inquiryInput ? inquiryInput.value : 'General Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showStatus('error', '⚠️ Please complete all required fields before sending.');
        return;
      }

      // Visual sending state
      submitBtn.innerHTML = '✦ Transmitting Protocol to Mohsin...';
      submitBtn.style.opacity = '0.75';
      submitBtn.disabled = true;
      if (contactFormStatus) contactFormStatus.style.display = 'none';

      try {
        const response = await fetch('https://formsubmit.co/ajax/mohsincloudmail@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            inquiry_type: inquiryType,
            message: message,
            _subject: `🚀 New Project Inquiry: ${name} — ${inquiryType}`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json();

        if (response.ok || data.success === 'true' || data.success === true) {
          submitBtn.innerHTML = '✔ Protocol Dispatched Successfully!';
          submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          submitBtn.style.opacity = '1';

          showStatus(
            'success',
            `<strong>✔ TRANSMISSION RECEIVED:</strong> Thank you, <strong>${escapeHtml(name)}</strong>! Your inquiry has been dispatched to <strong>mohsincloudmail@gmail.com</strong>. Mohsin will review your project details and follow up at <strong>${escapeHtml(email)}</strong> promptly.`
          );

          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 6000);
        } else if (data.message && data.message.toLowerCase().includes('activation')) {
          submitBtn.innerHTML = '📬 Check Inbox for Activation';
          submitBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
          submitBtn.style.opacity = '1';
          submitBtn.disabled = false;

          showStatus(
            'error',
            `<strong>📬 ONE-TIME ACTIVATION REQUIRED:</strong> FormSubmit has sent a confirmation email to <strong>mohsincloudmail@gmail.com</strong>. Please open your Gmail, click the <strong>"Activate Form"</strong> button, and your form will be 100% active forever!`
          );
        } else {
          throw new Error(data.message || 'Dispatch rejected');
        }
      } catch (err) {
        console.error('Contact Form Dispatch Error:', err);
        submitBtn.innerHTML = '⚠️ Transmission Delay — Direct Dispatch Available';
        submitBtn.style.background = 'linear-gradient(135deg, #ff2a54 0%, #990022 100%)';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        showStatus(
          'error',
          `<strong>⚠️ NOTICE:</strong> Direct API delivery encountered a network delay. You can dispatch directly to Mohsin at <a href="mailto:mohsincloudmail@gmail.com?subject=Project Inquiry - ${encodeURIComponent(name)}" style="color: #fff; text-decoration: underline; font-weight: 700;">mohsincloudmail@gmail.com</a> or WhatsApp <a href="https://wa.me/923302893269" target="_blank" style="color: #fff; text-decoration: underline; font-weight: 700;">+92 330-2893269</a>.`
        );
      }
    });

    function showStatus(type, htmlContent) {
      if (!contactFormStatus) return;
      contactFormStatus.className = `form-status-alert form-status-${type}`;
      contactFormStatus.innerHTML = htmlContent;
      contactFormStatus.style.display = 'block';
    }

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, function (m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
      });
    }
  }

  // ==========================================================================
  // 4. CYBERPUNK WELCOME PRELOADER CONTROLLER
  // ==========================================================================
  const preloader = document.getElementById('sitePreloader');
  const progressBar = document.getElementById('preloaderProgressBar');
  const percentageEl = document.getElementById('preloaderPercentage');
  const phaseEl = document.getElementById('preloaderPhase');
  const logTextEl = document.getElementById('preloaderLogText');

  if (preloader && progressBar && percentageEl) {
    let progress = 0;
    const telemetryPhases = [
      { at: 15, phase: 'CORE_BOOT // 15%', log: 'Loading Antigravity WebGL visualizer...' },
      { at: 40, phase: 'CRM_PIPELINES // 40%', log: 'Connecting GHL, HubSpot & EngageBay modules...' },
      { at: 70, phase: 'VOICE_AI // 70%', log: 'Synchronizing Vapi & ElevenLabs neural engines...' },
      { at: 92, phase: 'OPTIMIZING // 92%', log: 'Calibrating 100/100 Core Web Vitals telemetry...' },
      { at: 100, phase: 'SYSTEM READY // 100%', log: 'Access granted. Welcome to Muhammad Mohsin\'s Portfolio.' }
    ];

    const interval = setInterval(() => {
      // Accelerate smoothly towards 100
      const increment = Math.max(1, Math.floor(Math.random() * 8) + 4);
      progress = Math.min(100, progress + increment);

      progressBar.style.width = `${progress}%`;
      percentageEl.innerText = `${progress}%`;

      // Update telemetry messages based on progress thresholds
      for (let i = telemetryPhases.length - 1; i >= 0; i--) {
        if (progress >= telemetryPhases[i].at) {
          if (phaseEl) phaseEl.innerText = telemetryPhases[i].phase;
          if (logTextEl) logTextEl.innerText = telemetryPhases[i].log;
          break;
        }
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('loaded');
          // Once preloader finishes fading out, auto-trigger the eye-catching popup!
          setTimeout(() => {
            openContactPopup();
          }, 450);
        }, 300);
      }
    }, 45);
  }

  // ==========================================================================
  // 5. STRATEGY CALL POPUP MODAL CONTROLLER & EVENT LISTENERS
  // ==========================================================================
  const contactPopupModal = document.getElementById('contactPopupModal');
  const contactPopupClose = document.getElementById('contactPopupClose');
  const popupContactForm = document.getElementById('popupContactForm');
  const popupFormStatus = document.getElementById('popupFormStatus');
  const popupSubmitBtn = document.getElementById('popupSubmitBtn');

  window.openContactPopup = function () {
    if (!contactPopupModal) return;
    contactPopupModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus the first input after a slight delay
    setTimeout(() => {
      const nameInput = document.getElementById('popupName');
      if (nameInput) nameInput.focus();
    }, 200);
  };

  window.closeContactPopup = function () {
    if (!contactPopupModal) return;
    contactPopupModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (contactPopupClose) {
    contactPopupClose.addEventListener('click', closeContactPopup);
  }

  if (contactPopupModal) {
    contactPopupModal.addEventListener('click', (e) => {
      if (e.target === contactPopupModal) {
        closeContactPopup();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactPopupModal.classList.contains('active')) {
        closeContactPopup();
      }
    });
  }

  // Bind all CTA buttons with class .open-popup-trigger across all sections
  document.querySelectorAll('.open-popup-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactPopup();
    });
  });

  // Popup Form Submission Handler (Live Email Dispatch via FormSubmit)
  if (popupContactForm) {
    popupContactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalBtnText = popupSubmitBtn.innerHTML;

      const name = popupContactForm.querySelector('[name="name"]').value.trim();
      const email = popupContactForm.querySelector('[name="email"]').value.trim();
      const phone = popupContactForm.querySelector('[name="phone"]')?.value.trim() || 'N/A';
      const inquiryType = popupContactForm.querySelector('[name="inquiry_type"]').value;
      const message = popupContactForm.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        showPopupStatus('error', '⚠️ Please complete all required fields.');
        return;
      }

      popupSubmitBtn.innerHTML = '✦ Transmitting Protocol to Mohsin...';
      popupSubmitBtn.style.opacity = '0.75';
      popupSubmitBtn.disabled = true;
      if (popupFormStatus) popupFormStatus.style.display = 'none';

      try {
        const response = await fetch('https://formsubmit.co/ajax/mohsincloudmail@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            inquiry_type: inquiryType,
            message: message,
            _subject: `🔥 Priority Strategy Call Request: ${name} (${inquiryType})`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json();

        if (response.ok || data.success === 'true' || data.success === true) {
          popupSubmitBtn.innerHTML = '✔ Strategy Request Dispatched!';
          popupSubmitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          popupSubmitBtn.style.opacity = '1';

          showPopupStatus(
            'success',
            `<strong>✔ TRANSMISSION RECEIVED:</strong> Thank you, <strong>${escapeHtml(name)}</strong>! Your priority discovery request has been delivered to <strong>mohsincloudmail@gmail.com</strong>. Mohsin will reach out to <strong>${escapeHtml(email)}</strong> promptly!`
          );

          popupContactForm.reset();

          setTimeout(() => {
            closeContactPopup();
            popupSubmitBtn.innerHTML = originalBtnText;
            popupSubmitBtn.style.background = '';
            popupSubmitBtn.disabled = false;
          }, 3500);
        } else if (data.message && data.message.toLowerCase().includes('activation')) {
          popupSubmitBtn.innerHTML = '📬 Check Inbox for Activation';
          popupSubmitBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
          popupSubmitBtn.disabled = false;
          popupSubmitBtn.style.opacity = '1';

          showPopupStatus(
            'error',
            `<strong>📬 ACTIVATION NOTICE:</strong> FormSubmit sent an activation email to <strong>mohsincloudmail@gmail.com</strong>. Click "Activate Form" in your inbox to complete setup!`
          );
        } else {
          throw new Error(data.message || 'Dispatch rejected');
        }
      } catch (err) {
        console.error('Popup Form Dispatch Error:', err);
        popupSubmitBtn.innerHTML = '⚠️ Transmission Delay — Direct Dispatch Available';
        popupSubmitBtn.style.background = 'linear-gradient(135deg, #ff2a54 0%, #990022 100%)';
        popupSubmitBtn.disabled = false;
        popupSubmitBtn.style.opacity = '1';

        showPopupStatus(
          'error',
          `<strong>⚠️ NOTICE:</strong> Direct API delivery encountered a network delay. You can email Mohsin directly at <a href="mailto:mohsincloudmail@gmail.com?subject=Discovery Session - ${encodeURIComponent(name)}" style="color: #fff; text-decoration: underline; font-weight: 700;">mohsincloudmail@gmail.com</a> or WhatsApp <a href="https://wa.me/923302893269" target="_blank" style="color: #fff; text-decoration: underline; font-weight: 700;">+92 330-2893269</a>.`
        );
      }
    });

    function showPopupStatus(type, htmlContent) {
      if (!popupFormStatus) return;
      popupFormStatus.className = `form-status-alert form-status-${type}`;
      popupFormStatus.innerHTML = htmlContent;
      popupFormStatus.style.display = 'block';
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }
})();

