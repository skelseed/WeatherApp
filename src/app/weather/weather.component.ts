import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>Temuco, Chile</h1>
      <p class="subtitle">Región de la Araucanía</p>

      <div *ngIf="loading" class="status">
        <p>Cargando datos del clima...</p>
      </div>

      <div *ngIf="error" class="status error">
        <p>{{ error }}</p>
        <button (click)="load()">Reintentar</button>
      </div>

      <div *ngIf="!loading && !error && data" class="result">
        <div class="temp">
          <span class="number">{{ data.weather.current.temperature_2m }}</span>
          <span class="symbol">{{ data.weather.current_units.temperature_2m }}</span>
        </div>
        <div class="info">
          <p><strong>Comuna:</strong> {{ data.location.admin3 }}</p>
          <p><strong>Provincia:</strong> {{ data.location.admin2 }}</p>
          <p><strong>Población:</strong> {{ data.location.population | number }}</p>
          <p><strong>Elevación:</strong> {{ data.location.elevation }} m</p>
          <p><strong>Zona horaria:</strong> {{ data.location.timezone }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f4f8;
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 32px;
      width: 100%;
      max-width: 380px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      text-align: center;
    }
    h1 { margin: 0 0 4px 0; color: #1a202c; font-size: 1.8rem; }
    .subtitle { margin: 0 0 24px 0; color: #718096; font-size: 0.95rem; }
    .status { padding: 20px; color: #4a5568; }
    .status.error { color: #c53030; }
    .status.error button {
      margin-top: 12px; padding: 8px 20px;
      background: #3182ce; color: white; border: none;
      border-radius: 6px; cursor: pointer; font-size: 0.9rem;
    }
    .status.error button:hover { background: #2b6cb0; }
    .temp { margin: 20px 0; }
    .number { font-size: 4rem; font-weight: bold; color: #2d3748; }
    .symbol { font-size: 1.5rem; color: #718096; margin-left: 4px; }
    .info {
      text-align: left; margin-top: 20px;
      padding-top: 16px; border-top: 1px solid #e2e8f0;
    }
    .info p { margin: 6px 0; color: #4a5568; font-size: 0.9rem; }
  `]
})
export class WeatherComponent implements OnInit {
  loading = true;
  error: string | null = null;
  data: any = null;

  constructor(private svc: WeatherService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = null;
    this.data = null;
    console.log('Component: starting load...');

    this.svc.getWeatherForCity('Temuco').subscribe({
      next: (res) => {
        console.log('Component: received data', res);
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Component: error', err);
        this.error = err.message || 'Error desconocido al cargar el clima';
        this.loading = false;
      }
    });
  }
}
