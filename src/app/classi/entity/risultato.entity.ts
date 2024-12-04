export interface PayloadCalcolo {
    giornata: number;
    risultati: Risultato[]
}

export interface Risultato {
    CASA: CalcoloSquadra;
    TRASFERTA: CalcoloSquadra;
    id_calendario: number;
}

interface CalcoloSquadra {
    bonus: number
    goals: number
    id_risultato: number
    id_squadra: number
    id_utente: number
    punti: number
    rank: number
    schieramento: Schieramento[]
    somma: number
    squadra: string
}

interface Schieramento {
    calciatore: string;
    id: number
    nickname: string
    ruolo: string
    voto: number

}


