import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { AppTablesComponent } from './ui-components/tables/tables.component'; // AJUSTA ESTA RUTA SI ES NECESARIO

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
        path: 'reservations',
        component: AppTablesComponent,
        data: {
          title: 'Reservations',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Reservations' },
          ],
        },
      }
    ]
  }
];
