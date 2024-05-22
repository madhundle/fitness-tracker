import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  smallScreen: boolean;
  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter();
  isAuth: boolean;
  authSub: Subscription;

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService) {}

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
    this.authSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }  
}
