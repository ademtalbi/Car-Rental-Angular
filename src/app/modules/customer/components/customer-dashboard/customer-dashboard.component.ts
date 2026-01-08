import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomerService } from '../../../customer/service/customer.service';
import { NgZorroImportsModule } from "../../../../NgZorroImportsModule";
import { AdminRoutingModule } from "../../../admin/admin-routing.module";

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule, // (ngIf / ngFor)
    DatePipe,
    NgZorroImportsModule,
    AdminRoutingModule
],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'] 
})
export class CustomerDashboardComponent implements OnInit {

  cars: any[] = [];

  constructor(private service: CustomerService) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(): void {
    this.service.getAllCars().subscribe((res: any[]) => {
      this.cars = res.map(car => ({
        ...car,
        processedImg: 'data:image/jpeg;base64,' + car.returnedImage
      }));
    });
  }
}
