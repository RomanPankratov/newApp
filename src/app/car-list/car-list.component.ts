import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../car.model';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {
  @Input() cars: Car[] = [];


}

