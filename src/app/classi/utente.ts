import { Squadra } from "./squadra";

export class Utente {
  id?: string;
  username?: string;
  password?: string;
  email?: string;
  cellulare?: string;
  scadenza?: string;
  num_msg?: number;
  ruolo?: number;
  qta?: number;
  token?: string;
  squadre?: Array<Squadra> = [];
  selezionata?: Squadra;
  language?: string;
  turno?: number;

  constructor(element?: any) {

    if (element) {
      this.id = element.id_utente
      this.username = element.username
      this.email = element.email
      this.cellulare = element.cellulare
      this.selezionata = element.selezionata
      this.token = element.token
      this.num_msg = Number(element.num_msg)
      this.squadre = element.squadre
      this.qta = element.qta
      this.ruolo = Number(element.ruolo)
      this.turno = Number(element.turno)
    }
  }
}
