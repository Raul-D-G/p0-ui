import { CompanieModule } from './../companie/companie.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { ExpeditiiRoutingModule } from './expeditii-routing.module';

import { AdaugaTransporturiComponent } from './pages/adauga-transporturi/adauga-transporturi.component';
import { AdaugaTransportComponent } from './components/adauga-transport/adauga-transport.component';
import { HartaComponent } from './components/harta/harta.component';
import { TransporturileTaleComponent } from './components/transporturile-tale/transporturile-tale.component';
import { VeziTransporturileTaleComponent } from './pages/vezi-transporturile-tale/vezi-transporturile-tale.component';
import { TranzactiiComponent } from './pages/tranzactii/tranzactii.component';
import { TranzactieComponent } from './components/tranzactie/tranzactie.component';
import { ListaTranzactiiComponent } from './components/lista-tranzactii/lista-tranzactii.component';
@NgModule({
  declarations: [
    AdaugaTransporturiComponent,
    AdaugaTransportComponent,
    HartaComponent,
    TransporturileTaleComponent,
    VeziTransporturileTaleComponent,
    TranzactiiComponent,
    TranzactieComponent,
    ListaTranzactiiComponent,
  ],
  imports: [
    CommonModule,
    ExpeditiiRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwh8fwzAoQVvP0uBgxuTRC6n2zMhTuctk',
      libraries: ['places'],
    }),
    CompanieModule,
  ],
})
export class ExpeditiiModule {}
