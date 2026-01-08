import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../service/customer.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, NzSpinModule, NzTableModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {

  bookings: any
  isSpinning = false;

  constructor(private service: CustomerService) {
    this.getMyBookings();
  }

  getMyBookings() {
    this.isSpinning = true;
    this.service.getBookingsByUserId().subscribe((res) => {
      this.isSpinning = false;
     // console.log(res);
      this.bookings = res;
    })

}
}