import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanieComponent } from './pages/companie/companie.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'companie', component: CompanieComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
