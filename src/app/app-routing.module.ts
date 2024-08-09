import { Routes } from '@angular/router';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { AppComponent } from './app.component';

// Определяем маршруты
export const routes: Routes = [
//   { path: '', component: AppComponent },
  { path: 'car/:model', component: CarDetailComponent }
];

// Экспортируем маршруты
export default routes;
