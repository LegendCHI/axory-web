/* =====================
   AXORY – Main JS
===================== */

/* ---------- Reveal on Scroll ---------- */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach(el => revealObserver.observe(el));

/* ---------- Smooth Scroll ---------- */
document.querySelectorAll('a.scroll').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ---------- Modal Projects ---------- */
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close');

const projectsData = {
  rp: `
    <h2>Nova State Roleplay</h2>
    <p>
      Proyecto integral para servidor de rol serio. AXORY desarrolló la web oficial,
      sistema de whitelist, panel administrativo y automatizaciones conectadas a Discord.
    </p>
    <ul>
      <li>Web optimizada</li>
      <li>Sistema de postulación</li>
      <li>Panel staff</li>
      <li>Diseño UI personalizado</li>
    </ul>
  `,
  ui: `
    <h2>Interfaces & UI</h2>
    <p>Diseños modernos enfocados en usabilidad y estética premium.</p>
  `,
  tools: `
    <h2>Scripts & Tools</h2>
    <p>Herramientas y automatizaciones personalizadas para comunidades digitales.</p>
  `
};

document.querySelectorAll('.project').forEach(card => {
  card.addEventListener('click', () => {
    modalBody.innerHTML = projectsData[card.dataset.project] || '';
    modal.classList.add('show');
  });
});

closeBtn?.addEventListener('click', () => {
  modal.classList.remove('show');
});

window.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('show');
});

/* ---------- Discord Widget Counter ---------- */
/*
  👉 PEGA AQUÍ TU ENLACE DEL WIDGET
  Ejemplo:
  https://discord.com/api/guilds/XXXXXXXXXXXXXXX/widget.json
*/

const DISCORD_WIDGET_URL =
  'https://discord.com/api/guilds/1459280630562160887/widget.json';

fetch(DISCORD_WIDGET_URL)
  .then(res => res.json())
  .then(data => {
    document.getElementById('discordCount').innerText =
      data.presence_count ?? '—';
  })
  .catch(err => {
    console.warn('Discord widget error:', err);
    document.getElementById('discordCount').innerText = '—';
  });

  /* ---------- Card Glow Follow ---------- */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});
