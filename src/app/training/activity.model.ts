// The data about an individual training session
// Flexible interface that can describe an available activity or a past activity
export interface Activity {
  id: string;                                    // a unique id
  name: string;                                  // a descriptive name
  calPerMin: number;                             // calories burned per minute
  calTotal?: number;                             // total calories burned
  duration?: number;                             // duration (in seconds)
  date?: Date;                                   // date activity occurred
  state?: 'completed' | 'cancelled' | null;      // state of activity
}