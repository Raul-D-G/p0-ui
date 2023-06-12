import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-companie-modal-content',
  templateUrl: './companie-modal-content.component.html',
  styleUrls: ['./companie-modal-content.component.css'],
})
export class CompanieModalContentComponent implements OnInit {
  @Input() companie;
  @Input() transport;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
