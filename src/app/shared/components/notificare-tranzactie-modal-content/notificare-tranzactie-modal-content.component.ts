import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notificare-tranzactie-modal-content',
  templateUrl: './notificare-tranzactie-modal-content.component.html',
  styleUrls: ['./notificare-tranzactie-modal-content.component.css'],
})
export class NotificareTranzactieModalContentComponent implements OnInit {
  @Input() transport;
  @Input() expeditor;
  @Input() actiune;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
