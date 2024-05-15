import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Activity } from '../activity.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss'
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  activities: Activity[] = [];
  activitiesSub: Subscription;

  // replaced by TrainingService
  // public training = ['cardio', 'aerobics', 'running', 'walking'];
  // @Output() trainingStart = new EventEmitter<void>();

  constructor (private trainingService: TrainingService) {
    // replaced by Firestore
    // this.activities = this.trainingService.getAvailableActivities();
  }

  ngOnInit(): void {
    this.trainingService.fetchAvailableActivities();
    this.activitiesSub = this.trainingService.availableActivitiesChanged.subscribe(
      activities => (this.activities = activities)
    );
  }

  // When a new training form is submitted, start the activity
  onStartTraining(form: NgForm) {
    console.log(form);
    // this.trainingStart.emit(); // replaced by TrainingService
    this.trainingService.startActivity(form.value.activityId);
  }

  ngOnDestroy(): void {
    this.trainingService.availableActivitiesUnsub(); // unsubscribe firestore listener
    this.activitiesSub.unsubscribe();
  }
}

