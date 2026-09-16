(() => {
  'use strict';

  /* ---------- DATA ---------- */
  const services = [
    { name: 'Exterior Detailing', desc: "Thorough exterior cleaning and finishing for a clean, polished appearance.", icon: 'car' },
    { name: 'Interior Detailing', desc: "Detailed interior cleaning and care for a fresh and comfortable cabin.", icon: 'seat' },
    { name: 'Paint Care', desc: "Care focused on improving the appearance and finish of your vehicle's paintwork.", icon: 'sparkle' },
    { name: 'Car Wash & Deep Clean', desc: "A detailed clean for vehicles that need more than a basic wash.", icon: 'droplet' },
    { name: 'Interior Deep Cleaning', desc: "Detailed cleaning of seats, carpets, surfaces and interior areas.", icon: 'brush' },
    { name: 'Premium Vehicle Detailing', desc: "A more comprehensive detailing option for customers looking for a refined finish.", icon: 'shield' },
  ];

  const galleryItems = [
    { title: 'Foam Wash Detail', cat: 'exterior', src: 'images/tintshine-01.jpg', alt: 'Vehicle covered in foam during a detailing wash' },
    { title: 'Exterior Foam Treatment', cat: 'exterior', src: 'images/tintshine-02.jpg', alt: 'Red Mustang covered in foam during a wash' },
    { title: 'Pressure Wash', cat: 'care', src: 'images/tintshine-03.jpg', alt: 'White sedan being pressure washed' },
    { title: 'Hand Wash Detailing', cat: 'care', src: 'images/tintshine-04.jpg', alt: 'Detailer hand-washing a black BMW' },
  ];

  const icons = {
    car: '<path d="M4 26 C4 18 10 12 20 12 C30 12 36 18 36 26" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M9 26 L11 20 C12 17 15 15 20 15 C25 15 28 17 29 20 L31 26" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="13" cy="27" r="2.2" fill="currentColor"/><circle cx="27" cy="27" r="2.2" fill="currentColor"/>',
    seat: '<path d="M12 30V16a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v14" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M12 30h16M10 30v3M30 30v3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    sparkle: '<path d="M20 6l2.6 8L30 17l-7.4 2.6L20 27l-2.6-7.4L10 17l7.4-3z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
    droplet: '<path d="M20 6c6 8 9 12.6 9 17a9 9 0 0 1-18 0c0-4.4 3-9 9-17z" stroke="currentColor" stroke-width="2.2" fill="none"/>',
    brush: '<path d="M27 8l5 5-13 13-6 1 1-6z" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linejoin="round"/>',
    shield: '<path d="M20 6l11 4v9c0 8-5 13-11 15-6-2-11-7-11-15v-9z" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linejoin="round"/>',
  };

  /* ---------- BUILD SERVICE CARDS ---------- */
  const servicesGrid = document.getElementById('servicesGrid');
  services.forEach(s => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="service-card__icon"><svg width="26" height="26" viewBox="0 0 40 40">${icons[s.icon]}</svg></div>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <a href="tel:+61456518763">Enquire Now
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>`;
    servicesGrid.appendChild(card);
  });

  /* ---------- BUILD GALLERY ---------- */
  const galleryGrid = document.getElementById('galleryGrid');
  galleryItems.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.dataset.cat = item.cat;
    el.dataset.index = i;
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `View image: ${item.title}`);
    el.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
      <div class="gallery-item__overlay">
        <span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/></svg>
          ${item.title}
        </span>
      </div>`;
    galleryGrid.appendChild(el);
  });

  /* ---------- GALLERY FILTERS ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.toggle('is-hidden', f !== 'all' && item.dataset.cat !== f);
      });
    });
  });

  /* ---------- LIGHTBOX ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxStage = document.getElementById('lightboxStage');
  let currentIndex = 0;

  function visibleItems() {
    return Array.from(document.querySelectorAll('.gallery-item:not(.is-hidden)'));
  }

  function openLightbox(idx) {
    const items = visibleItems();
    if (!items.length) return;
    currentIndex = idx;
    renderLightbox(items);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    document.getElementById('lightboxClose').focus();
  }

  function renderLightbox(items) {
    const el = items[currentIndex];
    const i = Number(el.dataset.index);
    const item = galleryItems[i];
    lightboxStage.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const items = visibleItems();
      const idx = items.indexOf(item);
      openLightbox(idx);
    });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); }
    });
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.getElementById('lightboxPrev').addEventListener('click', () => {
    const items = visibleItems();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    renderLightbox(items);
  });
  document.getElementById('lightboxNext').addEventListener('click', () => {
    const items = visibleItems();
    currentIndex = (currentIndex + 1) % items.length;
    renderLightbox(items);
  });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
  });

  // basic touch swipe on lightbox
  let touchStartX = null;
  lightboxStage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightboxStage.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      document.getElementById(dx > 0 ? 'lightboxPrev' : 'lightboxNext').click();
    }
    touchStartX = null;
  });

  /* ---------- NAVBAR ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 12);
  });

  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    burgerBtn.classList.toggle('is-open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burgerBtn.classList.remove('is-open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // active section indicator
  const navLinks = document.querySelectorAll('.navbar__links a');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  /* ---------- SCROLL CUE ---------- */
  document.getElementById('scrollCue').addEventListener('click', () => {
    document.querySelector('.trust-strip').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(open => {
        open.classList.remove('is-open');
        open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        open.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- QUOTE FORM VALIDATION ---------- */
  const form = document.getElementById('quoteForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const validators = {
    fullName: v => v.trim().length >= 2 || 'Please enter your full name.',
    phone: v => /^[+\d][\d\s()-]{6,}$/.test(v.trim()) || 'Please enter a valid phone number.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    service: v => v.trim().length > 0 || 'Please select a service.',
  };

  function validateField(name) {
    const field = form.elements[name];
    const errorEl = document.getElementById('err-' + name);
    if (!field || !validators[name]) return true;
    const result = validators[name](field.value);
    if (result === true) {
      field.classList.remove('is-invalid');
      if (errorEl) errorEl.textContent = '';
      return true;
    } else {
      field.classList.add('is-invalid');
      if (errorEl) errorEl.textContent = result;
      return false;
    }
  }

  Object.keys(validators).forEach(name => {
    const field = form.elements[name];
    if (field) field.addEventListener('blur', () => validateField(name));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const validations = Object.keys(validators).map(validateField);
    const allValid = validations.every(Boolean);

    formStatus.className = 'form-status';
    if (!allValid) {
      formStatus.classList.add('is-error');
      formStatus.textContent = 'Please fix the highlighted fields and try again.';
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    // No backend is connected in this build. Simulate a brief loading state,
    // then explain honestly that this form is not yet wired to send anywhere.
    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      formStatus.classList.add('is-error');
      formStatus.textContent = "This form isn't connected to send messages yet. Please call +61 456 518 763 or email bbsptyltd08@gmail.com directly — see README.md for how to connect this form.";
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 700);
  });
})();
