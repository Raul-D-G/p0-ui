export class Tranzactie {
  idTransport: number;
  idTransportator: number;
  idExpeditor: number;

  constructor(
    idTransport: number,
    idTransportator: number,
    idExpeditor: number
  ) {
    this.idTransport = idTransport;
    this.idTransportator = idTransportator;
    this.idExpeditor = idExpeditor;
  }
}
