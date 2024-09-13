import { Calciatore } from "./calciatore";

export class Lega {

    nome: string = "";
    rose: Rosa[] = [];

}

export class Rosa {

    account: string = "";
    calciatori: Calciatore[] = [];

}
