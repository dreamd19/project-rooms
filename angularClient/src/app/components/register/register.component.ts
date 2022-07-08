import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert!: ElementRef;
  register: Student = {
    email: '',
    password: '',
    confpassword: ""
  };
  submitted = false;
  message = '';
  isCheck = true;

  constructor(
    private registerService: RegisterService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    const data = {
      email: this.register.email,
      password: this.register.password,
    };
    
    if(this.register.email && this.register.password && this.register.confpassword){
      this.submitted = false;
      this.registerService.create(data)
        .subscribe({
          next: (res) => {
            this.message = res.message ? res.message : 'Successfully!';
            setTimeout(() => {
              this.router.navigate(['/']) ;
            }, 1000);
            // this.submitted = true;
          },
          error: (e) => console.error(e)
        });
    }else{
      this.submitted = true
      this.message = 'กรอกข้อมูลให้ครบ!';
      return
    }

    
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = this.register.password;
    let confirmPass = this.register.confpassword;
    this.message = 'รหัสผ่านไม่ตรงกัน!';
    return pass === confirmPass ? null : { notSame: true }
  }


}
