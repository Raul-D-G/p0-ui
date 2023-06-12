import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransporturiBursaComponent } from './components/transporturi-bursa/transporturi-bursa.component';

import { TransportatorGuardGuard } from '../guards/transportator-guard.guard';
import { TransporturiEfectuateComponent } from './pages/transporturi-efectuate/transporturi-efectuate.component';

const routes: Routes = [
  {
    path: 'companie/bursaTransporturi',
    component: TransporturiBursaComponent,
    canActivate: [TransportatorGuardGuard],
  },
  {
    path: 'companie/transporturiEfectuate',
    component: TransporturiEfectuateComponent,
    canActivate: [TransportatorGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanieRoutingModule {}
