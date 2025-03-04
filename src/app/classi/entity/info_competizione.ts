export class InfoCompetizione {
    id_info: number;
    tab: string;
    sub_tab: string | null;
    descrizione: string;
    tipo: string;
    isArray: number;
    valore: string;

    constructor(id_info: number, tab: string = "DEFAULT", sub_tab: string | null, descrizione: string, tipo: string = "INT", isArray: number = 0, valore: string) {
        this.id_info = id_info;
        this.tab = tab;
        this.sub_tab = sub_tab;
        this.descrizione = descrizione;
        this.tipo = tipo;
        this.isArray = isArray;
        this.valore = valore;
    }
}