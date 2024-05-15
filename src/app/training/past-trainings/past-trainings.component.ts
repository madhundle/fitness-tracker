import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training.service';
import { Activity } from '../activity.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrl: './past-trainings.component.scss'
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories'];
  dataSource = new MatTableDataSource<Activity>();
  activitiesSub: Subscription;

  @ViewChild(MatSort) sort: MatSort; // sorting functionality
  @ViewChild(MatPaginator) paginator: MatPaginator; // pagination functionality

  constructor (private trainingService: TrainingService) {}

  ngOnInit(): void {
    // this.dataSource.data = this.trainingService.getPastActivities(); // replaced by Firestore fetching
    this.trainingService.fetchPastActivities();
    this.activitiesSub = this.trainingService.pastActivitiesChanged.subscribe(
      activities => (this.dataSource.data = activities)
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
    this.trainingService.pastActivitiesUnsub(); // unsubscribe firestore listener
    this.activitiesSub.unsubscribe();
  }
}
