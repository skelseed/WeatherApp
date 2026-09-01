# CASOS LIMITE - WeatherApp

## 1. Falla de conectividad de red

**Descripcion:** El dispositivo del usuario carece de acceso a Internet en el momento de la solicitud.

**Manifestacion:** La interfaz permanece en estado "Cargando datos del clima..." de forma indefinida o presenta mensaje de error de red.

**Mitigacion:** Se implementa boton de reintento. Se recomienda al usuario verificar su conexion a Internet.

---

## 2. Indisponibilidad del servicio de geocodificacion

**Descripcion:** El servidor de Open-Meteo Geocoding API no responde o devuelve codigo de estado HTTP distinto de 200.

**Manifestacion:** Error en consola del navegador. Mensaje: "Error en geocodificacion: [codigo HTTP]".

**Mitigacion:** Manejo de excepciones con catchError en RxJS. Visualizacion de mensaje al usuario con opcion de reintento.

---

## 3. Ciudad no encontrada en base de datos geocodificadora

**Descripcion:** La API de geocodificacion responde con arreglo de resultados vacio.

**Manifestacion:** Respuesta JSON valida con campo "results" nulo o de longitud cero.

**Mitigacion:** Validacion explicita de existencia de resultados antes de acceder al indice cero. Lanzamiento de excepcion controlada con mensaje descriptivo.

---

## 4. Indisponibilidad del servicio meteorologico

**Descripcion:** El servidor de Open-Meteo Forecast API no responde o devuelve codigo de estado HTTP distinto de 200.

**Manifestacion:** Error en consola del navegador. Mensaje: "Error en clima: [codigo HTTP]".

**Mitigacion:** Manejo de excepciones con catchError en RxJS. Visualizacion de mensaje al usuario con opcion de reintento.

---

## 5. Estructura de respuesta inesperada

**Descripcion:** La API devuelve JSON valido pero con campos faltantes o renombrados.

**Manifestacion:** Error de tipo en tiempo de ejecucion. Acceso a propiedad undefined.

**Mitigacion:** Definicion de interfaces TypeScript con tipado estricto. Uso de operador de encadenamiento opcional en versiones futuras.

---

## 6. Latencia excesiva en respuesta de API

**Descripcion:** Los servidores de Open-Meteo experimentan alta demanda y demoran en responder.

**Manifestacion:** Tiempo de carga superior a 10 segundos. Percepcion de aplicacion congelada.

**Mitigacion:** Implementacion de timeout de 10 segundos en solicitudes HTTP. Mensaje de estado visible durante espera.

---

## 7. Bloqueo por politica de mismo origen (CORS)

**Descripcion:** El navegador del usuario bloquea solicitudes cross-origin hacia open-meteo.com.

**Manifestacion:** Error en consola: "CORS policy: No 'Access-Control-Allow-Origin' header".

**Mitigacion:** Open-Meteo incluye encabezados CORS permisivos. En caso de falla, se recomienda verificar extensiones de navegador que intercepten solicitudes.

---

## 8. Ejecucion en entorno sin soporte para fetch

**Descripcion:** Navegador obsoleto que no implementa API fetch ni XMLHttpRequest moderno.

**Manifestacion:** Error de referencia: fetch is not defined.

**Mitigacion:** Angular HttpClient utiliza XMLHttpRequest internamente. Se requiere navegador con soporte ES2022.

---

## 9. Datos de temperatura fuera de rango esperado

**Descripcion:** La API devuelve valor de temperatura atipico para la zona geografica.

**Manifestacion:** Temperatura menor a -20 grados Celsius o mayor a 50 grados Celsius.

**Mitigacion:** La aplicacion presenta el valor tal cual lo recibe de la fuente oficial. No se realiza validacion de rango.

---

## 10. Cambio de endpoint o version de API

**Descripcion:** Open-Meteo modifica sus URLs o parametros de consulta.

**Manifestacion:** Error 404 o 400 en solicitudes. Respuesta con estructura diferente.

**Mitigacion:** Monitoreo periodico de documentacion oficial en https://open-meteo.com/en/features. Actualizacion manual de URLs en codigo fuente.

---

## 11. Ejecucion sin framework Angular

**Descripcion:** El usuario intenta ejecutar los archivos TypeScript directamente sin compilar.

**Manifestacion:** Navegador muestra codigo fuente o errores de sintaxis.

**Mitigacion:** Se provee archivo docs/index.html con implementacion en JavaScript puro, ejecutable sin compilacion ni dependencias.

---

## 12. Puerto 8080 ocupado

**Descripcion:** Otro proceso en el sistema utiliza el puerto 8080.

**Manifestacion:** Error: "Port 8080 is already in use".

**Mitigacion:** Ejecutar con flag --port para especificar puerto alternativo: ng serve --port 4200.

---

## 13. Instalacion incompleta de dependencias

**Descripcion:** El usuario omite el comando npm install antes de ng serve.

**Manifestacion:** Error: "Cannot find module '@angular/core'" o similares.

**Mitigacion:** Documentacion incluye paso explicito de instalacion. Uso de docs/index.html como alternativa sin dependencias.

---

## 14. Version incompatible de Node.js

**Descripcion:** El entorno de ejecucion utiliza version de Node.js no soportada por Angular CLI 19.

**Manifestacion:** Advertencias o errores durante npm install o ng serve.

**Mitigacion:** Se requiere Node.js version 18.19 o superior. Consultar matriz de compatibilidad de Angular.
