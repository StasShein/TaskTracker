import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { TaskInfoComponent } from './components/task-info/task-info.component';

@Component({
  selector: 'app-task-tracker',
  standalone: true,
  imports: [
    HeaderComponent,
    TaskTableComponent,
    SidebarComponent,
    TaskInfoComponent,
    RouterOutlet,
  ],
  templateUrl: './task-tracker.component.html',
  styleUrl: './task-tracker.component.scss',
})
export class TaskTrackerComponent {}
