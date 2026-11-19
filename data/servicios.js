/* =========================================================
   SERVICIOS — fotos de las 6 tarjetas (Fase 4)
   =========================================================
   Este archivo alimenta las imágenes de las tarjetas de servicio.
   No se toca el HTML para cambiar una foto ni para quitar la etiqueta.

   CAMPOS:
   - base: nombre base de los derivados en derivados/servicios/.
   - alt: descripción real de la imagen.
   - ilustrativa: true mientras sea un mockup o imagen no propia.
     Muestra la etiqueta "Imagen ilustrativa" y agrega el prefijo al alt.
     Al recibir una foto real de Domingo, cambiar a false: la etiqueta
     desaparece sola y el alt queda limpio.

   ORIGEN Y LICENCIA:
   Las 6 imágenes actuales son mockups con la marca Quad Print,
   entregados por Domingo el 2026-11-19. Se usan con su autorización
   para este sitio. No son fotos de trabajos reales. Se reemplazarán
   por fotos reales en el Lote 4B.
   ========================================================= */

window.SERVICIOS = [
  {
    base: "01-papeleria",
    alt: "Papelería comercial: tarjetas, hojas y folders con el logo de Quad Print.",
    ilustrativa: true
  },
  {
    base: "02-gran-formato",
    alt: "Banner de gran formato con el logo de Quad Print junto a muestras de color.",
    ilustrativa: true
  },
  {
    base: "03-textiles",
    alt: "Playera, gorra, taza y termo personalizados con el logo de Quad Print.",
    ilustrativa: true
  },
  {
    base: "04-laser",
    alt: "Grabado láser del logo de Quad Print sobre madera.",
    ilustrativa: true
  },
  {
    base: "05-toldos",
    alt: "Anuncio luminoso personalizado con el logo de Quad Print.",
    ilustrativa: true
  },
  {
    base: "06-diseno",
    alt: "Estación de diseño gráfico con el logo de Quad Print en pantalla.",
    ilustrativa: true
  }
];
