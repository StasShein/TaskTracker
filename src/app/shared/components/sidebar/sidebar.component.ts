import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private subscriptions = new Subscription();
  public chooseActiveButton!: boolean;

  constructor(public route: Router) {}

  ngOnInit(): void {
    this.route.url.includes('/tasks/add')
      ? (this.chooseActiveButton = true)
      : (this.chooseActiveButton = false);
    this.subscriptions.add(
      this.route.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          event.url.includes('/tasks/add')
            ? (this.chooseActiveButton = true)
            : (this.chooseActiveButton = false);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
