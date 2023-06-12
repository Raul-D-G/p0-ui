import { TranzactiiService } from './../../../../../shared/services/tranzactii.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Transport } from '../../../../../models/transport';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanieModalContentComponent } from '../../../../../shared/components/companie-modal-content/companie-modal-content.component';
import { AlertaModalContentComponent } from '../../../../../shared/components/alerta-modal-content/alerta-modal-content.component';
import { SocketIoService } from 'src/app/shared/services/socket-io.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./transport.component.css'],
})
export class TransportComponent implements OnInit {
  @Input() transportItem: Transport;
  @Input() functie: string;
  @Input() tranzactie: boolean = false;

  @Output() onStergere: EventEmitter<any> = new EventEmitter();
  @Output() onAcceptaTranzactie: EventEmitter<any> = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private socketService: SocketIoService,
    private tranzactiiService: TranzactiiService
  ) {}

  ngOnInit(): void {}

  detalii() {
    var idExpeditor = this.transportItem.idExpeditor;
    this.authService.getCompanieById(idExpeditor).subscribe((companie) => {
      this.openDetalii(companie.data, this.transportItem);
    });
  }
  tipStergere() {
    return this.functie === 'Șterge transport';
  }
  sterge() {
    this.onStergere.emit(this.transportItem);
  }
  openDetalii(companie, transport) {
    const modalRef = this.modalService.open(CompanieModalContentComponent, {
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.companie = companie;
    modalRef.componentInstance.transport = transport;
  }
  openEroare(eroare) {
    const modalRef = this.modalService.open(AlertaModalContentComponent, {
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.eroare = eroare;
  }
  openAlerta(succes) {
    const modalRef = this.modalService.open(AlertaModalContentComponent, {
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.succes = succes;
  }

  accepta() {
    var idUser = this.authService.getCompanieId();
    var data = {
      idTransport: this.transportItem.id,
      idTransportator: idUser,
      idExpeditor: this.transportItem.idExpeditor,
    };
    // se accepta transportul, se creeaza tranzactie si se anunta expeditorul
    this.tranzactiiService.registerTranzactie(data).subscribe(
      (res) => {
        this.openAlerta(res);

        this.socketService.dorescTransport(this.transportItem, idUser);
      },
      (err) => {
        if (err.status === 500) {
          this.openEroare(err.error);
        }
      }
    );
  }

  respingeTranzactie() {
    this.onStergere.emit(this.transportItem);
  }

  acceptaTranzactie() {
    this.onAcceptaTranzactie.emit(this.transportItem);
  }
}
