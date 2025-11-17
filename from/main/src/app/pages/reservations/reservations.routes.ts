import { Routes } from '@angular/router';

export const ReservationsRoutes: Routes = [
  {
    path: '',  // Se accede como /reservations
    loadComponent: () =>
      import('../ui-components/tables/tables.component').then(m => m.AppTablesComponent),
  },
];
