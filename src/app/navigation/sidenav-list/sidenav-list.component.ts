import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss'
})
export class SidenavListComponent {
  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter();
  
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
