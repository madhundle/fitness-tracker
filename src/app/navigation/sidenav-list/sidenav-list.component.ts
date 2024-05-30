import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss'
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter();
  isAuth$: Observable<boolean>;  
  // isAuth: boolean;
  // authSub: Subscription;

  constructor (private authService: AuthService,
               private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    // Subscribe to logins/logouts and update the Sidenav accordingly
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
    // replaced by NgRx state management
    // this.authSub = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.onToggleSidenav();
    this.authService.logoutUser();
  }

  // ngOnDestroy(): void {
  //   this.authSub.unsubscribe();
  // }
}
