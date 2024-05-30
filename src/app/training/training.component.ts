import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from "./training.reducer";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit {
  // replaced by NgRx state management
  // activeTraining = false;
  // activitySub: Subscription;
  selectedIndex = 0;
  isCurrentlyTraining$: Observable<boolean>;

  constructor ( private store: Store<fromTraining.State>) {}

  ngOnInit(): void {
    // replaced by NgRx state management
    // this.activitySub = this.trainingService.activityStatusChanged.subscribe(
    //   activity => {
    //     if (activity) { // confirm it's a valid activity
    //       this.activeTraining = true;
    //     }
    //     else { // if an activity ended
    //       this.activeTraining = false;
    //       // display the Past Training tab when navigating from an activity that just finished
    //       this.selectedIndex = 1;
    //     }
    //   }
    // );

    this.isCurrentlyTraining$ = this.store.select(fromTraining.getIsCurrentlyTraining);
    // ***find a new way to navigate to Past Training when an activity has just finished
    // this makes it so selectedIndex even starts on '1'
    // .pipe(
    //   tap(isCurrentlyTraining => {
    //     if(!isCurrentlyTraining) {
    //       this.selectedIndex = 1;
    //     }
    //   })
    // );
  }

  // ngOnDestroy(): void {
  //   if (this.activitySub) {
  //     this.activitySub.unsubscribe();
  //   }
  // }
}
