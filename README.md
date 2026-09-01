# WeatherApp

Aplicacion Angular que muestra la temperatura actual de Temuco, Chile mediante la API de Open-Meteo.

## Inicio rapido

```bash
npm install
ng serve
```

Abrir http://localhost:8080

El puerto por defecto es 8080.

## Compilacion para produccion

```bash
ng build
```

Salida en dist/weatherapp/

## Despliegue en GitHub Pages

La carpeta docs/ contiene una version en HTML puro que no requiere compilacion.

1. Subir el repositorio a GitHub
2. Ir a Settings > Pages
3. Fuente: Deploy from a branch
4. Seleccionar rama main y carpeta /docs
5. El sitio estara disponible en https://usuario.github.io/WeatherApp

## Archivos a eliminar de una instalacion normal ng new

Al ejecutar ng new WeatherApp, Angular CLI genera archivos adicionales. Conservar unicamente:

```
WeatherApp/
  angular.json
  package.json
  tsconfig.json
  tsconfig.app.json
  README.md
  CASOS_LIMITE.md
  docs/
    index.html
  src/
    index.html
    main.ts
    styles.css
    app/
      app.component.ts
      app.config.ts
      weather.service.ts
      weather/
        weather.component.ts
```

Eliminar:
- src/favicon.ico
- src/assets/
- src/app/app.routes.ts
- src/app/app.component.spec.ts
- src/app/app.component.css
- karma.conf.js
- .editorconfig
- .vscode/

## APIs utilizadas

1. Geocodificacion: https://geocoding-api.open-meteo.com/v1/search?name=Temuco&count=1&language=es&format=json
2. Clima: https://api.open-meteo.com/v1/forecast?latitude=-38.7363&longitude=-72.5974&current=temperature_2m&timezone=America/Santiago
