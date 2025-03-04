export class Risultato {
    id_risultato: number;
    calendario_id: number;
    luogo: string;
    squadra_id: number;
    data_inserimento: Date;
    is_inserita: number;
    modulo_id: number;
    somma: string;
    goals: number;
    punti: number;
    ranking: number;

    constructor(
        id_risultato: number,
        calendario_id: number = 0,
        luogo: string = "TRASFERTA",
        squadra_id: number,
        data_inserimento: Date,
        is_inserita: number = 1,
        modulo_id: number = 7,
        somma: string = "0",
        goals: number = 0,
        punti: number = 0,
        ranking: number = 0
    ) {
        this.id_risultato = id_risultato;
        this.calendario_id = calendario_id;
        this.luogo = luogo;
        this.squadra_id = squadra_id;
        this.data_inserimento = data_inserimento;
        this.is_inserita = is_inserita;
        this.modulo_id = modulo_id;
        this.somma = somma;
        this.goals = goals;
        this.punti = punti;
        this.ranking = ranking;
    }
}