export class Squadra {
    id_squadra: number;
    utente_id: number;
    squadra: string;
    avatar_id: number;
    lega: string;
    account: string;
    stato_id: number;
    saldo_id: number;
    tipo: string;
    is_default: number;

    constructor(
        id_squadra: number,
        utente_id: number,
        squadra: string,
        avatar_id: number = 1,
        lega: string = "nessuna",
        account: string = "provvisorio",
        stato_id: number = 1,
        saldo_id: number = 1,
        tipo: string = "FANTA",
        is_default: number = 1
    ) {
        this.id_squadra = id_squadra;
        this.utente_id = utente_id;
        this.squadra = squadra;
        this.avatar_id = avatar_id;
        this.lega = lega;
        this.account = account;
        this.stato_id = stato_id;
        this.saldo_id = saldo_id;
        this.tipo = tipo;
        this.is_default = is_default;
    }
}