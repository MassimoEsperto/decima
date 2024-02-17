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
  fase?: number;

  constructor(element?: any) {

    if (element) {
      this.id = element.id_utente
      this.username = element.username
      this.email = element.email
      this.cellulare = element.cellulare
      this.selezionata = element.selezionata
      this.token = element.token
      this.num_msg = element.num_msg
      this.squadre = element.squadre
      this.qta = element.qta
      this.ruolo = element.ruolo
      this.fase = element.fase
    }
  }
}
