# WeatherApp

Aplicacion Angular que muestra la temperatura actual de Temuco, Chile mediante la API de Open-Meteo.

## Inicio rapido

```bash
npm install
npm start
```

Abrir http://localhost:8080

El puerto por defecto es 8080.

## APIs utilizadas

1. Geocodificacion: https://geocoding-api.open-meteo.com/v1/search?name=Temuco&count=1&language=es&format=json
2. Clima: https://api.open-meteo.com/v1/forecast?latitude=-38.7363&longitude=-72.5974&current=temperature_2m&timezone=America/Santiago
