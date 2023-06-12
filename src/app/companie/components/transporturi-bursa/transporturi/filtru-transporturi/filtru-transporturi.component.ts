import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtru-transporturi',
  templateUrl: './filtru-transporturi.component.html',
  styleUrls: ['./filtru-transporturi.component.css'],
})
export class FiltruTransporturiComponent implements OnInit {
  @Output() cautaCurse: EventEmitter<any> = new EventEmitter();
  @Output() onToateCursele: EventEmitter<any> = new EventEmitter();
  @Output() onSort: EventEmitter<any> = new EventEmitter();

  taraIncarcare: string;
  taraDescarcare: string;
  sortParam = '';
  sortDirection = 'asc';
  showAddTask: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    const ruta = {
      taraIncarcare: this.taraIncarcare,
      taraDescarcare: this.taraDescarcare,
    };

    this.cautaCurse.emit(ruta);

    this.taraIncarcare = '';
    this.taraDescarcare = '';
  }

  toateCursele() {
    this.onToateCursele.emit();
  }

  onSortDirection() {
    if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = 'asc';
    }
    const sort = {
      sortParam: this.sortParam,
      sortDirection: this.sortDirection,
    };

    this.onSort.emit(sort);
  }
}
