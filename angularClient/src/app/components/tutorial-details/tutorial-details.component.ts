import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss'],
})
export class TutorialDetailsComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert!: ElementRef;
  @Input() viewMode = false;
  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    numberOfStuden: 0,
    published: false
  };
  
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,) { }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTutorial = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };
    this.message = '';
    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          
          this.currentTutorial.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateTutorial(): void {
    this.message = '';
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/']) ;
          }, 1000);
          
        },
        error: (e) => console.error(e)
      });
  }
  
  deleteTutorial(): void {
    if(confirm("Are you sure to delete "+ this.currentTutorial.title)) {
      this.tutorialService.delete(this.currentTutorial.id)
      .subscribe({
        next: (res) => {
          this.message = res.message ? res.message : 'Delete successfully!';
          setTimeout(() => {
            this.router.navigate(['/tutorials']);
          }, 1000);
          
        },
        error: (e) => console.error(e)
      });
    }
  }

}
