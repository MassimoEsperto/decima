import { Injectable } from '@angular/core';
import { DebitoSquadra, FrazioneGiornata, StatiSquadra_, TurniCompetizione } from 'src/environments/enums';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }

  readonly TURNI_COMPETIZIONE = TurniCompetizione;
  readonly FRAZIONE_COMPETIZIONE = FrazioneGiornata;
  readonly STATI_SQUADRA = StatiSquadra_;
  readonly DEBITO_SQUADRA = DebitoSquadra;

   
}
