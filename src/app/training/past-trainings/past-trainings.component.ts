import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training.service';
import { Activity } from '../activity.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrl: './past-trainings.component.scss'
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories'];
  dataSource = new MatTableDataSource<Activity>();

  @ViewChild(MatSort) sort: MatSort; // sorting functionality
  @ViewChild(MatPaginator) paginator: MatPaginator; // pagination functionality

  constructor (private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getPastActivities();
  }

  ngAfterViewInit(): void {
    // dataSource must be connected and rendered before sorting/pagination can be applied
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
