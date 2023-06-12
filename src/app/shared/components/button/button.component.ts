import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;
  @Output() btnClick = new EventEmitter();
  firstColor: string;
  constructor() {}

  ngOnInit(): void {
    this.firstColor = this.color;
  }

  onClick() {
    this.btnClick.emit();
  }

  changeStyle($event) {
    this.color = $event.type == 'mouseover' ? '#4caf50' : this.firstColor;
  }
}
