import { AuthService } from './../../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../../../shared/services/transport.service';
import { Transport } from '../../../../models/transport';

@Component({
  selector: 'app-transporturi',
  templateUrl: './transporturi.component.html',
  styleUrls: ['./transporturi.component.css'],
})
export class TransporturiComponent implements OnInit {
  transportList: Transport[] = [];
  curse = { taraIncarcare: '', taraDescarcare: '' };

  sortParam = '';
  sortDirection = 'asc';

  constructor(
    private transportService: TransportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTransporturi();
  }

  loadTransporturi() {
    this.transportService.getTransporturi().subscribe((transporturi) => {
      this.transportList = transporturi;
    });
  }

  filtru(ruta: any) {
    this.curse.taraIncarcare = ruta.taraIncarcare;
    this.curse.taraDescarcare = ruta.taraDescarcare;
  }

  clearFiltru() {
    this.curse.taraIncarcare = '';
    this.curse.taraDescarcare = '';
  }

  onSortDirection(sort: any) {
    this.sortDirection = sort.sortDirection;
    this.sortParam = sort.sortParam;
  }
}
