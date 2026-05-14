import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './city-create.component.html'
})
export class CityCreateComponent implements OnInit {
  @Output() cityCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private countryService = inject(CountryService);
  private cityService = inject(CityService);

  countries: Country[] = [];
  cityName = '';
  selectedCountryId: number | null = null;

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(c => this.countries = c);
  }

  get isValid(): boolean {
    return this.cityName.trim().length > 0 && this.selectedCountryId !== null;
  }

  save(): void {
    if (!this.isValid) return;
    this.cityService.createCity(this.selectedCountryId!, { name: this.cityName.trim() })
      .subscribe(() => this.cityCreated.emit());
  }
}
