import { AuthService } from 'src/app/shared/services/auth.service';
import { Transport } from './../../../models/transport';
import { TransportService } from './../../../shared/services/transport.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Tranzactie } from 'src/app/models/tranzactie.model';

@Component({
  selector: 'app-tranzactie',
  templateUrl: './tranzactie.component.html',
  styleUrls: ['./tranzactie.component.css'],
})
export class TranzactieComponent implements OnInit {
  @Input() tranzactieItem: Tranzactie;

  @Output() onStergere: EventEmitter<any> = new EventEmitter();
  @Output() onAcceptaTranzactie: EventEmitter<any> = new EventEmitter();

  transportItem: Transport;
  transportator: any;
  constructor(
    private transportService: TransportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTransport(this.tranzactieItem.idTransport);
    this.getTransportator(this.tranzactieItem.idTransportator);
  }

  getTransport(idTransport: number) {
    return this.transportService
      .getTransportById(idTransport)
      .subscribe((transport) => {
        this.transportItem = transport;
      });
  }

  getTransportator(idTransportator: number) {
    return this.authService
      .getCompanieById(idTransportator)
      .subscribe((transportator) => {
        this.transportator = transportator.data;
      });
  }

  stergeTranzactieTransport(transport: Transport) {
    this.onStergere.emit(transport);
  }

  acceptaTranzactieTransport(transport: Transport) {
    this.onAcceptaTranzactie.emit(transport);
  }
}
