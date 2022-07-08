import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert!: ElementRef;
  tutorial: Tutorial = {
    title: '',
    description: '',
    numberOfStuden: 0,
    image: '',
    published: false
  };
  submitted = false;
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private router : Router) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      numberOfStuden: this.tutorial.numberOfStuden,
      image: this.tutorial.image
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
  
  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      numberOfStuden: 0,
      image: '',
      published: false
    };
  }

}
