import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alerta-modal-content',
  templateUrl: './alerta-modal-content.component.html',
  styleUrls: ['./alerta-modal-content.component.css'],
})
export class AlertaModalContentComponent implements OnInit {
  @Input() eroare;
  @Input() succes;

  constructor(public activeModal: NgbActiveModal) {}

  upperCaseWords(mySentence) {
    const words = mySentence.split(' ');

    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 1) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
    }

    return words.join(' ');
  }

  ngOnInit(): void {}
}
