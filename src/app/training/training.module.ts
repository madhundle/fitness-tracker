import { NgModule } from "@angular/core";

import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { PauseTrainingComponent } from "./current-training/pause-training.component";

import { MaterialModule } from "../material.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    PauseTrainingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    provideFirestore(() => getFirestore())
  ],
  exports: []
})
export class TrainingModule {}