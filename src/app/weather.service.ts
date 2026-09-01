import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, catchError, throwError } from 'rxjs';

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  timezone: string;
  population: number;
}

export interface WeatherResponse {
  current: { temperature_2m: number };
  current_units: { temperature_2m: string };
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherForCity(name: string): Observable<{ location: GeocodingResult; weather: WeatherResponse }> {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=es&format=json`;
    console.log('Fetching geocoding:', geoUrl);

    return this.http.get<{ results: GeocodingResult[] }>(geoUrl).pipe(
      map(res => {
        console.log('Geocoding response:', res);
        if (!res.results || res.results.length === 0) {
          throw new Error('No se encontro la ciudad en la API de geocodificacion');
        }
        return res.results[0];
      }),
      switchMap(loc => {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m&timezone=America/Santiago`;
        console.log('Fetching weather:', weatherUrl);
        return this.http.get<WeatherResponse>(weatherUrl).pipe(
          map(weather => {
            console.log('Weather response:', weather);
            return { location: loc, weather };
          })
        );
      }),
      catchError(err => {
        console.error('API Error:', err);
        const msg = err.error?.reason || err.message || 'Error de red desconocido';
        return throwError(() => new Error(msg));
      })
    );
  }
}
