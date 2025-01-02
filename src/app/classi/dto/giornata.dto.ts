export class Giornata {

    id_giornata: number;
    id_turno: number;
    serie_a: number;

    constructor(obj: Giornata) {
        this.id_giornata = obj.id_giornata;
        this.id_turno = obj.id_turno;
        this.serie_a = obj.serie_a;
    }
}
