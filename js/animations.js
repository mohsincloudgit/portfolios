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
})();
