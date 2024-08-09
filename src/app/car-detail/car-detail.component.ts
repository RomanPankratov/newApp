import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, CarDetailComponent],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car!: Car | undefined;

  cars: Car[] = [
    { model: 'Silvia S13', engine: 'SR20DET', type: 'Drift', price: 15000, hp: 350 },
    { model: 'Toyota Supra', engine: '2JZ', type: 'Drag', price: 23000, hp: 600 },
    { model: 'Silvia S15', engine: '2JZ', type: 'Drift', price: 25000, hp: 650},
    { model: 'Mazda MX5', engine: 'JZ', type: 'Comfort', price: 8000, hp: 250},
    { model: 'Nissan GTR R34', engine: 'RB25', type: 'Comfort', price: 30000, hp: 500},
    { model: 'Toyota Mark II', engine: 'JZ', type: 'Drag', price: 22000, hp: 450},
    { model: 'Toyota Chaser', engine: '2JZ', type: 'Drift', price: 25000, hp: 620},
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const model = params.get('model');
      this.car = this.cars.find(car => car.model === model);
    });
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
