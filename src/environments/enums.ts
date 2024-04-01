export enum FasiCompetizione {
    ISCRIZIONE = 0,
    GIRONI = 1,
    SPAREGGI = 2,
    OTTAVI = 3,
    QUARTI = 4,
    SEMI_FINALE = 5,
    FINALE = 6,
    MERCATO = 7
}

export enum PeriodoGiornata {
    PRE_PARTITA = "1",
    PARTITA_LIVE = "2",
    POST_PARTITA = "3"
}


export enum StatiSquadra {
    REGISTRATA = 1,
    PARTECIPANTE = 2,
    PAGANTE = 3,
    ELIMINATO = 4,
    VINCITORE = 5
}

export enum RuoliUtente {
    GHOST = 1,
    PLAYER = 2,
    ADMIN = 3
}

export enum CondizioneGirone {
    QAULIFICATO = 1,
    SPAREGGI = 2,
    ELIMINATA = 3
}

export enum ViewIscirzione {
    LISTA = 1,
    REGISTRA = 2,
    CREA = 3,
    UPGRADE_F = 4,
    UPGRADE_L = 5
}

export enum TipoSquadra {
    FANTA = 'FANTA',
    LOCALE = 'LOCALE'
}