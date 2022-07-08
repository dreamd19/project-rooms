import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert!: ElementRef;
  register!: {
    email: '',
    password: '',
    confpassword: ""
  };
  submitted = false;
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      email: this.register.email,
      password: this.register.password,
    };

    this.tutorialService.create(data)
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
  }

}
