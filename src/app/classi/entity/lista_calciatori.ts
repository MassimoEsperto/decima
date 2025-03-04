export class Calciatore {
    id_calciatore: number;
    nome_calciatore: string;
    nickname: string;
    icona: string;
    ruolo: string;
    acquisto: number;
    valore: number;

    constructor(id_calciatore: number, nome_calciatore: string, nickname: string = "nessuno", icona: string = "DEFAULT", ruolo: string, acquisto: number = 1, valore: number = 1) {
        this.id_calciatore = id_calciatore;
        this.nome_calciatore = nome_calciatore;
        this.nickname = nickname;
        this.icona = icona;
        this.ruolo = ruolo;
        this.acquisto = acquisto;
        this.valore = valore;
    }
}