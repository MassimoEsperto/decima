export class Utente {
    id_utente: number;
    username: string;
    password: string;
    email: string;
    cellulare: string;
    ruolo_id: number;
    language: string;

    constructor(id_utente: number, username: string, password: string, email: string, cellulare: string = "", ruolo_id: number = 1, language: string = "ita") {
        this.id_utente = id_utente;
        this.username = username;
        this.password = password;
        this.email = email;
        this.cellulare = cellulare;
        this.ruolo_id = ruolo_id;
        this.language = language;
    }
}