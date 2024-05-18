import { Routes } from '@angular/router';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { TaskTrackerComponent } from './task-tracker.component';
import { DialogCreateTaskComponent } from './components/create-task/create-task.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';

export const routes: Routes = [
  {
    path: '',
    component: TaskTrackerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: TaskTableComponent,
      },
      {
        path: 'add',
        component: DialogCreateTaskComponent,
      },
      {
        path: 'task/:id',
        component: TaskInfoComponent,
      },
    ],
  },
];
