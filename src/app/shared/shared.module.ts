import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { NgProgressModule } from '@ngx-progressbar/core';
import { AlertModule } from 'ngx-alerts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CompanieModalContentComponent } from './components/companie-modal-content/companie-modal-content.component';
import { AlertaModalContentComponent } from './components/alerta-modal-content/alerta-modal-content.component';
import { TranzactieTransportModalContentComponent } from './components/tranzactie-transport-modal-content/tranzactie-transport-modal-content.component';
import { NotificareTranzactieModalContentComponent } from './components/notificare-tranzactie-modal-content/notificare-tranzactie-modal-content.component';
import { VizualizareTransportComponent } from './components/vizualizare-transport/vizualizare-transport.component';

const config: SocketIoConfig = {
  url: 'http://p0-transactions-service:8080',
  options: {
    // path: '/ws', // Calea WebSocket către server
  },
};

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    CompanieModalContentComponent,
    AlertaModalContentComponent,
    TranzactieTransportModalContentComponent,
    NotificareTranzactieModalContentComponent,
    VizualizareTransportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgProgressModule,
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    SocketIoModule.forRoot(config),

    AlertModule.forRoot({ maxMessages: 5, timeout: 3000, positionX: 'right' }),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    CompanieModalContentComponent,
    VizualizareTransportComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class SharedModule {}
