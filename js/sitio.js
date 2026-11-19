'use strict';

/* =========================================================
   Quad Print Tepatitlán — interacciones
   Sin dependencias. Menú, catálogo, visor y cotización.
   ========================================================= */

const WA_NUMBER = '5213781097423';
const WA_DEFAULT = 'Hola, quiero cotizar un proyecto con Quad Print.';
const waLink = mensaje => 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(mensaje);

/* Año del pie */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* ---------- Estado del negocio: abierto / cerrado ---------- */
const estadoNegocio = document.getElementById('estado-negocio');
const estadoTexto = document.getElementById('estado-texto');

const HORARIO = {
  0: [],
  1: [[600, 840], [960, 1200]],
  2: [[600, 840], [960, 1200]],
  3: [[600, 840], [960, 1200]],
  4: [[600, 840], [960, 1200]],
  5: [[600, 840], [960, 1200]],
  6: [[600, 840]]
};
const NOMBRE_DIA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const dosDigitos = n => String(n).padStart(2, '0');
const aHora = minutos => dosDigitos(Math.floor(minutos / 60)) + ':' + dosDigitos(minutos % 60);

function actualizarEstado() {
  if (!estadoNegocio || !estadoTexto) return;

  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Mexico_City',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date());

  const dato = tipo => (partes.find(parte => parte.type === tipo) || {}).value || '';
  const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const hoy = dias[dato('weekday')];
  const ahora = Number(dato('hour')) * 60 + Number(dato('minute'));
  const tramosHoy = HORARIO[hoy] || [];
  const tramoAbierto = tramosHoy.find(([inicio, fin]) => ahora >= inicio && ahora < fin);

  estadoNegocio.classList.toggle('is-open', Boolean(tramoAbierto));
  estadoNegocio.classList.toggle('is-closed', !tramoAbierto);

  if (tramoAbierto) {
    estadoTexto.textContent = 'Abierto ahora · cierra ' + aHora(tramoAbierto[1]);
    return;
  }

  for (let salto = 0; salto <= 7; salto++) {
    const dia = (hoy + salto) % 7;
    const tramo = (HORARIO[dia] || []).find(([inicio]) => salto > 0 || inicio > ahora);
    if (!tramo) continue;
    const cuando = salto === 0 ? 'hoy' : salto === 1 ? 'mañana' : 'el ' + NOMBRE_DIA[dia];
    estadoTexto.textContent = 'Cerrado · abre ' + cuando + ' ' + aHora(tramo[0]);
    return;
  }
}

actualizarEstado();
setInterval(actualizarEstado, 60000);

/* Todos los enlaces de WhatsApp se construyen desde un solo número. */
document.querySelectorAll('[data-wa]').forEach(enlace => {
  enlace.href = waLink(enlace.dataset.message || WA_DEFAULT);
  enlace.target = '_blank';
  enlace.rel = 'noopener noreferrer';
});

/* ---------- Menú móvil ---------- */
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

function setMenu(abierto, devolverFoco = false) {
  if (!toggle || !menu) return;
  menu.classList.toggle('is-open', abierto);
  toggle.classList.toggle('is-open', abierto);
  document.body.classList.toggle('menu-open', abierto);
  toggle.setAttribute('aria-expanded', String(abierto));
  toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  if (!abierto && devolverFoco) toggle.focus();
}

if (toggle && menu) {
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach(enlace => enlace.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', evento => {
    if (evento.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false, true);
  });

  document.addEventListener('click', evento => {
    if (!menu.classList.contains('is-open')) return;
    if (menu.contains(evento.target) || toggle.contains(evento.target)) return;
    setMenu(false);
  });

  const escritorio = window.matchMedia('(min-width: 961px)');
  escritorio.addEventListener('change', evento => {
    if (evento.matches) setMenu(false);
  });
}

/* Sombra del header al hacer scroll */
const header = document.querySelector('.site-header');
const actualizarHeader = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
};
actualizarHeader();
window.addEventListener('scroll', actualizarHeader, { passive: true });

/* ---------- Catálogo ---------- */
const galeria = document.getElementById('galeria');
const destacadosGrid = document.getElementById('destacados-grid');
const buscador = document.getElementById('buscar');
const filtros = document.getElementById('filtros');
const estado = document.getElementById('estado');
const verMas = document.getElementById('ver-mas');

const promociones = (window.PROMOCIONES || []).filter(promocion => promocion.activa !== false);
const metadatos = window.CATALOGO || {};
const categorias = window.CATEGORIAS || [{ id: 'todas', nombre: 'Todas' }];

