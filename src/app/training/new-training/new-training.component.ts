import { Component, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Activity } from '../activity.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss'
})
export class NewTrainingComponent {
  public activities: Activity[];

  // replaced by TrainingService
  // public training = ['cardio', 'aerobics', 'running', 'walking'];
  // @Output() trainingStart = new EventEmitter<void>();

  constructor (private trainingService: TrainingService) {
    this.activities = this.trainingService.getAvailableActivities();
  }

  // When a new training form is submitted, start the activity
  onStartTraining(form: NgForm) {
    console.log(form);
    // this.trainingStart.emit(); // replaced by TrainingService
    this.trainingService.startActivity(form.value.activityId);
  }
}
