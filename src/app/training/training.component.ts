import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit, OnDestroy {
  activeTraining = false;
  activitySub: Subscription;

  constructor (private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.activitySub = this.trainingService.activityChanged.subscribe(
      activity => {
        if (activity) { // confirm it's a valid activity 
          this.activeTraining = true;
        }
        else {
          this.activeTraining = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.activitySub.unsubscribe();
  }
}
