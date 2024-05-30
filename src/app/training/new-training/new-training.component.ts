import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Activity } from '../activity.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from "../../app.reducer";
import * as fromTraining from "../training.reducer";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss'
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // replaced by NgRx state management
  // activities: Activity[] = []; 
  // activitiesSub: Subscription;
  // isLoading = true;
  activities$: Observable<Activity[]>;
  isLoading$: Observable<boolean>;

  // replaced by TrainingService
  // public training = ['cardio', 'aerobics', 'running', 'walking'];
  // @Output() trainingStart = new EventEmitter<void>();

  constructor (private trainingService: TrainingService,
               private store: Store<fromTraining.State> ) {
    // replaced by Firestore
    // this.activities = this.trainingService.getAvailableActivities();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.trainingService.fetchAvailableActivities();
    this.activities$ = this.store.select(fromTraining.getAvailableActivities);
    // replaced by NgRx state management
    // this.activitiesSub = this.trainingService.availableActivitiesChanged.subscribe(
    //   activities => {
    //     this.activities = activities;
    //     // this.isLoading = false;
    //   }
    // );
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
    // if (this.activitiesSub) {
    //   this.activitiesSub.unsubscribe();
    // }
  }
}

