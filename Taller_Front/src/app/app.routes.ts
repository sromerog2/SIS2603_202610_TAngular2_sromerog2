import { Routes } from '@angular/router';
import { CityListComponent } from './components/city-list/city-list.component';

export const routes: Routes = [
  { path: '', component: CityListComponent },
  { path: '**', redirectTo: '' }
];
