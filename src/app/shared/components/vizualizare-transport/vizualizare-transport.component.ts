import { Transport } from './../../../models/transport';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vizualizare-transport',
  templateUrl: './vizualizare-transport.component.html',
  styleUrls: ['./vizualizare-transport.component.css'],
})
export class VizualizareTransportComponent implements OnInit {
  @Input() transportItem: Transport;
  @Output() onDetaliiExpeditor = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  detaliiExpeditor() {
    this.onDetaliiExpeditor.emit(this.transportItem);
  }
}
