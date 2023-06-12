export class Transport {
  id: number;
  idExpeditor: number;
  tipMarfa: string;
  taraIncarcare: string;
  orasIncarcare: string;
  taraDescarcare: string;
  orasDescarcare: string;
  pret: number;
  km: number;

  constructor(
    id: number,
    idExpeditor: number,
    tipMarfa: string,
    taraIncarcare: string,
    orasIncarcare: string,
    taraDescarcare: string,
    orasDescarcare: string,
    pret: number,
    km: number
  ) {
    this.id = id;
    this.idExpeditor = idExpeditor;
    this.tipMarfa = tipMarfa;
    this.taraIncarcare = taraIncarcare;
    this.orasIncarcare = orasIncarcare;
    this.taraDescarcare = taraDescarcare;
    this.orasDescarcare = orasDescarcare;
    this.pret = pret;
    this.km = km;
  }
}
