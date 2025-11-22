import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ReservationsListComponent } from './reservations/reservations-list/reservations-list.component';
import { ReservaCreateComponent } from './reservations/reservations-create/reservations-create.component'; // <-- IMPORTANTE

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
        component: ReservationsListComponent,
        data: {
          title: 'Reservations',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Reservations' },
          ],
        },
      },
      {
        path: 'reservations/create',
        component: ReservaCreateComponent,
        data: {
          title: 'Crear Reserva',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Reservations', url: '/reservations' },
            { title: 'Crear' }
          ],
        },
      }
    ]
  }
];
