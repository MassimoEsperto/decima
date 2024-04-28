export class Squadra {
    id_squadra: number
    squadra: string;
    avatar: string;
    id_avatar: string;
    account: string;
    lega: string;
    stato: number;
    tipo: string = 'FANTA'

    constructor(
        id_squadra: number = 0,
        squadra: string = '',
        avatar: string = '',
        id_avatar: string = '',
        account: string = '',
        lega: string = '',
        stato: number = 0
    ) {
        this.id_squadra = id_squadra;
        this.squadra = squadra;
        this.id_avatar = id_avatar;
        this.avatar = avatar;
        this.account = account;
        this.lega = lega;
        this.stato = stato;
    }
}