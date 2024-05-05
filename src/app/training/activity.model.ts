// The data about an individual training session
export interface Activity {
  id: string;                                    // a unique id
  name: string;                                  // a descriptive name
  calPerMin: number;                             // calorie burned per minute
  duration?: number;                             // duration (in seconds)
  date?: Date;                                   // date activity occurred
  state?: 'completed' | 'cancelled' | null;      // state of activity
}