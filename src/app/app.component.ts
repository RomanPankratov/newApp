import { Component, OnInit } from '@angular/core';
import { Car } from './car.model';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarListComponent } from './car-list/car-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule, Router } from '@angular/router';
import { CarDetailComponent } from "./car-detail/car-detail.component";
import { FilterService } from './filter.service'; // Импортируйте сервис

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CarListComponent, PaginationComponent, RouterModule, CarDetailComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router, private filterService: FilterService) {}

  isHomePage(): boolean {
    // Если текущий URL равен '/' - это главная страница
    return this.router.url === '/';
  }

  

  cars: Car[] = [
    { model: 'Silvia S13', engine: 'SR20DET', type: 'Drift', price: 15000, hp: 350 },
    { model: 'Toyota Supra', engine: '2JZ', type: 'Drag', price: 23000, hp: 600 },
    { model: 'Silvia S15', engine: '2JZ', type: 'Drift', price: 25000, hp: 650},
    { model: 'Mazda MX5', engine: 'JZ', type: 'Comfort', price: 8000, hp: 250},
    { model: 'Nissan GTR R34', engine: 'RB25', type: 'Comfort', price: 30000, hp: 500},
    { model: 'Toyota Mark II', engine: 'JZ', type: 'Drag', price: 22000, hp: 450},
    { model: 'Toyota Chaser', engine: '2JZ', type: 'Drift', price: 25000, hp: 620},
    // Другие объекты Car
  ];

  filteredCars: Car[] = [...this.cars];

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = Math.ceil(this.filteredCars.length / this.itemsPerPage);

  ngOnInit() {
    // Подписка на изменения состояния фильтров
    this.filterService.filters$.subscribe(filters => {
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
      this.totalPages = Math.ceil(this.filteredCars.length / this.itemsPerPage);
      this.currentPage = 1;
    });
  }

  onFiltersChanged(filters: any) {
    this.filterService.setFilters(filters);
  }

  onResetFilters() {
    this.filterService.setFilters({
      searchText: '',
      selectedEngines: [],
      selectedType: '',
      selectedSort: 'none'
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get paginatedCars() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCars.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
