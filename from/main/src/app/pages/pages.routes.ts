// src/app/pages/pages.routes.ts
import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StarterComponent,
        data: {
          title: 'Starter',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Starter' },
          ],
        },
      },
      {
        path: 'rooms',
        loadComponent: () =>
          import('./rooms/room-list.component').then(
            (m) => m.ListRoomsComponent
          ),
        data: {
          title: 'Rooms',
        },
      }
    ],
  },
];
