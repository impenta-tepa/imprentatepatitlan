/* =========================================================
   PROMOCIONES — fuente única de verdad (Fase 1)
   =========================================================
   Este archivo alimenta:
   - La sección "Promociones destacadas" (destacado: true, máximo 4).
   - El catálogo completo, el buscador y los filtros.
   - La tarjeta unificada y el visor de imagen.

   PARA AGREGAR O EDITAR UNA PROMOCIÓN:
   Lee docs/promociones-format.md. No hace falta tocar HTML, CSS ni JS.

   TODO-DOMINGO:
   - Los 19 precios están en null porque hoy viven dentro de las imágenes.
     No se leyeron ni se inventaron.
   - El IVA y la vigencia también quedan en null hasta que Domingo los confirme.
   - Las unidades escritas son una propuesta cuando el título o la descripción
     indican cantidad; hay que confirmarlas.
   - Confirmar cuál número es el WhatsApp principal de todos los botones.

   ORDEN: las promociones se muestran en el orden de este arreglo.
   Para reordenar, mueve el objeto completo. Para ocultar una, usa activo: false.
   ========================================================= */

window.CATEGORIAS = [
  {
    id: "papeleria",
    nombre: "Papelería comercial y empresarial",
    ejemplos: ["Tarjetas", "Volantes", "Notas", "Folletos", "Sellos", "Etiquetas"]
  },
  {
    id: "gran-formato",
    nombre: "Gran formato",
    ejemplos: ["Lonas", "Banners", "Pasacalles", "Vinil impreso"]
  },
  {
    id: "textiles",
    nombre: "Textiles y promocionales",
    ejemplos: ["Playeras", "Gorras", "Tazas", "Termos"]
  },
  {
    id: "laser",
    nombre: "Corte y grabado láser",
    ejemplos: ["Reconocimientos", "Señalética", "Piezas a medida"]
  },
  {
    id: "toldos",
    nombre: "Toldos y anuncios",
    ejemplos: ["Toldos con y sin luz", "Cajas de luz", "Letras 3D", "Rotulación"]
  },
  {
    id: "diseno",
    nombre: "Diseño gráfico",
    ejemplos: ["Concepto desde cero", "Ajuste de archivos"]
  }
];

