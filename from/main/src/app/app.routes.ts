// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Dashboard principal
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/starter/starter.component').then(
            (m) => m.StarterComponent
          ),
      },

      // Students
      {
        path: 'students',
        loadComponent: () =>
          import('./pages/students/students.component').then(
            (m) => m.StudentsComponent
          ),
      },

      // ======= 👉 AGREGADO: LISTA DE HABITACIONES (ROOMS) =======
      {
  path: 'rooms',
  loadComponent: () =>
    import('./pages/rooms/room-list.component').then(
      (m) => m.ListRoomsComponent
    ),
    },


    {
  path: 'rooms/create',
  loadComponent: () =>
    import('./pages/rooms/room-create.component').then(
      (m) => m.RoomCreateComponent
    ),
},






      // Reservations list
      {
        path: 'reservations',
        loadComponent: () =>
          import('./pages/reservations/reservations-list/reservations-list.component').then(
            (m) => m.ReservationsListComponent
          ),
      },

      // Create reservation
      {
        path: 'reservations/create',
        loadComponent: () =>
          import('./pages/reservations/reservations-create/reservations-create.component').then(
            (m) => m.ReservaCreateComponent
          ),
      },
    ],
  },

  // Authentication layout
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },

  // Ruta no encontrada
  { path: '**', redirectTo: 'authentication/error' },
];
