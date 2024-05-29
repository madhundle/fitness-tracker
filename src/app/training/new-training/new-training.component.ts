import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Activity } from '../activity.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from "../../app.reducer";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss'
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  activities: Activity[] = [];
  activitiesSub: Subscription;
  // isLoading = true; // replaced by NgRx state management
  isLoading$: Observable<boolean>;

  // replaced by TrainingService
  // public training = ['cardio', 'aerobics', 'running', 'walking'];
  // @Output() trainingStart = new EventEmitter<void>();

  constructor (private trainingService: TrainingService,
               private store: Store<fromRoot.State> ) {
    // replaced by Firestore
    // this.activities = this.trainingService.getAvailableActivities();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.trainingService.fetchAvailableActivities();
    this.activitiesSub = this.trainingService.availableActivitiesChanged.subscribe(
      activities => {
        this.activities = activities;
        // this.isLoading = false;
      }
    );
  }

  // When a new training form is submitted, start the activity
  onStartTraining(form: NgForm) {
    console.log(form);
    // this.trainingStart.emit(); // replaced by TrainingService
    this.trainingService.startActivity(form.value.activityId);
  }

  ngOnDestroy(): void {
    if (this.trainingService.availableActivitiesUnsub) {
      this.trainingService.availableActivitiesUnsub(); // unsubscribe firestore listener
    }
    if (this.activitiesSub) {
      this.activitiesSub.unsubscribe();
    }
  }
}

