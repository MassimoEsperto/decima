export class UtenteCom {
    comunicazione_id: number;
    utente_id: number;
    visualizzata: number;

    constructor(comunicazione_id: number, utente_id: number, visualizzata: number = 0) {
        this.comunicazione_id = comunicazione_id;
        this.utente_id = utente_id;
        this.visualizzata = visualizzata;
    }
}