const normalizar = valor => String(valor)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[_-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const variantes = palabra => {
  const formas = [palabra];
  if (palabra.length > 4 && palabra.endsWith('s')) {
    formas.push(palabra.slice(0, -1));
    if (palabra.endsWith('es')) formas.push(palabra.slice(0, -2));
  }
  return formas;
};

const tituloDesdeArchivo = archivo => archivo
  .replace(/\.[^.]+$/, '')
  .replace(/[_-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const nombreCategoria = id => {
  const encontrada = categorias.find(categoria => categoria.id === id);
  return encontrada ? encontrada.nombre : 'Promociones';
};

const escapar = valor => String(valor).replace(/[&<>"']/g, caracter => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[caracter]));

const productos = promociones.map((promocion, indice) => {
  const meta = metadatos[promocion.archivo] || {};
  const titulo = meta.titulo || tituloDesdeArchivo(promocion.archivo);
  const categoria = meta.categoria || 'otros';
  return {
    ...promocion,
    titulo,
    categoria,
    categoriaNombre: nombreCategoria(categoria),
    descripcion: meta.descripcion || '',
    destacado: Boolean(meta.destacado),
    orden: Number.isFinite(meta.orden) ? meta.orden : 1000 + indice
  };
}).sort((a, b) => a.orden - b.orden || a.titulo.localeCompare(b.titulo, 'es'));

let categoriaActiva = 'todas';
let consulta = '';
let expandido = false;
const VISIBLES_INICIALES = 9;

const coincidencias = () => {
  const terminos = normalizar(consulta).split(' ').filter(Boolean);
  return productos.filter(producto => {
    if (categoriaActiva !== 'todas' && producto.categoria !== categoriaActiva) return false;
    if (!terminos.length) return true;
    const texto = normalizar([
      producto.titulo,
      producto.descripcion,
      producto.categoriaNombre,
      producto.archivo
    ].join(' '));
    return terminos.every(termino => variantes(termino).some(forma => texto.includes(forma)));
  });
};

const tarjeta = producto => {
  const archivo = encodeURIComponent(producto.archivo);
  const miniaturaWebp = 'derivados/promociones/' + archivo + '-800.webp';
  const miniaturaJpg = 'derivados/promociones/' + archivo + '-800.jpg';
  const mensaje = waLink('Hola, me interesa esta promoción: ' + producto.titulo + '. ¿Me comparten información?');
  const titulo = escapar(producto.titulo);
  const descripcion = escapar(producto.descripcion);
  return `
    <article class="promo-card" data-file="${escapar(producto.archivo)}">
      <button class="promo-open" type="button" aria-label="Ampliar promoción: ${titulo}">
        <picture>
          <source type="image/webp" srcset="${miniaturaWebp}">
          <img src="${miniaturaJpg}" alt="${titulo}" loading="lazy" decoding="async">
        </picture>
      </button>
      <div class="promo-body">
        <span class="promo-kicker">${escapar(producto.categoriaNombre)}</span>
        <h3 class="promo-title">${titulo}</h3>
        <p class="promo-desc">${descripcion}</p>
        <div class="promo-actions">
          <button class="promo-zoom" type="button" aria-label="Ver en grande: ${titulo}">Ver en grande</button>
          <a href="${escapar(mensaje)}" target="_blank" rel="noopener noreferrer">Consultar ↗</a>
        </div>
      </div>
    </article>`;
};

const pintarDestacados = () => {
  if (!destacadosGrid) return;
  const seleccion = productos.filter(producto => producto.destacado).slice(0, 4);
  if (!seleccion.length) {
    document.getElementById('promociones')?.setAttribute('hidden', '');
    return;
  }
  destacadosGrid.innerHTML = seleccion.map(tarjeta).join('');
};

const pintarFiltros = () => {
  if (!filtros) return;
  filtros.innerHTML = categorias.map(categoria => `
    <button class="filter${categoria.id === categoriaActiva ? ' is-active' : ''}" type="button"
      data-category="${escapar(categoria.id)}" aria-pressed="${categoria.id === categoriaActiva}">
      ${escapar(categoria.nombre)}
    </button>`).join('');
};

const pintarCatalogo = () => {
  if (!galeria) return;
  const resultados = coincidencias();
  const mostrandoFiltro = Boolean(normalizar(consulta)) || categoriaActiva !== 'todas';
  const visibles = expandido || mostrandoFiltro ? resultados : resultados.slice(0, VISIBLES_INICIALES);

  galeria.innerHTML = visibles.map(tarjeta).join('');

  if (estado) {
    if (!resultados.length) {
      estado.textContent = 'No encontramos promociones con ese nombre. Prueba otra palabra o escríbenos por WhatsApp.';
    } else if (mostrandoFiltro) {
      estado.textContent = resultados.length + (resultados.length === 1 ? ' promoción encontrada' : ' promociones encontradas');
    } else {
      estado.textContent = visibles.length + ' de ' + resultados.length + ' promociones';
    }
  }

  if (verMas) {
    const puedeAlternar = !mostrandoFiltro && resultados.length > VISIBLES_INICIALES;
    verMas.hidden = !puedeAlternar;
    verMas.setAttribute('aria-expanded', String(expandido && puedeAlternar));
    verMas.textContent = expandido ? 'Ver menos promociones' : 'Ver todas las promociones';
  }
};

const abrirVisor = (archivo, disparador) => {
  const visor = document.getElementById('visor');
  const tituloVisor = document.getElementById('visor-titulo');
  const imagen = document.getElementById('imagen-ampliada');
  const fuenteWebp = document.getElementById('visor-webp');
  const original = document.getElementById('abrir-original');
  const consultar = document.getElementById('consultar-promocion');
  const producto = productos.find(item => item.archivo === archivo);
  if (!visor || !imagen || !producto) return;

  const codificado = encodeURIComponent(producto.archivo);
  const titulo = producto.titulo;

  if (tituloVisor) tituloVisor.textContent = titulo;
  if (fuenteWebp) fuenteWebp.srcset = 'derivados/promociones/' + codificado + '-1600.webp';
  imagen.src = 'derivados/promociones/' + codificado + '-1600.jpg';
  imagen.alt = 'Promoción ampliada: ' + titulo;
  if (original) original.href = 'promociones/' + codificado;
  if (consultar) consultar.href = waLink('Hola, me interesa esta promoción: ' + titulo + '. ¿Me comparten información?');

  visor.dataset.trigger = '';
  if (disparador) {
    visor._disparador = disparador;
  }
  if (!visor.open) visor.showModal();
};

const conectarGaleria = contenedor => {
  if (!contenedor) return;
  contenedor.addEventListener('click', evento => {
    const disparador = evento.target.closest('.promo-open, .promo-zoom');
    if (!disparador) return;
    const tarjeta = disparador.closest('[data-file]');
    if (tarjeta) abrirVisor(tarjeta.dataset.file, disparador);
  });
};

/* Visor */
const visor = document.getElementById('visor');
const cerrarVisor = document.getElementById('cerrar-visor');
if (visor) {
  cerrarVisor?.addEventListener('click', () => visor.close());
  visor.addEventListener('click', evento => {
    if (evento.target === visor) visor.close();
  });
  visor.addEventListener('close', () => {
    if (visor._disparador && typeof visor._disparador.focus === 'function') {
      visor._disparador.focus();
    }
    visor._disparador = null;
  });
}

/* Eventos del catálogo */
if (buscador) {
  buscador.addEventListener('input', () => {
    consulta = buscador.value;
    if (expandido) expandido = false;
    pintarCatalogo();
  });
}

if (verMas) {
  verMas.addEventListener('click', () => {
    expandido = !expandido;
    pintarCatalogo();
  });
}

if (filtros) {
  filtros.addEventListener('click', evento => {
    const boton = evento.target.closest('[data-category]');
    if (!boton) return;
    categoriaActiva = boton.dataset.category;
    expandido = false;
    pintarFiltros();
    pintarCatalogo();
  });
}

/* ---------- Formulario de cotización ---------- */
const formulario = document.getElementById('quoteForm');
if (formulario) {
  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    const servicio = document.getElementById('quoteService');
    const cantidad = document.getElementById('quoteQty');
    const fecha = document.getElementById('quoteDate');
    const detalles = document.getElementById('quoteDetails');
    if (!servicio || !servicio.value.trim()) {
      servicio?.focus();
      return;
    }

    const lineas = [
      'Hola, quiero cotizar un proyecto con Quad Print.',
      '',
      'Servicio: ' + servicio.value.trim()
    ];
    if (cantidad?.value.trim()) lineas.push('Cantidad: ' + cantidad.value.trim());
    if (fecha?.value.trim()) lineas.push('Fecha aproximada: ' + fecha.value.trim());
    if (detalles?.value.trim()) lineas.push('Detalles: ' + detalles.value.trim());
    lineas.push('', '¿Me pueden ayudar?');

    window.open(waLink(lineas.join('\n')), '_blank', 'noopener');
  });
}

/* ---------- Arranque ---------- */
pintarFiltros();
pintarDestacados();
pintarCatalogo();
conectarGaleria(destacadosGrid);
conectarGaleria(galeria);
