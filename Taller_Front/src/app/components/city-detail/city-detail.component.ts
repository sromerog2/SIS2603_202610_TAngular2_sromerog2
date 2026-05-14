import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city.model';
import { WeatherDetail } from '../../models/weather.model';
import { WeatherRecord } from '../../models/weather-record.model';
import { WeatherService } from '../../services/weather.service';
import { WeatherRecordService } from '../../services/weather-record.service';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-detail.component.html'
})
export class CityDetailComponent implements OnChanges {
  private weatherService = inject(WeatherService);
  private weatherRecordService = inject(WeatherRecordService);

  @Input() city!: City;

  weatherDetail: WeatherDetail | null = null;
  loading = false;
  weatherRecords: WeatherRecord[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      // HU-03: Cargar clima actual
      this.loading = true;
      this.weatherDetail = null;
      this.weatherService.getWeather(this.city.name).subscribe({
        next: detail => {
          this.weatherDetail = detail;
          this.loading = false;
        },
        error: () => {
          this.weatherDetail = null;
          this.loading = false;
        }
      });

      // HU-04: Cargar historial
      this.loadRecords();
    }
  }

  loadRecords(): void {
    this.weatherRecordService.getRecords(this.city.id)
      .subscribe(records => this.weatherRecords = records);
  }

  saveWeather(): void {
    if (!this.weatherDetail) return;
    this.weatherRecordService.saveRecord(this.city.id, {
      tempC: this.weatherDetail.temp_c,
      condition: this.weatherDetail.condition,
      humidity: this.weatherDetail.humidity
    }).subscribe(() => this.loadRecords());
  }
}
