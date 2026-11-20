# Pruebas en dispositivo real

**Última actualización:** 2026-11-19
**Responsable de ejecutarlas:** Domingo (dueño) con el checklist del asesor.
**Objetivo:** confirmar en hardware real lo que el agente solo pudo probar con emulación de Chrome y CDP.

Instrucciones: abrir la URL publicada, hacer cada punto y anotar **OK** o **Falla** con una nota corta. Si algo falla, adjuntar captura y el modelo del teléfono.

---

## Checklist de 2 minutos

1. Abrir `https://imprenta-tepa.github.io/imprentatepatitlan/` y confirmar que carga sin quedar en blanco.
2. Revisar que el logo del header se vea nítido y que el header no tape el contenido al hacer scroll.
3. Tocar el menú hamburguesa: debe abrir, dejar navegar y cerrar con el mismo botón.
4. Tocar **Ver servicios**, luego **Ver más** de una tarjeta: debe bajar al catálogo con el filtro aplicado y el título enfocado.
5. En el catálogo, probar **Ver todas**, una categoría y el buscador; confirmar que “Todas” sigue visible mientras se hace scroll.
6. Abrir una promoción: el visor debe mostrar la imagen completa y cerrar con la X o el botón Atrás.
7. En **Ubicación**, pulsar **Ver mapa interactivo**: debe cargar el mapa solo al tocarlo.
8. En **Contacto**, llenar el formulario y confirmar que abre WhatsApp con el mensaje correcto.
9. Revisar que el botón flotante de WhatsApp no tape contenido ni quede debajo del notch/barra de gestos.
10. Girar el teléfono a horizontal: sin scroll lateral y sin contenido cortado.

## Registro de resultados

| Fecha | Dispositivo | Navegador | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | Anomalías |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |

### Notas
- Marcar cada punto como **OK** o **Falla**.
- En iPhone, probar además con Safari y con el modo horizontal.
- Si el teclado tapa un campo del formulario, anotarlo: es el punto más propenso a fallar en iOS.
- Reportar al asesor el modelo exacto, la versión del sistema y la versión del navegador.
