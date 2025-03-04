export class Giornata {
    id_giornata: number;
    inizio_giornata: Date;
    prima_partita: Date;
    ultima_partita: Date;
    fine_giornata: Date;
    serie_a: number;
    turno_id: number;
    is_calcolata: number;

    constructor(
        id_giornata: number,
        inizio_giornata: Date,
        prima_partita: Date,
        ultima_partita: Date = new Date("2099-01-01"),
        fine_giornata: Date = new Date("2099-01-01"),
        serie_a: number,
        turno_id: number = 1,
        is_calcolata: number = 0
    ) {
        this.id_giornata = id_giornata;
        this.inizio_giornata = inizio_giornata;
        this.prima_partita = prima_partita;
        this.ultima_partita = ultima_partita;
        this.fine_giornata = fine_giornata;
        this.serie_a = serie_a;
        this.turno_id = turno_id;
        this.is_calcolata = is_calcolata;
    }
}