import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  private messageSource = new BehaviorSubject<any>('');
  message$ = this.messageSource.asObservable();
  constructor() {}

  sendMessage(message: any) {
    this.messageSource.next(message);
  }
}
