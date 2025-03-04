export class Lega {
    id_lega: number;
    nome: string;
    account: string;
    calciatore_id: number;

    constructor(id_lega: number, nome: string, account: string, calciatore_id: number) {
        this.id_lega = id_lega;
        this.nome = nome;
        this.account = account;
        this.calciatore_id = calciatore_id;
    }
}