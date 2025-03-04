export class Comunicazione {
    id_comunicazione: number;
    data: Date;
    titolo: string;
    messaggio: string;
  
    constructor(id_comunicazione: number, data: Date, titolo: string, messaggio: string) {
      this.id_comunicazione = id_comunicazione;
      this.data = data;
      this.titolo = titolo;
      this.messaggio = messaggio;
    }
  }