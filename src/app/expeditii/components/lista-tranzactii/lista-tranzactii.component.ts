import { TransportService } from './../../../shared/services/transport.service';
import { Transport } from './../../../models/transport';
import { TranzactiiService } from './../../../shared/services/tranzactii.service';
import { Component, OnInit } from '@angular/core';

import { Tranzactie } from '../../../models/tranzactie.model';
import { AlertService } from 'ngx-alerts';
import { SocketIoService } from 'src/app/shared/services/socket-io.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
@Component({
  selector: 'app-lista-tranzactii',
  templateUrl: './lista-tranzactii.component.html',
  styleUrls: ['./lista-tranzactii.component.css'],
})
export class ListaTranzactiiComponent implements OnInit {
  tranzactiiList: Tranzactie[] = [];

  constructor(
    private tranzactiiSerice: TranzactiiService,
    private alertService: AlertService,
    private socketService: SocketIoService,
    private progressBar: ProgressBarService,
    private transportService: TransportService
  ) {}

  ngOnInit(): void {
    this.loadTranzactii();
  }

  loadTranzactii() {
    this.tranzactiiSerice.getTranzactii().subscribe((tranzactii) => {
      this.tranzactiiList = tranzactii;
    });
  }

  // sterge tranzactia si notifica in timp real transportatorul
  stergeTranzactie(transport: Transport) {
    var tranzactie: Tranzactie;

    this.tranzactiiList.forEach((tr, index) => {
      if (tr.idTransport === transport.id) {
        tranzactie = tr;
        this.tranzactiiList.splice(index, 1);
      }
    });
    const resping = {
      idTransportator: tranzactie.idTransportator,
      idExpeditor: tranzactie.idExpeditor,
      transport: transport,
    };
    this.socketService.rerspingeTransport(resping);
    this.tranzactiiSerice.deleteTranzactie(transport.id).subscribe((data) => {
      this.alertService.success(data['message']);
    });
  }
  acceptaTranzactie(transport: Transport) {
    var tranzactie: Tranzactie;
    // se inlatura tranzactia respectiva din lista
    this.tranzactiiList.forEach((tr, index) => {
      if (tr.idTransport === transport.id) {
        tranzactie = tr;
        this.tranzactiiList.splice(index, 1);
      }
    });

    this.progressBar.startLoading();
    const transportObserver = {
      next: (x) => {
        this.progressBar.setSuccess();
        this.alertService.success('Trasnport acordat!');
        this.progressBar.completeLoading();
      },
      error: (err) => {
        this.progressBar.setError();
        this.alertService.danger('Tranzacție eșuată!');
        this.progressBar.completeLoading();
      },
    };
    var data = {
      idTransport: transport.id,
      idTransportator: tranzactie.idTransportator,
      tipMarfa: transport.tipMarfa,
      taraIncarcare: transport.taraIncarcare,
      orasIncarcare: transport.orasIncarcare,
      taraDescarcare: transport.taraDescarcare,
      orasDescarcare: transport.orasDescarcare,
      pret: transport.pret,
      km: transport.km,
    };
    // marcam transportul ca fiind efectuat in tabel
    this.transportService.trarnsportEfectuat(data).subscribe(transportObserver);

    // stergem transportul din tabelul cu transporturi efectuate
    // asta atrage si stergerea tranzactiei
    this.transportService.deleteTransport(transport.id).subscribe((data) => {
      console.log(data);
    });

    // se sterge tranzactia din tabelul de trazactii
    // this.tranzactiiSerice.deleteTranzactie(transport.id).subscribe((data) => {
    //   console.log(data['message']);
    // });

    const accepta = {
      idTransportator: tranzactie.idTransportator,
      idExpeditor: tranzactie.idExpeditor,
      transport: transport,
    };
    // emitem notificare catre transportator
    this.socketService.acceptaTransport(accepta);
  }
}
