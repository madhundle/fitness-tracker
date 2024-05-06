import { Activity } from "./activity.model";
import { Subject } from "rxjs";

// Manage all training for a user
export class TrainingService {
  private availableActivities: Activity[] = [
    { id: 'cardio', name: 'Cardio', duration: 30*60, calPerMin: 1 },
    { id: 'aerobics', name: 'Aerobics', duration: 30*60, calPerMin: 2},
    { id: 'running', name: 'Running', duration: 30*60, calPerMin: 3.2 },
    { id: 'walking', name: 'Walking', duration: 15*60, calPerMin: 0.75 },
    { id: 'sprints', name: 'Sprinting', duration: 60, calPerMin: 4 }
  ];

  private currentActivity: Activity;
  private pastActivities: Activity[] = [];
  activityChanged = new Subject<Activity>();

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
    this.activityChanged.next({...this.currentActivity});
  }

  // complete the current activity
  completeActivity() {
    // record the completed activity
    this.pastActivities.push({
      ...this.currentActivity,
      date: new Date(),
      state: 'completed',
      calTotal: this.currentActivity.duration / 60 * this.currentActivity.calPerMin
    });
    // reset the current activity to none
    this.currentActivity = null;
    this.activityChanged.next(null);
  }

  // cancel the current activity
  cancelActivity(progress: number) {
    // progress is the percent the activity is complete from 0-100 
    let activityTime = this.currentActivity.duration * progress / 100; // seconds
    // record the cancelled activity
    this.pastActivities.push({
      ...this.currentActivity,
      date: new Date(),
      state: 'cancelled',
      duration: activityTime,
      calTotal: activityTime / 60 * this.currentActivity.calPerMin
    });
    // reset the current activity to none
    this.currentActivity = null;
    this.activityChanged.next(null);
  }
}