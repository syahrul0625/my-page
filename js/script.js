<<<<<<< HEAD
/* ============================================
   PORTFOLIO — SCRIPT.JS
   All interactive functionality
   ============================================ */

(function () {
  'use strict';

  /* ── NAVBAR ── */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) closeMenu();
  });

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ── ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id], div[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  /* ── TYPING ANIMATION ── */
  const typingEl = document.getElementById('typingText');
  const phrases = [
    'Membangun solusi digital berdasarkan pemahaman proses bisnis nyata.',
    'Dari gudang ke kode — perspektif yang membuat perbedaan.',
    'AI-assisted developer dengan pengalaman operasional retail.',
    'Problem solver yang memahami sisi bisnis dan teknologi.',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function typeText() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 35 : 60;

    if (!isDeleting && charIndex === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    typingTimeout = setTimeout(typeText, delay);
  }

  // Start after hero animation settles
  setTimeout(typeText, 900);


  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for sibling elements
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.querySelectorAll('.reveal'))
            : [];
          const siblingIndex = siblings.indexOf(entry.target);
          const delay = siblingIndex >= 0 ? Math.min(siblingIndex * 80, 320) : 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── COUNTER ANIMATION ── */
  const counterEls = document.querySelectorAll('.stat-num[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach(el => counterObserver.observe(el));


  /* ── SKILL BAR ANIMATION ── */
  const skillFills = document.querySelectorAll('.skill-fill[data-width]');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width + '%';
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillFills.forEach(el => skillObserver.observe(el));


  /* ── CONTACT FORM ── */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showStatus('error', 'Mohon isi semua field sebelum mengirim.');
        return;
      }

      if (!isValidEmail(email)) {
        showStatus('error', 'Format email tidak valid.');
        return;
      }

      // Simulate send (replace with actual endpoint / EmailJS / formspree)
      const btnText = submitBtn.querySelector('.btn-text');
      submitBtn.disabled = true;
      btnText.textContent = 'Mengirim...';

      setTimeout(() => {
        showStatus('success', '✓ Pesan berhasil dikirim! Saya akan membalas secepatnya.');
        contactForm.reset();
        submitBtn.disabled = false;
        btnText.textContent = 'Kirim Pesan';
      }, 1400);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    setTimeout(() => {
      formStatus.className = 'form-status';
    }, 6000);
  }


  /* ── SMOOTH SCROLL (fallback for older browsers) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── BACK TO TOP ── */
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    if (backTop) {
      backTop.style.opacity = window.scrollY > 400 ? '1' : '0.3';
    }
  }, { passive: true });


  /* ── KEYBOARD NAVIGATION ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ── PREFERS REDUCED MOTION ── */
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (mq.matches) {
    clearTimeout(typingTimeout);
    // Show first phrase statically
    if (typingEl) typingEl.textContent = phrases[0];
    // Skip stagger delays for reveal
    revealEls.forEach(el => el.classList.add('visible'));
  }

})();
=======
fetch('../../footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
})
.catch(error => console.error('Error fetching footer.html:', error));

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {    
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

let indexJob = 1;
setInterval(animateJob, 1500);

function animateJob() {
    const job = ['Software Engineer','Android Developer','Web Developer'];
    let span = document.querySelector('.job-text');

    span.textContent = job[indexJob];
    indexJob++;
    if (indexJob==3) {
        indexJob=0;
    }
    
}

ScrollReveal({ 
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200 
});

ScrollReveal().reveal('.home-content, .heading, .features-content img', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form, .contact-content, .paragraph', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img, .features h3', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content, .features p', { origin: 'right' });
>>>>>>> e90af36d7d75cd1faf6eefb601e27f2475e86251
