import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzFormModule,
    NzDatePickerModule,
    NzButtonModule
  ]
})
export class BookCarComponent implements OnInit {

  carId!: number;
  car: any;
  processedImage: string | undefined;
  validateForm!: FormGroup;
  isSpinning = false;
  dateFormat = 'dd/MM/yyyy';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: CustomerService,
    private message: NzMessageService,
    private router: Router
  ) {}


  ngOnInit(): void {
    // Get the car ID from the URL
    this.carId = Number(this.route.snapshot.paramMap.get('id'));

    // Initialize form
    this.validateForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });

    // Fetch car data
    this.getCarById();
  }

  getCarById(): void {
    this.service.getCarById(this.carId).subscribe({
      next: (res: any) => {
        this.car = res;
        if (res.returnedImage) {
          this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
        }
      },
      error: (err: any) => console.error('Error fetching car', err)
    });
  }

  bookACar(data: any): void {
    console.log(data);
    console.log('Token:', StorageService.getToken());
    console.log('User:', StorageService.getUser());
    console.log('User Role:', StorageService.getUserRole());
    console.log('Is Customer Logged In:', StorageService.isCustomerLoggedIn());
    if (!StorageService.isCustomerLoggedIn()) {
      this.message.error("You must be logged in as a customer to book a car.", { nzDuration: 5000 });
      this.router.navigateByUrl("/login");
      return;
    }
    this.isSpinning = true;
    let bookACarDto = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    };
    this.service.bookACar(this.carId, bookACarDto).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message.success("Car booked successfully!", { nzDuration: 5000 });
        this.router.navigateByUrl("/customer/dashboard");
      },
      error: (error: any) => {
        console.log(error);
        this.isSpinning = false;
        this.message.error("Something went wrong, Please try again.", { nzDuration: 5000 });
      }
    });
  }
}                         