window.PROMOCIONES = [
  {
    id: "tarjetas-1000-2-lados-mate",
    categoria: "papeleria",
    etiquetas: ["tarjetas", "presentación", "mate", "millar", "papelería"],
    titulo: "Tarjetas 1000 · 2 lados mate",
    descripcion: "Millar de tarjetas de presentación con acabado mate.",
    precio: null,
    prefijoPrecio: "",
    unidad: "el millar",
    iva: null,
    vigencia: null,
    imagen: "promociones/tarjetas 1000 2 lados mate.jpg",
    alt: "Promoción de tarjetas de presentación a dos lados con acabado mate.",
    destacado: true,
    activo: true
  },
  {
    id: "tazas-personalizadas",
    categoria: "textiles",
    etiquetas: ["tazas", "sublimación", "regalos", "promocionales"],
    titulo: "Tazas personalizadas",
    descripcion: "Taza sublimada con tu diseño, lista para regalo o promoción.",
    precio: null,
    prefijoPrecio: "",
    unidad: "c/u",
    iva: null,
    vigencia: null,
    imagen: "promociones/tazas-personalizadas.jpg",
    alt: "Promoción de taza blanca personalizada con diseño a todo color.",
    destacado: true,
    activo: true
  },
  {
    id: "playera-familiar",
    categoria: "textiles",
    etiquetas: ["playeras", "textil", "familia", "personalización"],
    titulo: "Playera familiar",
    descripcion: "Paquete de 2 playeras de adulto y 1 infantil personalizadas.",
    precio: null,
    prefijoPrecio: "",
    unidad: "paquete 3 pzas",
    iva: null,
    vigencia: null,
    imagen: "promociones/playera familiar.jpg",
    alt: "Promoción de paquete de playeras personalizadas para dos adultos y un niño.",
    destacado: true,
    activo: true
  },
  {
    id: "banner-180",
    categoria: "gran-formato",
    etiquetas: ["lonas", "banners", "gran formato", "exterior"],
    titulo: "Banner 1.80 m",
    descripcion: "Lona de gran formato para anuncios, eventos y exteriores.",
    precio: null,
    prefijoPrecio: "",
    unidad: "",
    iva: null,
    vigencia: null,
    imagen: "promociones/banner 1.80.jpg",
    alt: "Promoción de banner o lona de gran formato para anuncios y eventos.",
    destacado: true,
    activo: true
  },
  {
    id: "tarjetas-100-1-lado",
    categoria: "papeleria",
    etiquetas: ["tarjetas", "presentación", "ciento", "papelería"],
    titulo: "Tarjetas 100 · 1 lado",
    descripcion: "Tarjetas de presentación impresas por un lado.",
    precio: null,
    prefijoPrecio: "",
    unidad: "el ciento",
    iva: null,
    vigencia: null,
    imagen: "promociones/tarjetas 100 1 lado.jpg",
    alt: "Promoción de cien tarjetas de presentación impresas por un lado.",
    destacado: false,
    activo: true
  },
  {
    id: "tarjetas-100-2-lados",
    categoria: "papeleria",
    etiquetas: ["tarjetas", "presentación", "ciento", "papelería"],
    titulo: "Tarjetas 100 · 2 lados",
    descripcion: "Tarjetas de presentación impresas por ambos lados.",
    precio: null,
    prefijoPrecio: "",
    unidad: "el ciento",
    iva: null,
    vigencia: null,
    imagen: "promociones/tarjetas 100 2 lados.jpg",
    alt: "Promoción de cien tarjetas de presentación impresas por ambos lados.",
    destacado: false,
    activo: true
  },
  {
    id: "tarjetas-1000-2-lados-brillante",
    categoria: "papeleria",
    etiquetas: ["tarjetas", "presentación", "brillante", "millar", "papelería"],
    titulo: "Tarjetas 1000 · 2 lados brillante",
    descripcion: "Millar de tarjetas con acabado brillante.",
    precio: null,
    prefijoPrecio: "",
    unidad: "el millar",
    iva: null,
    vigencia: null,
    imagen: "promociones/tarjetas 1000 2 lados brillante.jpg",
    alt: "Promoción de mil tarjetas de presentación a dos lados con acabado brillante.",
    destacado: false,
    activo: true
  },
  {
    id: "tarjetas-1000-frente",
    categoria: "papeleria",
    etiquetas: ["tarjetas", "presentación", "frente", "millar", "papelería"],
    titulo: "Tarjetas 1000 · frente",
    descripcion: "Millar de tarjetas impresas al frente.",
    precio: null,
    prefijoPrecio: "",
    unidad: "el millar",
    iva: null,
    vigencia: null,
    imagen: "promociones/tarjetas 1000 frente.jpg",
    alt: "Promoción de mil tarjetas de presentación impresas al frente.",
    destacado: false,
    activo: true
  },
  {
    id: "tazas-caja",
    categoria: "textiles",
    etiquetas: ["tazas", "caja", "mayoreo", "promocionales", "regalos"],
    titulo: "Tazas por caja",
    descripcion: "Caja con 36 tazas personalizadas, ideal para regalo o promoción.",
    precio: null,
    prefijoPrecio: "",
    unidad: "caja 36 pzas",
    iva: null,
    vigencia: null,
    imagen: "promociones/tazas caja.jpg",
    alt: "Promoción de caja con 36 tazas personalizadas.",
    destacado: false,
    activo: true
  },
  {
    id: "termos-30-oz",
    categoria: "textiles",
    etiquetas: ["termos", "30 oz", "promocionales", "regalos"],
    titulo: "Termos 30 oz",
    descripcion: "Termo personalizado de 30 oz.",
    precio: null,
    prefijoPrecio: "",
    unidad: "c/u",
    iva: null,
    vigencia: null,
    imagen: "promociones/termos-personalizados-30-oz.jpg",
    alt: "Promoción de termo personalizado de 30 onzas.",
    destacado: false,
    activo: true
  },
  {
    id: "sellos-varios",
    categoria: "papeleria",
    etiquetas: ["sellos", "goma", "madera", "oficina", "papelería"],
    titulo: "Sellos varios",
    descripcion: "Sellos personalizados para oficina y negocio.",
    precio: null,
    prefijoPrecio: "",
    unidad: "c/u",
    iva: null,
    vigencia: null,
    imagen: "promociones/sellos varios.jpg",
    alt: "Promoción de sellos personalizados para oficina y negocio.",
    destacado: false,
    activo: true
  },
  {
    id: "sellos-varios-precios",
    categoria: "papeleria",
    etiquetas: ["sellos", "goma", "madera", "oficina", "papelería"],
    titulo: "Sellos varios · precios",
    descripcion: "Sellos de goma y madera; precios y opciones en la imagen.",
    precio: null,
    prefijoPrecio: "",
    unidad: "c/u",
    iva: null,
    vigencia: null,
    imagen: "promociones/sellos varios PRECIOS.jpg",
    alt: "Promoción de sellos de goma y madera con opciones para oficina y negocio.",
    destacado: false,
    activo: true
  },
  {
    id: "etiqueta-circular",
    categoria: "papeleria",
    etiquetas: ["etiquetas", "adhesivos", "producto", "empaque", "marca"],
    titulo: "Etiqueta circular",
    descripcion: "Etiquetas adhesivas para producto, empaque o marca.",
    precio: null,
    prefijoPrecio: "",
    unidad: "",
    iva: null,
    vigencia: null,
    imagen: "promociones/etiqueta circular.jpg",
    alt: "Promoción de etiquetas adhesivas circulares para producto o empaque.",
    destacado: false,
    activo: true
  },
  {
    id: "anuncio-circular",
    categoria: "papeleria",
    etiquetas: ["publicidad", "avisos", "punto de venta", "impresión"],
    titulo: "Anuncio circular",
    descripcion: "Impresión circular para promociones, avisos y puntos de venta.",
    precio: null,
    prefijoPrecio: "",
    unidad: "",
    iva: null,
    vigencia: null,
    imagen: "promociones/anuncio circular.jpg",
    alt: "Promoción de impresión circular para avisos y puntos de venta.",
    destacado: false,
    activo: true
  },
  {
    id: "banner-160",
    categoria: "gran-formato",
    etiquetas: ["lonas", "banners", "gran formato", "interior", "exterior"],
    titulo: "Banner 1.60 m",
    descripcion: "Lona para exterior o interior, personalizada a tu medida.",
    precio: null,
    prefijoPrecio: "",
    unidad: "",
    iva: null,
    vigencia: null,
    imagen: "promociones/banner 1.60.jpg",
    alt: "Promoción de banner o lona personalizada para interior o exterior.",
    destacado: false,
    activo: true
  },
  {
    id: "brazaletes-paquete",
    categoria: "textiles",
    etiquetas: ["brazaletes", "eventos", "control de acceso", "promocionales"],
    titulo: "Brazaletes por paquete",
    descripcion: "Brazaletes personalizados para eventos y control de acceso.",
    precio: null,
    prefijoPrecio: "",
    unidad: "paquete",
    iva: null,
    vigencia: null,
    imagen: "promociones/brazaletes paquete.jpg",
    alt: "Promoción de brazaletes personalizados para eventos.",
    destacado: false,
    activo: true
  },
  {
    id: "mousepad",
    categoria: "textiles",
    etiquetas: ["mousepad", "escritorio", "promocionales", "regalos"],
    titulo: "Mousepad personalizado",
    descripcion: "Mousepad con impresión a todo color para escritorio.",
    precio: null,
    prefijoPrecio: "",
    unidad: "c/u",
    iva: null,
    vigencia: null,
    imagen: "promociones/MOUSEPAD.jpg",
    alt: "Promoción de mousepad personalizado con impresión a todo color.",
    destacado: false,
    activo: true
  },
  {
    id: "paquete-padrinos",
    categoria: "papeleria",
    etiquetas: ["padrinos", "eventos", "kit", "papelería"],
    titulo: "Paquete para padrinos",
    descripcion: "Kit impreso para padrinos y eventos especiales.",
    precio: null,
    prefijoPrecio: "",
    unidad: "paquete",
    iva: null,
    vigencia: null,
    imagen: "promociones/PAQUETE PADRINOS 1.jpg",
    alt: "Promoción de kit impreso para padrinos y eventos especiales.",
    destacado: false,
    activo: true
  },
  {
    id: "panalero-2026",
    categoria: "textiles",
    etiquetas: ["pañalero", "bebé", "regalos", "personalización"],
    titulo: "Pañalero 2026",
    descripcion: "Pañalero personalizado para celebración o regalo.",
    precio: null,
    prefijoPrecio: "",
    unidad: "c/u",
    iva: null,
    vigencia: null,
    imagen: "promociones/pañalero 2026.jpg",
    alt: "Promoción de pañalero personalizado para celebración o regalo.",
    destacado: false,
    activo: true
  }
];
