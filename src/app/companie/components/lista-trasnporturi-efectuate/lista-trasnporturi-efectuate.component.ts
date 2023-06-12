import { Transport } from './../../../models/transport';
import { AuthService } from './../../../shared/services/auth.service';
import { TransportService } from './../../../shared/services/transport.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanieModalContentComponent } from '../../../shared/components/companie-modal-content/companie-modal-content.component';

@Component({
  selector: 'app-lista-trasnporturi-efectuate',
  templateUrl: './lista-trasnporturi-efectuate.component.html',
  styleUrls: ['./lista-trasnporturi-efectuate.component.css'],
})
export class ListaTrasnporturiEfectuateComponent implements OnInit {
  transporturiList: Transport[] = [];
  venit: number = 0;
  constructor(
    private transportService: TransportService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTrasnporturi();
  }

  loadTrasnporturi() {
    this.transportService
      .getTransporturiEfectuate(this.authService.getCompanieId())
      .subscribe((transporturi) => {
        this.transporturiList = transporturi;
        this.getVenit();
      });
  }

  getVenit() {
    this.transporturiList.forEach((tr, index) => {
      this.venit += tr.pret;
    });
  }

  detaliiExpeditor(transport: Transport) {
    this.authService
      .getCompanieById(transport.idExpeditor)
      .subscribe((companie) => {
        this.openDetalii(companie.data, transport);
      });
  }

  openDetalii(companie, transport) {
    const modalRef = this.modalService.open(CompanieModalContentComponent, {
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.companie = companie;
    modalRef.componentInstance.transport = transport;
  }
}
