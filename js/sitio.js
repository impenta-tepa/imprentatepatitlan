'use strict';

/* =========================================================
   Quad Print Tepatitlán — interacciones
   Sin dependencias. Menú, catálogo, visor y cotización.
   ========================================================= */

const WA_NUMBER = '5213781097423';
const WA_DEFAULT = 'Hola, quiero cotizar un proyecto con Quad Print.';
const waLink = mensaje => 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(mensaje);
const mensajePromo = titulo => 'Hola, vi la promo ' + titulo + ' en su página y quiero pedirla. ¿Sigue vigente?';

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
    estadoTexto.textContent = 'Abierto ahora · cerramos ' + aHora(tramoAbierto[1]);
    return;
  }

  for (let salto = 0; salto <= 7; salto++) {
    const dia = (hoy + salto) % 7;
    const tramo = (HORARIO[dia] || []).find(([inicio]) => salto > 0 || inicio > ahora);
    if (!tramo) continue;
    const cuando = salto === 0 ? 'hoy' : salto === 1 ? 'mañana' : 'el ' + NOMBRE_DIA[dia];
    estadoTexto.textContent = 'Fuera de horario · abrimos ' + cuando + ' ' + aHora(tramo[0]);
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
const menuMovil = window.matchMedia('(max-width: 960px)');

const actualizarInert = abierto => {
  if (!menu) return;
  menu.toggleAttribute('inert', menuMovil.matches && !abierto);
};

function setMenu(abierto, devolverFoco = false) {
  if (!toggle || !menu) return;
  menu.classList.toggle('is-open', abierto);
  toggle.classList.toggle('is-open', abierto);
  document.body.classList.toggle('menu-open', abierto);
  toggle.setAttribute('aria-expanded', String(abierto));
  toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  actualizarInert(abierto);
  if (!abierto && devolverFoco) toggle.focus();
}

if (toggle && menu) {
  actualizarInert(false);
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

  menuMovil.addEventListener('change', () => {
    actualizarInert(menu.classList.contains('is-open'));
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
requestAnimationFrame(actualizarHeader);
window.addEventListener('scroll', actualizarHeader, { passive: true });

/* ---------- Catálogo ---------- */
const galeria = document.getElementById('galeria');
const destacadosGrid = document.getElementById('destacados-grid');
const buscador = document.getElementById('buscar');
const filtros = document.getElementById('filtros');
const estado = document.getElementById('estado');
const verMas = document.getElementById('ver-mas');

const promociones = (window.PROMOCIONES || [])
  .filter(promocion => promocion && promocion.activo !== false && promocion.imagen);
const categoriasBase = Array.isArray(window.CATEGORIAS) ? window.CATEGORIAS : [];
const categorias = [{ id: 'todas', nombre: 'Todas' }, ...categoriasBase];

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

const nombreCategoria = id => {
  const encontrada = categoriasBase.find(categoria => categoria.id === id);
  return encontrada ? encontrada.nombre : 'Promociones';
};

const escapar = valor => String(valor).replace(/[&<>"']/g, caracter => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[caracter]));

const formatoMoneda = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const formatoFecha = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const archivoDe = imagen => String(imagen).split('/').pop();

const productos = promociones.map((promocion, indice) => ({
  ...promocion,
  archivo: archivoDe(promocion.imagen),
  categoriaNombre: nombreCategoria(promocion.categoria),
  etiquetas: Array.isArray(promocion.etiquetas) ? promocion.etiquetas : [],
  orden: indice
}));

/* Enlaces de servicio: el conteo de promociones activas decide si van al
   catálogo o a WhatsApp. Al agregar la primera promo de una categoría, la
   tarjeta vuelve sola a "Ver más" en la siguiente carga, sin tocar HTML. */
const promocionesPorCategoria = productos.reduce((conteo, producto) => {
  conteo.set(producto.categoria, (conteo.get(producto.categoria) || 0) + 1);
  return conteo;
}, new Map());

const prepararEnlacesServicio = () => {
  document.querySelectorAll('.service-card__link[data-filtro]').forEach(enlace => {
    const categoria = enlace.dataset.filtro;
    const total = promocionesPorCategoria.get(categoria) || 0;
    if (total > 0) {
      enlace.setAttribute('href', '#catalogo');
      enlace.removeAttribute('target');
      enlace.removeAttribute('rel');
      enlace.innerHTML = 'Ver más <span aria-hidden="true">↗</span>';
      return;
    }
    enlace.removeAttribute('data-filtro');
    enlace.classList.add('service-card__link--wa');
    enlace.href = waLink('Hola, quiero cotizar ' + nombreCategoria(categoria) + '. No vi promociones en su página.');
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
    enlace.innerHTML = 'Cotizar por WhatsApp <span aria-hidden="true">↗</span>';
  });
};
prepararEnlacesServicio();

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
      producto.etiquetas.join(' '),
      producto.archivo
    ].join(' '));
    return terminos.every(termino => variantes(termino).some(forma => texto.includes(forma)));
  });
};

const precioHTML = producto => {
  const numero = Number(producto.precio);
  if (producto.precio === null || producto.precio === undefined || producto.precio === '' || !Number.isFinite(numero)) {
    return '<p class="promo-price promo-price--pending">Precio: confirmar por WhatsApp</p>';
  }
  const prefijo = producto.prefijoPrecio
    ? '<span class="promo-price__prefix">' + escapar(producto.prefijoPrecio) + '</span>'
    : '';
  const unidad = producto.unidad
    ? '<span class="promo-price__unit">' + escapar(producto.unidad) + '</span>'
    : '';
  const iva = producto.iva === 'incluido'
    ? '<span class="promo-price__iva">IVA incluido</span>'
    : producto.iva === '+ IVA'
      ? '<span class="promo-price__iva">+ IVA</span>'
      : '';
  return '<p class="promo-price">' + prefijo
    + '<span class="promo-price__amount">' + escapar(formatoMoneda.format(numero)) + '</span>'
    + unidad + iva + '</p>';
};

const vigenciaHTML = producto => {
  if (!producto.vigencia) return '';
  const fecha = new Date(producto.vigencia + 'T12:00:00');
  if (Number.isNaN(fecha.getTime())) return '';
  return '<p class="promo-validity">Válido hasta el ' + escapar(formatoFecha.format(fecha)) + '</p>';
};

const tarjeta = producto => {
  const archivo = encodeURIComponent(producto.archivo);
  const miniaturaWebp = 'derivados/promociones/' + archivo + '-800.webp';
  const miniaturaJpg = 'derivados/promociones/' + archivo + '-800.jpg';
  const mensaje = waLink(mensajePromo(producto.titulo));
  const titulo = escapar(producto.titulo);
  const alt = escapar(producto.alt || producto.titulo);
  const descripcion = producto.descripcion
    ? '<p class="promo-desc">' + escapar(producto.descripcion) + '</p>'
    : '';
  return `
    <article class="promo-card" data-file="${escapar(producto.archivo)}" data-id="${escapar(producto.id)}">
      <button class="promo-open" type="button" aria-label="Ampliar imagen: ${titulo}">
        <picture>
          <source type="image/webp" srcset="${miniaturaWebp}">
          <img src="${miniaturaJpg}" alt="${alt}" width="800" height="1000" loading="lazy" decoding="async">
        </picture>
      </button>
      <div class="promo-body">
        <span class="promo-kicker">${escapar(producto.categoriaNombre)}</span>
        <h3 class="promo-title">${titulo}</h3>
        ${descripcion}
        ${precioHTML(producto)}
        ${vigenciaHTML(producto)}
        <div class="promo-actions">
          <button class="promo-zoom" type="button" aria-label="Ver en grande: ${titulo}">Ver en grande</button>
          <a class="promo-cta" href="${escapar(mensaje)}" target="_blank" rel="noopener noreferrer">Pedir por WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>`;
};

const marcarMiniaturas = contenedor => {
  if (!contenedor) return;
  contenedor.querySelectorAll('.promo-open img').forEach(imagen => {
    const marcar = () => {
      if (!imagen.naturalWidth || !imagen.naturalHeight) return;
      const proporcion = imagen.naturalWidth / imagen.naturalHeight;
      const esCuadrada = proporcion > 0.9 && proporcion < 1.1;
      const marco = imagen.closest('.promo-open');
      if (marco) marco.classList.toggle('is-square', esCuadrada);
    };
    if (imagen.complete) marcar();
    else imagen.addEventListener('load', marcar, { once: true });
  });
};

const pintarDestacados = () => {
  if (!destacadosGrid) return;
  const seleccion = productos.filter(producto => producto.destacado).slice(0, 4);
  const seccion = document.getElementById('promociones');
  if (seccion) seccion.hidden = !seleccion.length;
  destacadosGrid.innerHTML = seleccion.map(tarjeta).join('');
  marcarMiniaturas(destacadosGrid);
};

const pintarFiltros = () => {
  if (!filtros) return;
  filtros.innerHTML = categorias.map(categoria => `
    <button class="filter${categoria.id === categoriaActiva ? ' is-active' : ''}" type="button"
      data-category="${escapar(categoria.id)}" aria-pressed="${categoria.id === categoriaActiva}">
      ${escapar(categoria.nombre)}
    </button>`).join('');
};

const pintarEstadoVacio = (textoHTML, mensaje) => {
  if (!estado) return;
  estado.classList.add('has-action');
  estado.innerHTML = '<span class="catalog__empty-text">' + textoHTML + '</span>'
    + '<a class="btn btn--dark catalog__empty-cta" href="' + escapar(waLink(mensaje)) + '" target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">↗</span></a>';
};

const pintarCatalogo = () => {
  if (!galeria) return;
  const resultados = coincidencias();
  const mostrandoFiltro = Boolean(normalizar(consulta)) || categoriaActiva !== 'todas';
  const visibles = expandido || mostrandoFiltro ? resultados : resultados.slice(0, VISIBLES_INICIALES);

  galeria.innerHTML = visibles.map(tarjeta).join('');
  marcarMiniaturas(galeria);

  if (estado) {
    const nombreActivo = categoriaActiva === 'todas' ? '' : nombreCategoria(categoriaActiva);
    if (!resultados.length) {
      if (normalizar(consulta)) {
        const termino = consulta.trim();
        pintarEstadoVacio(
          'No encontramos promociones para “' + escapar(termino) + '”. Prueba otra palabra o pide una cotización.',
          'Hola, busco ' + termino + ' y no lo encontré en su catálogo. ¿Lo pueden hacer?'
        );
      } else {
        const mensaje = nombreActivo
          ? 'Hola, quiero cotizar ' + nombreActivo + '. No vi promociones en su página.'
          : WA_DEFAULT;
        pintarEstadoVacio(
          (nombreActivo ? escapar(nombreActivo) + ': ' : '') + 'Aún no hay promociones en esta categoría. Te cotizamos lo que necesites.',
          mensaje
        );
      }
    } else if (mostrandoFiltro) {
      estado.classList.remove('has-action');
      const prefijo = nombreActivo ? nombreActivo + ' · ' : '';
      estado.textContent = prefijo + resultados.length + (resultados.length === 1 ? ' promoción encontrada' : ' promociones encontradas');
    } else {
      estado.classList.remove('has-action');
      estado.textContent = visibles.length + ' de ' + resultados.length + ' promociones';
    }
  }

  if (verMas) {
    const puedeAlternar = !mostrandoFiltro && resultados.length > VISIBLES_INICIALES;
    verMas.hidden = !puedeAlternar;
    verMas.setAttribute('aria-expanded', String(expandido && puedeAlternar));
    verMas.textContent = expandido ? 'Ver menos' : 'Ver todas';
  }
};

const abrirVisor = (archivo, disparador) => {
  const visor = document.getElementById('visor');
  const tituloVisor = document.getElementById('visor-titulo');
  const imagen = document.getElementById('imagen-ampliada');
  const fuenteWebp = document.getElementById('visor-webp');
  const original = document.getElementById('abrir-original');
  const consultar = document.getElementById('consultar-promocion');
  const cerrar = document.getElementById('cerrar-visor');
  const producto = productos.find(item => item.archivo === archivo);
  if (!visor || !imagen || !producto) return;

  const codificado = encodeURIComponent(producto.archivo);
  const titulo = producto.titulo;

  if (tituloVisor) tituloVisor.textContent = titulo;
  if (fuenteWebp) fuenteWebp.srcset = 'derivados/promociones/' + codificado + '-1600.webp';
  imagen.src = 'derivados/promociones/' + codificado + '-1600.jpg';
  imagen.alt = producto.alt || 'Promoción ampliada: ' + titulo;
  if (original) original.href = encodeURI(producto.imagen);
  if (consultar) consultar.href = waLink(mensajePromo(titulo));

  visor._disparador = disparador || null;
  if (!visor.open) {
    visor.showModal();
    if (cerrar) cerrar.focus();
  }
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
if (visor) {
  const botonCerrarVisor = document.getElementById('cerrar-visor');

  const cerrarVisorDialogo = () => {
    const disparador = visor._disparador;
    visor._disparador = null;
    visor.close();
    if (disparador && typeof disparador.focus === 'function') {
      disparador.focus();
      setTimeout(() => disparador.focus(), 0);
    }
  };

  botonCerrarVisor?.addEventListener('click', cerrarVisorDialogo);
  visor.addEventListener('click', evento => {
    if (evento.target === visor) cerrarVisorDialogo();
  });
  visor.addEventListener('keydown', evento => {
    if (evento.key !== 'Escape') return;
    evento.preventDefault();
    cerrarVisorDialogo();
  });
  visor.addEventListener('close', () => {
    const disparador = visor._disparador;
    visor._disparador = null;
    if (disparador && typeof disparador.focus === 'function') {
      setTimeout(() => disparador.focus(), 0);
    }
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

/* Enlaces "Ver más" de las tarjetas de servicio: aplican el filtro del catálogo. */
document.addEventListener('click', evento => {
  const enlace = evento.target.closest('[data-filtro]');
  if (!enlace) return;
  if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey || evento.button !== 0) return;
  const filtro = enlace.dataset.filtro;
  if (!categorias.some(categoria => categoria.id === filtro)) return;
  evento.preventDefault();
  categoriaActiva = filtro;
  consulta = '';
  expandido = false;
  if (buscador) buscador.value = '';
  renderDestacados();
  renderCatalogo();
  const catalogo = document.getElementById('catalogo');
  const tituloCatalogo = document.getElementById('catalogo-titulo');
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (catalogo) catalogo.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
  if (tituloCatalogo) tituloCatalogo.focus({ preventScroll: true });
  try {
    history.pushState(null, '', '#catalogo');
  } catch {
    location.hash = '#catalogo';
  }
});

/* Mapa con carga diferida: el iframe se crea solo cuando la persona lo abre. */
const mapaBoton = document.querySelector('[data-mapa]');
if (mapaBoton) {
  const MAPA_URL = 'https://www.google.com/maps?q=' + encodeURIComponent('21 de Marzo 603-B, Colonia Del Carmen, Tepatitlán de Morelos, Jalisco') + '&output=embed';
  mapaBoton.addEventListener('click', () => {
    const marco = mapaBoton.closest('[data-mapa-contenedor]');
    if (!marco) return;
    const iframe = document.createElement('iframe');
    iframe.src = MAPA_URL;
    iframe.title = 'Mapa de ubicación de Quad Print en Tepatitlán';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    iframe.addEventListener('load', () => iframe.focus(), { once: true });
    marco.replaceChildren(iframe);
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

/* ---------- Fotos de servicios (Fase 4) ---------- */
const serviciosFuente = Array.isArray(window.SERVICIOS) ? window.SERVICIOS : [];

const servicioHTML = servicio => {
  const base = String(servicio.base || '').trim();
  if (!base) return '';
  const ilustrativa = servicio.ilustrativa !== false;
  const alt = (ilustrativa ? 'Imagen ilustrativa: ' : '') + String(servicio.alt || 'Servicio de Quad Print.');
  return '<picture>'
    + '<source type="image/webp" srcset="derivados/servicios/' + escapar(base) + '-800.webp 800w, derivados/servicios/' + escapar(base) + '-1200.webp 1200w" sizes="(min-width: 961px) 33vw, 100vw">'
    + '<img src="derivados/servicios/' + escapar(base) + '-1200.jpg" srcset="derivados/servicios/' + escapar(base) + '-800.jpg 800w, derivados/servicios/' + escapar(base) + '-1200.jpg 1200w" sizes="(min-width: 961px) 33vw, 100vw" width="1200" height="750" loading="lazy" decoding="async" alt="' + escapar(alt) + '">'
    + '</picture>'
    + (ilustrativa ? '<span class="service-card__flag">Imagen ilustrativa</span>' : '');
};

document.querySelectorAll('.service-card__media[data-servicio]').forEach(contenedor => {
  const servicio = serviciosFuente.find(item => item.base === contenedor.dataset.servicio);
  if (!servicio) return;
  contenedor.innerHTML = servicioHTML(servicio);
  contenedor.classList.add('has-photo');
});

/* ---------- Testimonios y galería (Fase 4) ---------- */
const testimoniosFuente = Array.isArray(window.TESTIMONIOS) ? window.TESTIMONIOS : [];
const trabajosFuente = Array.isArray(window.TRABAJOS) ? window.TRABAJOS : [];
const activos = lista => lista.filter(item => item && item.activo !== false);
const testimonios = activos(testimoniosFuente).filter(item =>
  String(item.nombre || '').trim() && String(item.negocio || '').trim() && String(item.texto || '').trim()
);
const trabajos = activos(trabajosFuente).filter(item =>
  String(item.imagen || '').trim() && String(item.alt || '').trim()
);

const testimonioHTML = testimonio => {
  const foto = testimonio.foto
    ? '<img class="testimonial__photo" src="' + escapar(testimonio.foto) + '" alt="" width="48" height="48" loading="lazy" decoding="async">'
    : '';
  return '<figure class="testimonial">'
    + '<blockquote><p>' + escapar(testimonio.texto) + '</p></blockquote>'
    + '<figcaption class="testimonial__person">' + foto
    + '<span class="testimonial__data"><strong class="testimonial__name">' + escapar(testimonio.nombre) + '</strong>'
    + '<span class="testimonial__business">' + escapar(testimonio.negocio) + '</span></span>'
    + '</figcaption></figure>';
};

const trabajoHTML = trabajo => '<figure class="work">'
  + '<img src="' + escapar(trabajo.imagen) + '" alt="' + escapar(trabajo.alt) + '" width="800" height="600" loading="lazy" decoding="async">'
  + (trabajo.pie ? '<figcaption>' + escapar(trabajo.pie) + '</figcaption>' : '')
  + '</figure>';

const prepararTestimonios = () => {
  const seccion = document.getElementById('testimonios');
  const gridTestimonios = document.getElementById('testimonios-grid');
  const gridTrabajos = document.getElementById('galeria-trabajos');
  if (!seccion || !gridTestimonios || !gridTrabajos) return;
  if (testimonios.length < 3) {
    seccion.hidden = true;
    gridTrabajos.hidden = true;
    return;
  }
  gridTestimonios.innerHTML = testimonios.slice(0, 3).map(testimonioHTML).join('');
  if (trabajos.length >= 4) {
    gridTrabajos.innerHTML = trabajos.map(trabajoHTML).join('');
    gridTrabajos.hidden = false;
  } else {
    gridTrabajos.innerHTML = '';
    gridTrabajos.hidden = true;
  }
  seccion.hidden = false;
};
prepararTestimonios();

/* ---------- Arranque ---------- */
conectarGaleria(destacadosGrid);
conectarGaleria(galeria);

let destacadosListos = false;
const renderDestacados = () => {
  if (destacadosListos) return;
  destacadosListos = true;
  pintarDestacados();
};

const renderCatalogo = () => {
  pintarFiltros();
  pintarCatalogo();
};

// Las secciones pesadas se pintan antes de entrar en pantalla, sin bloquear el primer pintado.
const observarSeccion = (id, render) => {
  const seccion = document.getElementById(id);
  if (!seccion) return;
  if (!('IntersectionObserver' in window)) {
    render();
    return;
  }
  const observador = new IntersectionObserver(entradas => {
    if (entradas.some(entrada => entrada.isIntersecting)) {
      render();
      observador.disconnect();
    }
  }, { rootMargin: '1200px 0px' });
  observador.observe(seccion);
};

observarSeccion('promociones', renderDestacados);
observarSeccion('catalogo', renderCatalogo);

// Si el nav lleva a Promociones, pinta la vitrina antes del salto.
document.addEventListener('click', evento => {
  if (evento.target.closest('a[href="#promociones"]')) renderDestacados();
});

// Antes de saltar a una sección que está después de las secciones diferidas,
// se pintan para que el destino no se mueva durante el desplazamiento.
const anclasConSeccionesTardias = new Set(['#catalogo', '#foraneos', '#formatos', '#contacto', '#ubicacion']);
document.addEventListener('click', evento => {
  const enlace = evento.target.closest('a[href^="#"]');
  if (!enlace) return;
  if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey || evento.button !== 0) return;
  if (!anclasConSeccionesTardias.has(enlace.getAttribute('href'))) return;
  renderDestacados();
  if (!document.querySelector('#galeria .promo-card')) renderCatalogo();
});
