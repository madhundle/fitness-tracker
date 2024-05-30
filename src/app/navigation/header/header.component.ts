import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  smallScreen: boolean;
  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter();
  isAuth$: Observable<boolean>;
  // isAuth: boolean;
  // authSub: Subscription;

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    // Change the menu display depending on screen size
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .subscribe(result => {
      if(result.matches) {
        // Screen is HandsetPortrait
        this.smallScreen = true;
      }
      else {
        this.smallScreen = false;
      }
      // console.log("small screen:", this.smallScreen);
    });

    // Subscribe to logins/logouts and update the header accordingly
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
    // replaced by NgRx state management
    // this.authSub = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // })
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logoutUser();
  }

  // ngOnDestroy(): void {
  //   this.authSub.unsubscribe();
  // }  
}
