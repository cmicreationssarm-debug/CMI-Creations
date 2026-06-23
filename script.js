/* ═══════════════════════════════════════════════════════════
   CMI Creations — script.js
═══════════════════════════════════════════════════════════ */

/* ── Catalog Data ── */
const catalog = {
  bodas: [
    {
      url:   'https://legendary-mandazi-fc228a.netlify.app/',
      title: 'Boda Romántica Floral',
      desc:  'Diseño elegante con detalles florales y paleta crema y burdeos.',
      emoji: '🌹',
      color: 'linear-gradient(135deg, #F5E6E8 0%, #DDD6F3 100%)'
    },
    {
      url:   'https://calm-kheer-20e9c4.netlify.app/',
      title: 'Boda Clásica Dorada',
      desc:  'Invitación sofisticada con toques dorados y tipografía elegante.',
      emoji: '💍',
      color: 'linear-gradient(135deg, #FFF8E7 0%, #F0D9A0 100%)'
    },
    {
      url:   'https://sage-buttercream-9c0b69.netlify.app/',
      title: 'Boda Natural Sage',
      desc:  'Estilo moderno con tonos naturales y diseño minimalista chic.',
      emoji: '🌿',
      color: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
    }
  ],
  xv: [
    {
      url:   'https://super-paprenjak-1eb26f.netlify.app/',
      title: 'XV Años Rosa Brillante',
      desc:  'Diseño vibrante con colores brillantes para una quinceañera especial.',
      emoji: '👑',
      color: 'linear-gradient(135deg, #FCE4EC 0%, #F48FB1 100%)'
    },
    {
      url:   'https://sensational-starship-57e058.netlify.app/',
      title: 'XV Años Sensacional',
      desc:  'Invitación dinámica e interactiva para una celebración de ensueño.',
      emoji: '✨',
      color: 'linear-gradient(135deg, #EDE7F6 0%, #CE93D8 100%)'
    }
  ]
};

/* ── All items flat list for Featured section ── */
const allFeatured = [
  ...catalog.bodas.map(i => ({ ...i, category: 'BODA' })),
  ...catalog.xv.map(i   => ({ ...i, category: 'XV AÑOS' }))
];

/* ══════════════════════════════════
   FEATURED GRID (Plantillas Destacadas)
══════════════════════════════════ */
function buildFeaturedGrid() {
  const container = document.getElementById('featuredGrid');
  if (!container) return;

  container.innerHTML = '';

  allFeatured.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'featured-card';

    card.innerHTML = `
      <div class="featured-card-preview" style="background: ${item.color}">
        <div class="featured-card-badge">${item.category}</div>
        <div class="featured-iframe-wrapper">
          <iframe
            src="${item.url}"
            title="${item.title}"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            scrolling="no"
            tabindex="-1"
          ></iframe>
          <div class="featured-iframe-overlay" data-url="${item.url}" data-title="${item.title}">
            <div class="featured-hover-cta">
              <span>👁 Ver vista previa</span>
            </div>
          </div>
        </div>
      </div>
      <div class="featured-card-info">
        <div class="featured-card-emoji">${item.emoji}</div>
        <div class="featured-card-title">${item.title}</div>
        <div class="featured-card-desc">${item.desc}</div>
        <div class="featured-card-actions">
          <button class="featured-btn-preview" data-url="${item.url}" data-title="${item.title}">
            👁 Vista previa
          </button>
          <a href="https://wa.me/527701864491?text=Hola! Me interesa este diseño: ${encodeURIComponent(item.title)} - ${encodeURIComponent(item.url)}"
             target="_blank" rel="noopener" class="featured-btn-cotizar">
            💬 Cotizar
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach click events to overlay + button
  container.querySelectorAll('[data-url]').forEach(el => {
    el.addEventListener('click', () => openModal(el.dataset.url, el.dataset.title));
  });
}

/* ══════════════════════════════════
   PREVIEW MODAL
══════════════════════════════════ */
function openModal(url, title) {
  const modal   = document.getElementById('previewModal');
  const iframe  = document.getElementById('modalIframe');
  const titleEl = document.getElementById('modalTitle');
  const openBtn = document.getElementById('modalOpenBtn');
  const cotizar = document.getElementById('modalCotizarBtn');

  iframe.src          = url;
  titleEl.textContent = title;
  openBtn.href        = url;
  cotizar.href        = `https://wa.me/527701864491?text=Hola! Quiero un diseño así: ${encodeURIComponent(title)} - ${encodeURIComponent(url)}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal  = document.getElementById('previewModal');
  const iframe = document.getElementById('modalIframe');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { iframe.src = ''; }, 300);
}

