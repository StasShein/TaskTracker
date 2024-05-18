import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./task-tracker/task-tracker.routes').then((item) => item.routes),
  },
];
