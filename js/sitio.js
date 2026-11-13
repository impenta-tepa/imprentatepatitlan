'use strict';
const whatsapp = message => 'https://wa.me/523781011768?text=' + encodeURIComponent(message);
document.querySelectorAll('[data-wa]').forEach(link => {
  link.href = whatsapp(link.dataset.message || 'Hola, me gustaría cotizar un proyecto con Quad Print.');
  link.target = '_blank'; link.rel = 'noopener noreferrer';
});
document.getElementById('year').textContent = new Date().getFullYear();
const toggle = document.querySelector('.navbar-toggler');
const menu = document.getElementById('menu');
function setMenu(open, focusToggle = false) {
  menu.classList.toggle('show', open);
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  if (!open && focusToggle) toggle.focus();
}
const desktop = matchMedia('(min-width: 992px)');
desktop.addEventListener('change', e => { if (e.matches) setMenu(false); });
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('show')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('show')) setMenu(false, true);
});
document.addEventListener('click', e => {
  if (!menu.classList.contains('show') || menu.contains(e.target) || toggle.contains(e.target)) return;
  setMenu(false);
});
const gallery = document.getElementById('galeria');
const more = document.getElementById('ver-mas');
const status = document.getElementById('estado-galeria');
const viewer = document.getElementById('visor');
const fullImage = document.getElementById('imagen-ampliada');
const viewerTitle = document.getElementById('visor-titulo');
const consultLink = document.getElementById('consultar-promocion');
const originalImage = document.getElementById('abrir-original');
let viewerTrigger = null;
const promotions = (window.PROMOCIONES || []).filter(p => p.activa !== false);
const search = document.getElementById('buscar-ofertas');
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[_-]/g, ' ');
const title = promotion => promotion.archivo.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
let expanded = false;
let shown = 0;
function showBatch() {
  const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
  const matches = promotions.filter(p => terms.every(term => normalize(title(p)).includes(term)));
  const next = expanded || terms.length ? matches : matches.slice(0, 6);
  gallery.replaceChildren();
  shown = 0;
  next.forEach((promotion, offset) => {
    const number = shown + offset + 1;
    const path = 'promociones/' + encodeURIComponent(promotion.archivo);
    const thumbBase = 'derivados/promociones/' + encodeURIComponent(promotion.archivo);
    const thumbWebp = thumbBase + '-800.webp';
    const thumbJpg = thumbBase + '-800.jpg';
    const column = document.createElement('div'); column.className = 'col-12 col-sm-6 col-xl-4';
    const card = document.createElement('article'); card.className = 'promo-card';
    const name = title(promotion);
    const button = document.createElement('button'); button.className = 'promo-open'; button.type = 'button'; button.setAttribute('aria-label', 'Ampliar oferta: ' + name);
    const media = document.createElement('div'); media.className = 'promo-media';
    const picture = document.createElement('picture');
    const source = document.createElement('source'); source.type = 'image/webp'; source.srcset = thumbWebp;
    const img = document.createElement('img'); img.src = thumbJpg; img.alt = name; img.loading = 'lazy'; img.decoding = 'async';
    picture.append(source, img); media.append(picture); button.append(media);
    const query = whatsapp('Hola, me interesa esta promoción: ' + name + '. ¿Me comparten información?');
    const openViewer = trigger => {
      viewerTrigger = trigger;
      fullImage.src = path; fullImage.alt = name;
      viewerTitle.textContent = name;
      consultLink.href = query;
      originalImage.href = path;
      viewer.showModal();
    };
    button.addEventListener('click', () => openViewer(button));
    const footer = document.createElement('div'); footer.className = 'promo-footer';
    const zoom = document.createElement('button'); zoom.type = 'button'; zoom.className = 'promo-zoom'; zoom.textContent = 'Ver en grande ↗'; zoom.setAttribute('aria-label', 'Ver en grande: ' + name);
    zoom.addEventListener('click', () => openViewer(zoom));
    const link = document.createElement('a'); link.href = query; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Consultar por WhatsApp';
    footer.append(zoom, link); card.append(button, footer); column.append(card); gallery.append(column);
  });
  shown = next.length;
  const canToggle = !terms.length && matches.length > 6;
  more.hidden = !canToggle;
  more.setAttribute('aria-expanded', String(canToggle && expanded));
  more.replaceChildren(document.createTextNode(expanded ? 'Ver menos ' : 'Ver todas las ofertas '));
  const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = expanded ? '↑' : '↓'; more.append(arrow);
  status.textContent = !promotions.length ? 'Pronto tendremos nuevas ofertas. Escríbenos para cotizar.' : !matches.length ? 'No encontramos ofertas con ese nombre. Prueba otra palabra o escríbenos.' : terms.length ? matches.length + ' ofertas encontradas' : shown + ' de ' + promotions.length + ' ofertas';
}
more.addEventListener('click', () => {
  if (expanded) {
    expanded = false;
    showBatch();
    more.focus({ preventScroll: true });
    document.getElementById('promociones').scrollIntoView({ block: 'start' });
    return;
  }
  const firstNew = 6;
  expanded = true;
  showBatch();
  const firstNewCard = gallery.children[firstNew]?.querySelector('.promo-open');
  if (firstNewCard) {
    firstNewCard.focus({ preventScroll: true });
    firstNewCard.scrollIntoView({ block: 'center' });
  }
});
search.addEventListener('input', () => { expanded = false; showBatch(); });
document.getElementById('limpiar-busqueda').addEventListener('click', () => { search.value = ''; expanded = false; showBatch(); search.focus(); });
document.getElementById('cerrar-visor').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', e => { if (e.target === viewer) { const rect = viewer.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) viewer.close(); } });
viewer.addEventListener('close', () => { if (viewerTrigger) { viewerTrigger.focus(); viewerTrigger = null; } });
viewer.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusables = [...viewer.querySelectorAll('a[href],button:not([disabled])')];
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
showBatch();
