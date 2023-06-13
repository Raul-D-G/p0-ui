import { AuthService } from './auth.service';

import { Tranzactie } from '../../models/tranzactie.model';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TranzactiiService {
  tranzactiiUrl = 'http://rrr.com/api/transactions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  registerTranzactie(model: any) {
    return this.http.post<any>(this.tranzactiiUrl, model);
  }

  deleteTranzactie(transportId: number) {
    return this.http.delete(this.tranzactiiUrl + '/' + transportId);
  }

  getTranzactii(): Observable<Tranzactie[]> {
    return this.http.get<Tranzactie[]>(
      `${this.tranzactiiUrl}/${this.authService.getCompanieId()}`
    );
  }
}
