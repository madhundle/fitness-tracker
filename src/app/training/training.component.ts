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
  selectedIndex = 0;

  constructor (private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.activitySub = this.trainingService.activityStatusChanged.subscribe(
      activity => {
        if (activity) { // confirm it's a valid activity
          this.activeTraining = true;
        }
        else { // if an activity ended
          this.activeTraining = false;
          // display the Past Training tab when navigating from an activity that just finished
          this.selectedIndex = 1;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.activitySub) {
      this.activitySub.unsubscribe();
    }
  }
}
