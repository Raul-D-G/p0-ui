import { TranzactiiComponent } from './pages/tranzactii/tranzactii.component';
import { VeziTransporturileTaleComponent } from './pages/vezi-transporturile-tale/vezi-transporturile-tale.component';
import { AdaugaTransporturiComponent } from './pages/adauga-transporturi/adauga-transporturi.component';

import { ExpeditiiGuardGuard } from './../guards/expeditii-guard.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'companie/adaugaTransport',
    component: AdaugaTransporturiComponent,
    canActivate: [ExpeditiiGuardGuard],
  },
  {
    path: 'companie/veziTransporturi',
    component: VeziTransporturileTaleComponent,
    canActivate: [ExpeditiiGuardGuard],
  },
  {
    path: 'companie/tranzactii',
    component: TranzactiiComponent,
    canActivate: [ExpeditiiGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpeditiiRoutingModule {}
