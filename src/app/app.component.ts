import { Component } from '@angular/core';
import { Car } from './car.model';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarListComponent } from './car-list/car-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CarListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cars: Car[] = [
    { model: 'Silvia S13', engine: 'SR20DET', type: 'Drift', price: 15000, hp: 350 },
    { model: 'Toyota Supra', engine: '2JZ', type: 'Drag', price: 23000, hp: 600 },
    { model: 'Silvia S15', engine: '2JZ', type: 'Drift', price: 25000, hp: 650},
    { model: 'Mazda MX5', engine: 'JZ', type: 'Comfort', price: 8000, hp: 250},
    { model: 'Nissan GTR R34', engine: 'RB25', type: 'Comfort', price: 30000, hp: 500},
    // Другие объекты Car
  ];

  filteredCars: Car[] = [...this.cars];

  onFiltersChanged(filters: any) {
    this.filteredCars = this.cars
      .filter(car => car.model.toLowerCase().includes(filters.searchText.toLowerCase()))
      .filter(car => filters.selectedEngines.length ? filters.selectedEngines.includes(car.engine) : true)
      .filter(car => filters.selectedType ? car.type === filters.selectedType : true)
      .sort((a, b) => {
        if (filters.selectedSort === 'asc') {
          return a.price - b.price;
        } else if (filters.selectedSort === 'desc') {
          return b.price - a.price;
        } else {
          return 0;
        }
      });
  }

  onResetFilters() {
    this.filteredCars = [...this.cars];
  }
}
