import { Transport } from './../../models/transport';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  ofertaTransport = this.socket.fromEvent<any>('ofertaTransport');
  respingere = this.socket.fromEvent<any>('respingere');
  acceptare = this.socket.fromEvent<any>('acceptare');

  constructor(private socket: Socket) {}

  setSocketId(idUser) {
    this.socket.emit('setSocketId', idUser);
  }

  dorescTransport(transport: Transport, idUser) {
    this.socket.emit('dorescTransport', {
      idTransportator: idUser,
      idExpeditor: transport.idExpeditor,
      transport: transport,
    });
  }

  rerspingeTransport(resping: any) {
    this.socket.emit('respingereTransportator', resping);
  }

  acceptaTransport(accepta: any) {
    this.socket.emit('acceptaTrasnport', accepta);
  }
}
