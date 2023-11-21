export class Match {

    CASA: Player = new Player();
    TRASFERTA: Player = new Player();;

    constructor() {}

}

class Calciatore{

    nome: string = "";
    ruolo: string = "";
    voto: string = "";

}

class Player{

    formazione: any = [new Calciatore(),new Calciatore(),new Calciatore(),new Calciatore(),new Calciatore()];
    id_squadra: string = "";
    id_utente: string = "";
    somma: string = "0";
    goals: string = "0";
    squadra: string = "IN CARICA";
    modulo: string = "0-0-0-0";
    bonus: string = "0";

}