export class Calciatore {
    id: number = 0;
    nome: string = "";
    nickname: string = "";
    ruolo: string = "";
    icona: string = "";
    valore: number = 0;
    selected: boolean = false;
    disabled: boolean = false;

    constructor(
        ruolo: string,
        nome: string,
        valore?: number
    ) {
        this.ruolo = ruolo;
        this.nome = nome;
        this.nickname = nome.toLocaleUpperCase().replaceAll(".", "").trim();
        this.icona = nome.toLocaleUpperCase().replaceAll(".", "").replaceAll(" ", "-").trim();
        this.valore = valore ? valore : 0;
    }

}

export class Roster {
    svincolati: Calciatore[] = [];
    vincolati: Calciatore[] = [];
}

export class Listino {
    svincolati: Calciatore[] = [];
    rosa_attuale: Calciatore[] = [];
    crediti: number = 0;
    squadra: string = ""

    constructor(
        elements: any = null
    ) {
        if (elements) {
            this.svincolati = elements.svincolati;
            this.rosa_attuale = elements.rosa_attuale;
            this.crediti = elements.crediti;
            this.squadra = elements.squadra;
        }
    }

    get selezionati() {
        return this.svincolati.filter((e: { selected: boolean; }) => e.selected === true);
    }

    get attuale() {
        return this.rosa_attuale.filter((e: { selected: boolean; }) => e.selected === true);
    }

    get countP() {
        return this.svincolati.
            filter((e: { ruolo: string; selected: boolean; }) => e.selected === true && e.ruolo == 'P').length;
    }

    get countD() {
        return this.svincolati.
            filter((e: { ruolo: string; selected: boolean; }) => e.selected === true && e.ruolo == 'D').length;
    }

    get countC() {
        return this.svincolati.
            filter((e: { ruolo: string; selected: boolean; }) => e.selected === true && e.ruolo == 'C').length;
    }

    get countA() {
        return this.svincolati.
            filter((e: { ruolo: string; selected: boolean; }) => e.selected === true && e.ruolo == 'A').length;
    }

    get countRA() {
        return this.attuale.length;
    }


    get spesa() {

        let lista = this.selezionati
        let crt: number = 0;

        if (lista.length > 0) {
            crt = lista.map(a => a.valore).reduce(function (a, b) {
                return a + b;
            });
        }

        return crt

    }

    get residuo() {

        let crt = this.spesa
        let res = this.crediti - crt
        return res

    }

    svincola() {

        let tmp = this.svincolati.filter(x => this.attuale.map(y => y.id).includes(x.id));

        for (let ele of tmp) {
            ele.selected = false
        }

        for (let ele of this.selezionati) {
            ele.disabled = true
        }

    }
}


