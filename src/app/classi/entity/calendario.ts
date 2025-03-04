export class Calendario {
    id_calendario: number;
    giornata_id: number;
    girone: string | null;
  
    constructor(id_calendario: number, giornata_id: number, girone: string | null = null) {
      this.id_calendario = id_calendario;
      this.giornata_id = giornata_id;
      this.girone = girone;
    }
  }