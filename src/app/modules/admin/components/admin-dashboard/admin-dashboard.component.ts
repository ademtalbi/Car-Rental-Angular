import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgForOf, DatePipe } from "@angular/common";
import { NgZorroImportsModule } from "../../../../NgZorroImportsModule";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgForOf, DatePipe, NgZorroImportsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res)=>{
      console.log(res);
      res.forEach((element: any) =>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    })
  }
}
