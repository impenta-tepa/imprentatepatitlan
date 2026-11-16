/* Metadatos editoriales del catálogo.
   Las imágenes viven en /promociones y el build genera /datos/promociones.js.
   Este archivo solo agrega título, categoría y descripción; no duplica archivos. */

window.CATEGORIAS = [
  { id: 'todas', nombre: 'Todas' },
  { id: 'tarjetas', nombre: 'Tarjetas' },
  { id: 'tazas', nombre: 'Tazas y termos' },
  { id: 'textil', nombre: 'Textil' },
  { id: 'sellos', nombre: 'Sellos' },
  { id: 'gran-formato', nombre: 'Gran formato' },
  { id: 'etiquetas', nombre: 'Etiquetas' },
  { id: 'publicidad', nombre: 'Publicidad' },
  { id: 'regalos', nombre: 'Regalos' }
];

window.CATALOGO = {
  'tarjetas 1000 2 lados mate.jpg': {
    titulo: 'Tarjetas 1000 · 2 lados mate',
    categoria: 'tarjetas',
    descripcion: 'Millar de tarjetas de presentación con acabado mate.',
    destacado: true,
    orden: 1
  },
  'tazas-personalizadas.jpg': {
    titulo: 'Tazas personalizadas',
    categoria: 'tazas',
    descripcion: 'Taza sublimada con tu diseño, lista para regalo o promoción.',
    destacado: true,
    orden: 2
  },
  'playera familiar.jpg': {
    titulo: 'Playera familiar',
    categoria: 'textil',
    descripcion: 'Paquete de 2 playeras de adulto y 1 infantil personalizadas.',
    destacado: true,
    orden: 3
  },
  'banner 1.80.jpg': {
    titulo: 'Banner 1.80 m',
    categoria: 'gran-formato',
    descripcion: 'Lona de gran formato para anuncios, eventos y exteriores.',
    destacado: true,
    orden: 4
  },
  'tarjetas 100 1 lado.jpg': {
    titulo: 'Tarjetas 100 · 1 lado',
    categoria: 'tarjetas',
    descripcion: 'Tarjetas de presentación impresas por un lado.',
    orden: 5
  },
  'tarjetas 100 2 lados.jpg': {
    titulo: 'Tarjetas 100 · 2 lados',
    categoria: 'tarjetas',
    descripcion: 'Tarjetas de presentación impresas por ambos lados.',
    orden: 6
  },
  'tarjetas 1000 2 lados brillante.jpg': {
    titulo: 'Tarjetas 1000 · 2 lados brillante',
    categoria: 'tarjetas',
    descripcion: 'Millar de tarjetas con acabado brillante.',
    orden: 7
  },
  'tarjetas 1000 frente.jpg': {
    titulo: 'Tarjetas 1000 · frente',
    categoria: 'tarjetas',
    descripcion: 'Millar de tarjetas impresas al frente.',
    orden: 8
  },
  'tazas caja.jpg': {
    titulo: 'Tazas por caja',
    categoria: 'tazas',
    descripcion: 'Caja con 36 tazas personalizadas, ideal para regalo o promoción.',
    orden: 9
  },
  'termos-personalizados-30-oz.jpg': {
    titulo: 'Termos 30 oz',
    categoria: 'tazas',
    descripcion: 'Termo personalizado de 30 oz.',
    orden: 10
  },
  'sellos varios.jpg': {
    titulo: 'Sellos varios',
    categoria: 'sellos',
    descripcion: 'Sellos personalizados para oficina y negocio.',
    orden: 11
  },
  'sellos varios PRECIOS.jpg': {
    titulo: 'Sellos varios · precios',
    categoria: 'sellos',
    descripcion: 'Sellos de goma y madera; precios y opciones en la imagen.',
    orden: 12
  },
  'etiqueta circular.jpg': {
    titulo: 'Etiqueta circular',
    categoria: 'etiquetas',
    descripcion: 'Etiquetas adhesivas para producto, empaque o marca.',
    orden: 13
  },
  'anuncio circular.jpg': {
    titulo: 'Anuncio circular',
    categoria: 'publicidad',
    descripcion: 'Impresión circular para promociones, avisos y puntos de venta.',
    orden: 14
  },
  'banner 1.60.jpg': {
    titulo: 'Banner 1.60 m',
    categoria: 'gran-formato',
    descripcion: 'Lona para exterior o interior, personalizada a tu medida.',
    orden: 15
  },
  'brazaletes paquete.jpg': {
    titulo: 'Brazaletes por paquete',
    categoria: 'regalos',
    descripcion: 'Brazaletes personalizados para eventos y control de acceso.',
    orden: 16
  },
  'MOUSEPAD.jpg': {
    titulo: 'Mousepad personalizado',
    categoria: 'regalos',
    descripcion: 'Mousepad con impresión a todo color para escritorio.',
    orden: 17
  },
  'PAQUETE PADRINOS 1.jpg': {
    titulo: 'Paquete para padrinos',
    categoria: 'regalos',
    descripcion: 'Kit impreso para padrinos y eventos especiales.',
    orden: 18
  },
  'pañalero 2026.jpg': {
    titulo: 'Pañalero 2026',
    categoria: 'regalos',
    descripcion: 'Pañalero personalizado para celebración o regalo.',
    orden: 19
  }
};
