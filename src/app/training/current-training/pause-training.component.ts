import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pause-training',
  templateUrl: './pause-training.component.html',
  styleUrl: './pause-training.component.scss'
})
export class PauseTrainingComponent {
  // Must inject MAT_DIALOG_DATA to receive data from the calling component
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}