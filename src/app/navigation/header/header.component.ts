import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  smallScreen: boolean;
  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver) {}

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
      console.log("small screen:", this.smallScreen);
    });    
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
