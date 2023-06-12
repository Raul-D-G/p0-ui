import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanieRoutingModule } from './companie-routing.module';

import { TransporturiBursaComponent } from './components/transporturi-bursa/transporturi-bursa.component';
import { TransporturiComponent } from './components/transporturi-bursa/transporturi/transporturi.component';
import { TransportComponent } from './components/transporturi-bursa/transporturi/transport/transport.component';
import { FiltruTransporturiComponent } from './components/transporturi-bursa/transporturi/filtru-transporturi/filtru-transporturi.component';

import { FiltruTransporturiPipe } from '../pipes/filtru-transporturi.pipe';
import { SortTransporturiPipe } from '../pipes/sort-transporturi.pipe';
import { TransporturiEfectuateComponent } from './pages/transporturi-efectuate/transporturi-efectuate.component';
import { ListaTrasnporturiEfectuateComponent } from './components/lista-trasnporturi-efectuate/lista-trasnporturi-efectuate.component';

@NgModule({
  declarations: [
    TransporturiBursaComponent,
    TransporturiComponent,
    TransportComponent,
    FiltruTransporturiPipe,
    SortTransporturiPipe,
    FiltruTransporturiComponent,
    TransporturiEfectuateComponent,
    ListaTrasnporturiEfectuateComponent,
  ],
  imports: [CommonModule, CompanieRoutingModule, FormsModule, SharedModule],
  exports: [TransportComponent],
})
export class CompanieModule {}
