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

  // 3. Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '✦ Transmitting Protocol...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '✔ Protocol Dispatched Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        submitBtn.style.opacity = '1';

        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 4000);
      }, 1200);
    });
  }
})();
