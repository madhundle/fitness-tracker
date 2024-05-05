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
  activityStarted = new Subject<Activity>();

  startActivity(selectedId: string) {
    // from the Id, store the Activity the user selected
    this.currentActivity = this.availableActivities.find(
      act => act.id === selectedId
    )
    // tell the rest of the app
    this.activityStarted.next({...this.currentActivity});
  }
   
  // protect the data from editing by returning a copy, not a reference
  getAvailableActivities() {
    return this.availableActivities.slice();
  }

  getCurrentActivity() {
    return { ...this.currentActivity };
  }
}