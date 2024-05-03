import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PauseTrainingComponent } from './pause-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.scss'
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  complete = false;

  // https://stackoverflow.com/questions/55550096/ts2322-type-timeout-is-not-assignable-to-type-number-when-running-unit-te
  timer: number | undefined | ReturnType<typeof setTimeout>;

  @Output() trainingStop = new EventEmitter();

  constructor(private pauseDialog: MatDialog) {}

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    // start (or resume) the timer

    // increase progress by 5% each second
    this.timer = setInterval(() => {
      this.progress = this.progress + 20;
      
      // if complete, stop the timer
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.complete = true;
      }
    }, 1000);

  }

  onPause() {
    // stop the timer
    clearInterval(this.timer);

    // open the pause dialog
    const pauseDialogRef = this.pauseDialog.open(
      PauseTrainingComponent, 
      { data: { progress: this.progress }}
    );

    // process choice to resume or stop
    pauseDialogRef.afterClosed().subscribe(result => {
      // stop
      if (result) {
        this.trainingStop.emit();
      }
      
      // resume
      else {
        this.startTimer();
      }
    });
  }

  onExit() {
    this.trainingStop.emit();
  }
}
