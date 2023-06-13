import { AuthService } from './auth.service';
import { Transport } from './../../models/transport';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  transportUrl = 'http://rrr.com/api/transports';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTransporturi(): Observable<Transport[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<Transport[]>(
      `${this.transportUrl}/bursa/${this.authService.getCompanieId()}`,
      {
        headers: headers,
      }
    );
  }

  getTransporturiEfectuate(idTransportator: number): Observable<Transport[]> {
    return this.http.get<Transport[]>(
      `${this.transportUrl}/efectuat/${idTransportator}`
    );
  }

  getTransportById(idTransport: number): Observable<Transport> {
    return this.http.get<Transport>(
      `${this.transportUrl}/transport/${idTransport}`
    );
  }

  registerTransport(model: any) {
    return this.http.post<any>(this.transportUrl, model);
  }

  trarnsportEfectuat(model: any) {
    return this.http.post<any>(`${this.transportUrl}/efectuat`, model);
  }

  getTransporturiByCompanieId(): Observable<Transport[]> {
    return this.http.get<Transport[]>(
      `${this.transportUrl}/${this.authService.getCompanieId()}`
    );
  }

  deleteTransport(transportId: number) {
    return this.http.delete(this.transportUrl + '/' + transportId);
  }

  test(model: any) {
    return this.http.post<any>(this.transportUrl + '/camioane', model);
  }
}
