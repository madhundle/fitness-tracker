import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss'
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter();
  isAuth: boolean;
  authSub: Subscription;

  constructor (private authService: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.onToggleSidenav();
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
