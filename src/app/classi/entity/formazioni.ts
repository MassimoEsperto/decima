export class Formazione {
    risultato_id: number;
    schieramento: number;
    calciatore_id: number;
    data_inserimento: Date;
    voto: string | null;

    constructor(risultato_id: number, schieramento: number, calciatore_id: number, data_inserimento: Date, voto: string | null = null) {
        this.risultato_id = risultato_id;
        this.schieramento = schieramento;
        this.calciatore_id = calciatore_id;
        this.data_inserimento = data_inserimento;
        this.voto = voto;
    }
}