export class Giornata {

    id_giornata: number;
    id_fase: number;
    serie_a: number;

    constructor(obj: Giornata) {
        this.id_giornata = obj.id_giornata;
        this.id_fase = obj.id_fase;
        this.serie_a = obj.serie_a;
    }
}
