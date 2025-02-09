export class InfoGenerali {

    versione: string;
    versione_fe: string = "";
    whatsapp: string;
    avatar_eliminato: string;
    anno: string;
    numero_ripescabili: number;
    posizione_girone: PosizioneGirone;
    numero_ripescate: number;
    crediti_disponibili: number;
    fase: number;
    turno: number;

    constructor(obj: InfoGenerali) {
        this.versione = obj.versione;
        this.whatsapp = obj.whatsapp;
        this.avatar_eliminato = obj.avatar_eliminato;
        this.anno = obj.anno;
        this.numero_ripescabili = obj.numero_ripescabili;
        this.posizione_girone = obj.posizione_girone;
        this.numero_ripescate = obj.numero_ripescate;
        this.crediti_disponibili = obj.crediti_disponibili;
        this.fase = obj.fase;
        this.turno = obj.turno;
    }

    erroreVersione():boolean{
        return this.versione != this.versione_fe
    }

}



class PosizioneGirone {
    qualificate: number[] = [];
    ripescabili: number[] = [];
    spareggi: number[] = [];


    constructor(obj: PosizioneGirone) {
        this.qualificate = obj.qualificate;
        this.ripescabili = obj.ripescabili;
        this.spareggi = obj.spareggi;
    }
}

