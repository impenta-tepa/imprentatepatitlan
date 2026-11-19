/* =========================================================
   TESTIMONIOS Y GALERÍA — fuente única de verdad (Fase 4)
   =========================================================
   Este archivo alimenta:
   - La sección "Testimonios y galería" de la home.
   - El render se hace desde js/sitio.js; no se toca el HTML.

   ACTIVACIÓN AUTOMÁTICA:
   - La sección solo se muestra cuando hay al menos 3 testimonios
     activos y al menos 4 trabajos activos.
   - Mientras falte uno de los dos mínimos, la sección sigue oculta.
   - No se inventan testimonios ni fotos.

   PARA AGREGAR CONTENIDO:
   Lee docs/testimonios-format.md. Usa solo datos reales y autorizados.

   CAMPOS DE TESTIMONIO:
   - nombre: nombre real de la persona.
   - negocio: nombre del negocio.
   - texto: testimonio corto, tal como lo autorizó el cliente.
   - foto: ruta opcional a un retrato cuadrado (galeria/testimonio-01.webp).
   - activo: false para ocultarlo sin borrarlo.

   CAMPOS DE TRABAJO:
   - imagen: ruta a la foto (galeria/trabajo-01.webp).
   - alt: descripción real de la pieza y el material.
   - pie: texto breve que acompaña la foto (opcional).
   - activo: false para ocultarlo sin borrarlo.
   ========================================================= */

window.TESTIMONIOS = [
  // Ejemplo de estructura. Sustituir por testimonios reales y autorizados.
  // {
  //   nombre: "Nombre real",
  //   negocio: "Negocio real",
  //   texto: "Testimonio corto autorizado por el cliente.",
  //   foto: "galeria/testimonio-01.webp",
  //   activo: true
  // }
];

window.TRABAJOS = [
  // Ejemplo de estructura. Sustituir por fotos propias de trabajos reales.
  // {
  //   imagen: "galeria/trabajo-01.webp",
  //   alt: "Descripción real de la pieza, el material y su uso.",
  //   pie: "Pie de foto breve",
  //   activo: true
  // }
];
