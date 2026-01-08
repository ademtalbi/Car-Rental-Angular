import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgForOf, DatePipe } from "@angular/common";
import { NgZorroImportsModule } from "../../../../NgZorroImportsModule";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgForOf, DatePipe, NgZorroImportsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(private adminService: AdminService,
    private message: NzMessageService ) { }

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
  deleteCar(id: number) {
    console.log("Deleting car with ID:", id);
    this.adminService.deleteCar(id).subscribe((res) => {
      this.getAllCars(); // Refresh the car list after deletion
      this.message.success('Car deleted successfully', {nzDuration: 5000});
    });
  }
}
