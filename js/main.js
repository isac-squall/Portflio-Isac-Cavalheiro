/* ===== NAVIGATION ===== */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

/* ===== SCROLL HEADER ===== */
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (link && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);

/* ===== SCROLL TO TOP ===== */
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== FADE IN ANIMATIONS ===== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.servico__card, .portfolio__card, .depoimento__card, .preco__card, .timeline__item'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* ===== SKILL BARS ANIMATION ===== */
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill__fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsList = document.querySelector('.skills__list');
if (skillsList) {
  skillsObserver.observe(skillsList);
}

/* ===== CONTACT FORM → WHATSAPP ===== */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  const texto = `Olá Isac! Meu nome é ${nome} (${email}).\n\n${mensagem}`;
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(texto)}`;

  window.open(whatsappUrl, '_blank');
  contactForm.reset();
});

/* ===== WHATSAPP NUMBER ===== */
// Substitua 5511999999999 pelo seu número real no index.html e aqui
// Formato: código do país + DDD + número (sem espaços ou traços)
// Exemplo Osasco/SP: 5511XXXXXXXXX