function initModal() {
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalBackdrop')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ══════════════════════════════════
   CATALOG GRIDS (por categoría)
══════════════════════════════════ */
function buildCatalogGrid(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'catalog-item';
    card.style.animationDelay = `${i * 0.1}s`;

    card.innerHTML = `
      <div class="catalog-item-preview" style="background: ${item.color}">
        <div class="preview-overlay">
          <span class="preview-emoji">${item.emoji}</span>
          <div class="preview-iframe-wrapper">
            <iframe
              src="${item.url}"
              title="${item.title}"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              scrolling="no"
              tabindex="-1"
            ></iframe>
          </div>
          <div class="preview-hover-cta">
            <span>👁 Vista previa</span>
          </div>
        </div>
      </div>
      <div class="catalog-item-info">
        <div class="catalog-item-title">${item.title}</div>
        <div class="catalog-item-desc">${item.desc}</div>
        <div class="catalog-item-actions">
          <a href="${item.url}" target="_blank" rel="noopener" class="catalog-item-cta btn-ver">
            Ver invitación →
          </a>
          <a href="https://wa.me/527701864491?text=Hola! Quiero un diseño así: ${encodeURIComponent(item.title)} - ${encodeURIComponent(item.url)}"
             target="_blank" rel="noopener" class="catalog-item-cta btn-cotizar">
            💬 Pedir por WhatsApp
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function initCatalogs() {
  buildCatalogGrid('bodas-grid', catalog.bodas);
  buildCatalogGrid('xv-grid',    catalog.xv);
}

/* ── Navbar Scroll Effect ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(l => {
      const href = l.getAttribute('href') || '';
      l.classList.toggle('active', href === `#${current}`);
    });
  }, { passive: true });
}

/* ── Hamburger Menu ── */
function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    document.getElementById('navbar').classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    btn.querySelectorAll('span').forEach((s, i) => {
      if (open) {
        if (i === 0) s.style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (i === 1) s.style.opacity   = '0';
        if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        s.style.transform = '';
        s.style.opacity   = '';
      }
    });
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      document.getElementById('navbar').classList.remove('menu-open');
      btn.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
      btn.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });
}

/* ── Back To Top ── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── AOS (Animate on Scroll) ── */
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('aos-animated');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ── Card Entrance Animation ── */
function initCatalogObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.catalog-item, .featured-card').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
    obs.observe(el);
  });
}

/* ── Contact Form ── */
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre  = form.nombre.value.trim();
    const evento  = form.evento.value;
    const mensaje = form.mensaje.value.trim();
    const text = `Hola CMI Creations! 👋\n\nNombre: ${nombre}\nEvento: ${evento}\n\n${mensaje}`;
    window.open(`https://wa.me/527701864491?text=${encodeURIComponent(text)}`, '_blank');
  });
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
}

/* ── Category Cards Hover ── */
function initCategoryCards() {
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.04)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ══════════════════════════════════
   INIT ALL
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildFeaturedGrid();      // Plantillas destacadas con iframes reales
  initModal();              // Modal de vista previa
  initCatalogs();           // Grids de catálogo por categoría
  initNavbar();             // Scroll + active link states
  initHamburger();          // Menú móvil
  initBackToTop();          // Botón ↑
  initAOS();                // Animaciones al hacer scroll
  initForm();               // Formulario → WhatsApp
  initSmoothScroll();       // Scroll suave en anclas
  initCategoryCards();      // Hover en tarjetas de categoría

  setTimeout(initCatalogObserver, 150);
});
