export class Info {

    versione: string;
    whatsapp: string;
    condizione_girone: CondizioneGirone;
    avatar_eliminato: string;
    anno: string;
    numero_ripescabili: number;
    posizione_girone: PosizioneGirone;
    numero_ripescate: number;
    crediti_disponibili: number;

    constructor(obj: Info) {
        this.versione = obj.versione;
        this.whatsapp = obj.whatsapp;
        this.condizione_girone = obj.condizione_girone;
        this.avatar_eliminato = obj.avatar_eliminato;
        this.anno = obj.anno;
        this.numero_ripescabili = obj.numero_ripescabili;
        this.posizione_girone = obj.posizione_girone;
        this.numero_ripescate = obj.numero_ripescate;
        this.crediti_disponibili = obj.crediti_disponibili;
    }

}

class CondizioneGirone {
    qualificata: number;
    spareggio: number;
    eliminata: number;

    constructor(obj: CondizioneGirone) {
        this.qualificata = obj.qualificata;
        this.spareggio = obj.spareggio;
        this.eliminata = obj.eliminata;
    }
}

class PosizioneGirone {
    qulificate: number[] = [];
    ripescabile: number[] = [];
    spareggi: number[] = [];


    constructor(obj: PosizioneGirone) {
        this.qulificate = obj.qulificate;
        this.ripescabile = obj.ripescabile;
        this.spareggi = obj.spareggi;
    }
}

