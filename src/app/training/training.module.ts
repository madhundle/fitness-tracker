import { NgModule } from "@angular/core";

import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { PauseTrainingComponent } from "./current-training/pause-training.component";

import { SharedModule } from "../shared/shared.module";
import { TrainingRoutingModule } from "./training-routing.module";

import { StoreModule } from "@ngrx/store";
import { trainingReducer } from "./training.reducer";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    PauseTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    // map state slice 'training' to the trainingReducer for a lazily loaded module
    StoreModule.forFeature('training', trainingReducer)
  ]
})
export class TrainingModule {}