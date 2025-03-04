export class Rosa {
    squadra_id: number;
    calciatore_id: number;
    ordine: number;

    constructor(squadra_id: number, calciatore_id: number, ordine: number = 1) {
        this.squadra_id = squadra_id;
        this.calciatore_id = calciatore_id;
        this.ordine = ordine;
    }
}