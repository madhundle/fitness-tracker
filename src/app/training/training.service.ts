import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Activity } from "./activity.model";
import { Subject } from "rxjs";
import { Injectable } from '@angular/core';

// Manage all training for a user
@Injectable() // allow for injection of Firestore
export class TrainingService {
  private availableActivities: Activity[] = [
    // dummy data no longer used; fetching from Firestore
    // { id: 'cardio', name: 'Cardio', duration: 30*60, calPerMin: 1 },
    // { id: 'aerobics', name: 'Aerobics', duration: 30*60, calPerMin: 2},
    // { id: 'running', name: 'Running', duration: 30*60, calPerMin: 3.2 },
    // { id: 'walking', name: 'Walking', duration: 15*60, calPerMin: 0.75 },
    // { id: 'sprints', name: 'Sprinting', duration: 60, calPerMin: 4 }
  ];

  private currentActivity: Activity;
  private pastActivities: Activity[] = [];

  activityStatusChanged = new Subject<Activity>();
  availableActivitiesChanged = new Subject<Activity[]>();
  pastActivitiesChanged = new Subject<Activity[]>();

  availableActivitiesUnsub: any; // firestore listener
  availableActivitiesRef: any; // reference to Firestore collection
  pastActivitiesUnsub: any; // firestore listener
  pastActivitiesRef: any; // reference to Firestore collection

  constructor (private db: Firestore) {
    // set up Firestore references    
    this.availableActivitiesRef = collection(this.db, 'availableActivities');
    this.pastActivitiesRef = collection(this.db, 'pastActivities');
  }

  // create real-time listener to availableActivities in Firestore
  fetchAvailableActivities() {
    // create listener to that reference which responds to changes
    this.availableActivitiesUnsub = onSnapshot(
      this.availableActivitiesRef, 
      (snapshot) => { // onNext
        // console.log(snapshot.docs); // array of 'QueryDocumentSnapshot's
        this.availableActivities = snapshot.docs.map(doc => 
          ({...doc.data(), id: doc.id} as Activity));
        // console.log("onSnapshot:", this.activities);
        this.availableActivitiesChanged.next([...this.availableActivities]);
        
        // alternate method to map
        // snapshot.forEach((doc) => {
          // console.log(doc.id); // firestore id
          // console.log(doc.data()); // objects with name, calPerMin, duration
          // console.log({...doc.data(), id: doc.id} as Activity);
          // this.activities.push({...doc.data(), id: doc.id} as Activity);
        // })
      },
      (error) => { // onError
        console.log("Error fetching available activities");
        console.log(error);
      }
    );
    // console.log("OnInit:", this.activities);
  }

  // safely provide the available activities
  getAvailableActivities() {
    // protect the data from editing by returning a copy, not a reference
    return this.availableActivities.slice();
  }

  // safely provide the current activity
  getCurrentActivity() {
    return { ...this.currentActivity };
  }

  // safely provide the past activities
  getPastActivities() {
    return this.pastActivities.slice();
  }

  // start an activity
  startActivity(selectedId: string) {
    // from the Id, store the Activity the user selected
    this.currentActivity = this.availableActivities.find(
      act => act.id === selectedId
    )
    // tell the rest of the app
    this.activityStatusChanged.next({...this.currentActivity});
  }

  // complete the current activity
  completeActivity() {
    // record the completed activity
    // this.pastActivities.push({ // replaced by Firestore
    this.pushPastActivity({
      ...this.currentActivity,
      date: new Date(),
      state: 'completed',
      calTotal: this.currentActivity.duration / 60 * this.currentActivity.calPerMin
    });
    // reset the current activity to none
    this.currentActivity = null;
    this.activityStatusChanged.next(null);
  }

  // cancel the current activity
  cancelActivity(progress: number) {
    // progress is the percent the activity is complete from 0-100 
    let activityTime = this.currentActivity.duration * progress / 100; // seconds
    // record the cancelled activity
    // this.pastActivities.push({ // replaced by Firestore
    this.pushPastActivity({
      ...this.currentActivity,
      date: new Date(),
      state: 'cancelled',
      duration: activityTime,
      calTotal: activityTime / 60 * this.currentActivity.calPerMin
    });
    // reset the current activity to none
    this.currentActivity = null;
    this.activityStatusChanged.next(null);
  }

  // create real-time listener to pastActivities in Firestore
  fetchPastActivities() {
    this.pastActivitiesUnsub = onSnapshot(
      this.pastActivitiesRef, 
      (snapshot) => { // onNext
        this.pastActivities = snapshot.docs.map(doc =>
          ({...doc.data(), date: doc.get('date').toDate(), id: doc.id} as Activity)); 
        // *Could refactor to just emit the pastActivities instead of storing*
        this.pastActivitiesChanged.next([...this.pastActivities]); 
      },
      (error) => { // onError
        console.log("Error fetching past activities");
        console.log(error);
      }
    )
  }

  // push a past activity to the Firestore
  private pushPastActivity(activity: Activity) {
    addDoc(this.pastActivitiesRef, activity);
  }

}