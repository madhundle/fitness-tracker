import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
// import { Subject } from "rxjs";

@Injectable()
export class UIService {
  // replaced by NgRx state management
  // loadingState = new Subject<boolean>();

  constructor (private snackBar: MatSnackBar) {}

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, { duration: duration });
  }
}