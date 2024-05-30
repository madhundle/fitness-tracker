import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { take } from "rxjs";
import { Activity } from "./activity.model";
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as UIActions from "../shared/ui.actions";
import * as fromTraining from "./training.reducer";
import * as TrainingActions from "./training.actions";

// Manage all training for a user
@Injectable() // allow for injection of Firestore
export class TrainingService {
  // replaced by NgRx state management
  // private currentActivity: Activity;
  // private pastActivities: Activity[] = [];
  // private availableActivities: Activity[] = [
    // dummy data no longer used; fetching from Firestore
    // { id: 'cardio', name: 'Cardio', duration: 30*60, calPerMin: 1 },
    // { id: 'aerobics', name: 'Aerobics', duration: 30*60, calPerMin: 2},
    // { id: 'running', name: 'Running', duration: 30*60, calPerMin: 3.2 },
    // { id: 'walking', name: 'Walking', duration: 15*60, calPerMin: 0.75 },
    // { id: 'sprints', name: 'Sprinting', duration: 60, calPerMin: 4 }
  // ];

  // activityStatusChanged = new Subject<Activity>();
  // availableActivitiesChanged = new Subject<Activity[]>();
  // pastActivitiesChanged = new Subject<Activity[]>();

  availableActivitiesUnsub: any; // firestore listener
  availableActivitiesRef: any; // reference to Firestore collection
  pastActivitiesUnsub: any; // firestore listener
  pastActivitiesRef: any; // reference to Firestore collection

  constructor (private db: Firestore, 
               private uiService: UIService,
               private store: Store<fromTraining.State>) {
    // set up Firestore references    
    this.availableActivitiesRef = collection(this.db, 'availableActivities');
    this.pastActivitiesRef = collection(this.db, 'pastActivities');
  }

  // create real-time listener to availableActivities in Firestore
  fetchAvailableActivities() {
    // dispatch loading state
    this.store.dispatch(new UIActions.StartLoading());

    // create listener to that reference which responds to changes
    this.availableActivitiesUnsub = onSnapshot(
      this.availableActivitiesRef, 
      (snapshot) => { // onNext
        // console.log(snapshot.docs); // array of 'QueryDocumentSnapshot's
        const availableActivities = snapshot.docs.map(doc => 
          ({...doc.data(), id: doc.id} as Activity));

        // replaced by NgRx state management
        // this.availableActivitiesChanged.next([...this.availableActivities]);
        this.store.dispatch(new TrainingActions.SetAvailableActivities([...availableActivities]));

        // alternate method to map
        // snapshot.forEach((doc) => {
          // console.log(doc.id); // firestore id
          // console.log(doc.data()); // objects with name, calPerMin, duration
          // console.log({...doc.data(), id: doc.id} as Activity);
          // this.activities.push({...doc.data(), id: doc.id} as Activity);
        // })

        this.store.dispatch(new UIActions.StopLoading());
      },
      (error) => { // onError
        console.log("Error fetching available activities");
        console.log(error);
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.showSnackBar("Error fetching available activities, please try again later", null, 3000);
      }
    );
  }

  // create real-time listener to pastActivities in Firestore
  fetchPastActivities() {
    // dispatch loading state
    this.store.dispatch(new UIActions.StartLoading());

    this.pastActivitiesUnsub = onSnapshot(
      this.pastActivitiesRef, 
      (snapshot) => { // onNext
        const pastActivities = snapshot.docs.map(doc =>
          ({...doc.data(), date: doc.get('date').toDate(), id: doc.id} as Activity)); 

        // replaced by NgRx state management
        // this.pastActivitiesChanged.next([...this.pastActivities]); 
        this.store.dispatch(new TrainingActions.SetPastActivities([...pastActivities]));

        this.store.dispatch(new UIActions.StopLoading());
      },
      (error) => { // onError
        console.log("Error fetching past activities");
        console.log(error);
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.showSnackBar("Error fetching past activities, please try again later", null, 3000);
      }
    )
  }
  
  // start an activity
  startActivity(selectedId: string) {
    // replaced by NgRx state management    
    // from the Id, store the Activity the user selected
    // this.currentActivity = this.availableActivities.find(
    //   act => act.id === selectedId
    // )
    // this.activityStatusChanged.next({...this.currentActivity});

    // tell the rest of the app
    this.store.dispatch(new TrainingActions.StartActivity(selectedId));
  }

  // complete the current activity
  completeActivity() {
    this.store.select(fromTraining.getCurrentActivity).pipe(take(1)).subscribe(activity => {
      // record the completed activity
      // this.pastActivities.push({ // replaced by Firestore
      this.pushPastActivity({
        ...activity,
        date: new Date(),
        state: 'completed',
        calTotal: activity.duration / 60 * activity.calPerMin
      });
      // replaced by NgRx state management
      // reset the current activity to none
      // this.currentActivity = null;
      // this.activityStatusChanged.next(null);
      this.store.dispatch(new TrainingActions.StopActivity());
    });
  }

  // cancel the current activity
  cancelActivity(progress: number) {
    this.store.select(fromTraining.getCurrentActivity).pipe(take(1)).subscribe(activity => {
      // progress is the percent the activity is complete from 0-100 
      let activityTime = activity.duration * progress / 100; // seconds
      // record the cancelled activity
      // this.pastActivities.push({ // replaced by Firestore
      this.pushPastActivity({
        ...activity,
        date: new Date(),
        state: 'cancelled',
        duration: activityTime,
        calTotal: activityTime / 60 * activity.calPerMin
      });
      // replaced by NgRx state management
      // reset the current activity to none
      // this.currentActivity = null;
      // this.activityStatusChanged.next(null);
      this.store.dispatch(new TrainingActions.StopActivity());
    });
  }

  // push a past activity to the Firestore
  private pushPastActivity(activity: Activity) {
    addDoc(this.pastActivitiesRef, activity);
  }

  // unsubscribe
  cancelSubs() {
    this.availableActivitiesUnsub();
    this.pastActivitiesUnsub();
  }

  // // safely provide the available activities
  // getAvailableActivities() {
  //   // protect the data from editing by returning a copy, not a reference
  //   return this.availableActivities.slice();
  // }

  // // safely provide the past activities
  // getPastActivities() {
  //   return this.pastActivities.slice();
  // }

  // // safely provide the current activity
  // getCurrentActivity() {
  //   return { ...this.currentActivity };
  // }

}