/* ===== 1. Mobile menu toggle ===== */
const menuBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

function setMenu(open) {
  if (!navLinks || !menuBtn) return;
  navLinks.classList.toggle('open', open);
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
}

navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => {
  if (window.innerWidth > 992) setMenu(false);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') setMenu(false);
});

/* ===== 2. Header style on scroll ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

/* ===== 3. Highlight active nav link for the section in view ===== */
const sections = document.querySelectorAll('main section[id]');
const links = navLinks.querySelectorAll('a:not(.btn)');
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

/* ===== 4. Typing effect ===== */
const roles = ['Frontend Developer', 'UI/UX Designer', 'Full Stack Developer'];
const typedEl = document.getElementById('typed');
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const word = roles[roleIdx];
  charIdx += deleting ? -1 : 1;
  typedEl.textContent = word.slice(0, charIdx);

  let delay = deleting ? 50 : 100;
  if (!deleting && charIdx === word.length) { deleting = true; delay = 1500; }      // pause at full word
  else if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 400; }
  setTimeout(type, delay);
}
type();

/* ===== 5. Portfolio filter ===== */
const filterBtns = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  projects.forEach(p => {
    const match = f === 'all' || p.dataset.category === f;
    p.classList.toggle('hide', !match);
    p.classList.toggle('show', match);
  });
}));

/* ===== 7. Footer year ===== */
document.getElementById('year').textContent = new Date().getFullYear();
