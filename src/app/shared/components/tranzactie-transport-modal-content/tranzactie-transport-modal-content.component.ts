import { TransportService } from './../../services/transport.service';
import { TranzactiiService } from './../../services/tranzactii.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoService } from '../../services/socket-io.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-tranzactie-transport-modal-content',
  templateUrl: './tranzactie-transport-modal-content.component.html',
  styleUrls: ['./tranzactie-transport-modal-content.component.css'],
})
export class TranzactieTransportModalContentComponent implements OnInit {
  @Input() transport;
  @Input() transportator;
  constructor(
    public activeModal: NgbActiveModal,
    private tranzactieService: TranzactiiService,
    private socketService: SocketIoService,
    private transportService: TransportService,
    public progressBar: ProgressBarService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  acceptaTransportator() {
    this.progressBar.startLoading();
    const transportObserver = {
      next: (x) => {
        this.progressBar.setSuccess();
        this.alertService.success('Inregistrare Reusita!');
        this.progressBar.completeLoading();
      },
      error: (err) => {
        this.progressBar.setError();
        this.alertService.danger('Inregistrare esuata!');
        this.progressBar.completeLoading();
      },
    };
    var data = {
      idTransport: this.transport.id,
      idTransportator: this.transportator.id,
      tipMarfa: this.transport.tipMarfa,
      taraIncarcare: this.transport.taraIncarcare,
      orasIncarcare: this.transport.orasIncarcare,
      taraDescarcare: this.transport.taraDescarcare,
      orasDescarcare: this.transport.orasDescarcare,
      pret: this.transport.pret,
      km: this.transport.km,
    };
    // marcam transportul ca fiind efectuat
    this.transportService.trarnsportEfectuat(data).subscribe(transportObserver);

    // stergem transportul din tabelul cu transporturi efectuate
    // asta atrage si stergerea tranzactiei
    this.transportService
      .deleteTransport(this.transport.id)
      .subscribe((data) => {
        console.log(data);
      });

    const accepta = {
      idTransportator: this.transportator.id,
      idExpeditor: this.transport.idExpeditor,
      transport: this.transport,
    };
    // emitem notificare catre transportator
    this.socketService.acceptaTransport(accepta);

    this.activeModal.close();
  }
  respingeTransportator() {
    this.tranzactieService
      .deleteTranzactie(this.transport.id)
      .subscribe((data) => {
        console.log(data);
      });

    const resping = {
      idTransportator: this.transportator.id,
      idExpeditor: this.transport.idExpeditor,
      transport: this.transport,
    };
    this.socketService.rerspingeTransport(resping);

    this.activeModal.close();
  }
}
