import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training.service';
import { Activity } from '../activity.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrl: './past-trainings.component.scss'
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories'];
  dataSource = new MatTableDataSource<Activity>();
  activitiesSub: Subscription;
  // isLoading = true; // replaced by NgRx state management
  isLoading$: Observable<boolean>;

  @ViewChild(MatSort) sort: MatSort; // sorting functionality
  @ViewChild(MatPaginator) paginator: MatPaginator; // pagination functionality

  constructor (private trainingService: TrainingService,
               private store: Store<fromRoot.State> ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    // this.dataSource.data = this.trainingService.getPastActivities(); // replaced by Firestore fetching
    this.trainingService.fetchPastActivities();
    this.activitiesSub = this.trainingService.pastActivitiesChanged.subscribe(
      activities => {
        this.dataSource.data = activities;
        // this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    // dataSource must be connected and rendered before sorting/pagination can be applied
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.trainingService.pastActivitiesUnsub) {
      this.trainingService.pastActivitiesUnsub(); // unsubscribe firestore listener
    }
    if (this.activitiesSub) {
      this.activitiesSub.unsubscribe();
    }
  }
}
