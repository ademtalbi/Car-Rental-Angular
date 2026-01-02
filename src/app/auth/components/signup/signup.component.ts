import { Component, OnInit } from '@angular/core';
import { NzRowDirective, NzColDirective } from "ng-zorro-antd/grid";
import { NzFormDirective, NzFormItemComponent, NzFormControlComponent } from "ng-zorro-antd/form";
import { NgIf } from "@angular/common";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzSpinComponent } from "ng-zorro-antd/spin";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NzRowDirective, NzColDirective, NzFormDirective, NzFormItemComponent, NzFormControlComponent, NgIf, NzInputDirective, NzButtonComponent, NzSpinComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  isSpinning:boolean=false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,
  private authService: AuthService,
  private message: NzMessageService,
  private router:Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name:[null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  register() {
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe((res) => {
      console.log(res);
      if(res.id != null){
        this.message.success("Signup Successful.",{nzDuration:5000});
        this.router.navigateByUrl('/login');
    } else {
        this.message.error("Signup Failed.",{nzDuration:5000});
      }
    }
  )
  }
}
