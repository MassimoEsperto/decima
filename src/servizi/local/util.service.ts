import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { FasiCompetizione } from 'src/environments/enums';
import { BOLEANO } from 'src/environments/costanti';
import { PayloadCalcolo, Risultato } from 'src/app/classi/entity/risultato.entity';


@Injectable({
  providedIn: 'root'
})
export class UtilService {


  constructor(
    private language: LanguageService) { }

  FASE_COMPETIZIONE = FasiCompetizione;


  getFasi(input: number) {

    switch (Number(input)) {
      case this.FASE_COMPETIZIONE.ISCRIZIONE:
        return this.language.label.page.fasi.iscizione
      case this.FASE_COMPETIZIONE.GIRONI:
        return this.language.label.page.fasi.gironi
      case this.FASE_COMPETIZIONE.SPAREGGI:
        return this.language.label.page.fasi.spareggi
      case this.FASE_COMPETIZIONE.OTTAVI:
        return this.language.label.page.fasi.ottavi
      case this.FASE_COMPETIZIONE.QUARTI:
        return this.language.label.page.fasi.quarti
      case this.FASE_COMPETIZIONE.SEMI_FINALE:
        return this.language.label.page.fasi.semi_finale
      case this.FASE_COMPETIZIONE.FINALE:
        return this.language.label.page.fasi.finale
      default: return ""
    }

  }

  getBoleano(input: string) {

    switch (input) {
      case BOLEANO[0].valore:
        return BOLEANO[0].descrizione
      case BOLEANO[1].valore:
        return BOLEANO[1].descrizione
      default: return BOLEANO[1].descrizione
    }

  }

  isDisPari(numero: number) {
    if (isNaN(numero) == false) {
      return (numero % 2 == 1 ? true : false);
    }
    else {
      return false;
    }
  }

  sorteggiaEliminatorie(sorteggiati: any, opzioni: any) {
    let eliminatorie: any = []
    this.setTabellone(sorteggiati, opzioni, eliminatorie)
    return eliminatorie
  }


  setTabellone(sorteggiati: any, opzioni: any, eliminatorie: any) {

    let quantita = sorteggiati.length
    let scelto = sorteggiati[0]

    console.log("scelto", scelto)

    this.removeElement(scelto.id, sorteggiati)

    for (let i = 1; i < quantita; i++) {

      let proposta = this.getProposta(scelto, i, opzioni, sorteggiati)

      if (!proposta) {
        eliminatorie = []
        return eliminatorie
      }

      let accettata: boolean = this.isPropostaAccettata(sorteggiati, proposta, (quantita - 2) / 2, opzioni)

      if (accettata) {
        console.log("proposta accettata", proposta)
        this.removeElement(proposta.id, sorteggiati)
        eliminatorie.push({ casa: scelto, trasferta: proposta })
        if (sorteggiati.length > 0) {
          this.setTabellone(sorteggiati, opzioni, eliminatorie)
          break
        }
      } else {
        console.log("proposta rifiutata", proposta)
        continue;
      }
    }


  }


  isPropostaAccettata(sorteggiati: any, proposta: any, quantita: number, opzioni: any) {

    console.log("quantita minima", quantita)
    let indubbio = []
    let isDubbio: boolean = false

    for (let item of sorteggiati) {

      if (item.id == proposta.id) continue;

      let associabili = this.getAssociabili(item, opzioni, sorteggiati)

      this.removeElement(proposta.id, associabili)
      console.log("unita", associabili.length, " per proposta: ", proposta.descrizione, "e elemento : ", item.descrizione)
      console.log("associabili", associabili)

      if (associabili.length <= quantita) {
        for (let ele of associabili) {
          isDubbio = true
          if (indubbio.indexOf(ele) === -1) indubbio.push(ele)
        }

      }
    }
    if (isDubbio && indubbio.length <= quantita) {
      console.log("indubbio", indubbio)
      return false
    }


    return true
  }


  getProposta(scelto: any, indice: number, opzioni: any, sorteggiati: any) {
    let associabili = this.getAssociabili(scelto, opzioni, sorteggiati)
    return associabili[associabili.length - indice]
  }


  getAssociabili(scelto: any, opzioni: any, sorteggiati: any) {

    let lista = []
    if (opzioni.girone && !opzioni.utente) {
      lista = sorteggiati.filter((e: { girone: string, id: string }) =>
        e.girone != scelto.girone && e.id != scelto.id);
    }
    if (!opzioni.girone && opzioni.utente) {
      lista = sorteggiati.filter((e: { id_utente: string, id: string }) =>
        e.id_utente != scelto.id_utente && e.id != scelto.id);
    }
    if (opzioni.girone && opzioni.utente) {
      lista = sorteggiati.filter((e: { id_utente: string, girone: string, id: string }) =>
        e.id_utente != scelto.id_utente && e.girone != scelto.girone && e.id != scelto.id);
    }

    if (!opzioni.girone && !opzioni.utente) {
      lista = sorteggiati
    }

    return lista
  }


  removeElement(key: number, lista: any) {
    if (lista.length > 0) {
      lista.forEach((value: { id: number; }, index: any) => {
        if (value.id == key) lista.splice(index, 1);
      });
    }
  }

  formatTabellone(tabellone: any) {

    let format: any = {
      ottavi: {},
      quarti: {},
      semifinale: {},
      finale: {}
    }

    for (let item of tabellone) {
      let match = item.partite
      let half_length = Math.ceil(match.length / 2);
      let all_length = match.length;
      let sinistra = match.slice(0, half_length);
      let destra = match.slice(half_length, all_length);
      item.sinistra = sinistra
      item.destra = destra
    }

    format.ottavi = tabellone.find((i: { id_fase: FasiCompetizione; }) => i.id_fase == FasiCompetizione.OTTAVI);
    format.quarti = tabellone.find((i: { id_fase: FasiCompetizione; }) => i.id_fase == FasiCompetizione.QUARTI);
    format.semifinale = tabellone.find((i: { id_fase: FasiCompetizione; }) => i.id_fase == FasiCompetizione.SEMI_FINALE);
    format.finale = tabellone.find((i: { id_fase: FasiCompetizione; }) => i.id_fase == FasiCompetizione.FINALE);

    return format
  }

  getAnnata() {
    return new Date().getFullYear() + "/" + new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getFullYear()
  }

  getCalcolo(palinsesto: Risultato[], filelist: any = [], fase: number, giornata: number): PayloadCalcolo {

    let payload: PayloadCalcolo

    for (let partite of palinsesto) {
      partite.CASA.somma = Number(partite.CASA.bonus)
      partite.TRASFERTA.somma = Number(partite.TRASFERTA.bonus)

      for (let casa of partite.CASA.schieramento) {
        casa.voto = Number(filelist[casa.calciatore]) || 4
        partite.CASA.somma += casa.voto;
      }

      for (let trasferta of partite.TRASFERTA.schieramento) {
        trasferta.voto = Number(filelist[trasferta.calciatore]) || 4
        partite.TRASFERTA.somma += trasferta.voto;
      }

      partite.CASA.goals = this.getGoals(partite.CASA.somma)
      partite.TRASFERTA.goals = this.getGoals(partite.TRASFERTA.somma)

      partite.CASA.punti = this.getPunti(partite.CASA.goals, partite.TRASFERTA.goals)
      partite.TRASFERTA.punti = this.getPunti(partite.TRASFERTA.goals, partite.CASA.goals)

      partite.CASA.rank = this.getRank(partite.CASA.goals, partite.CASA.punti, fase)
      partite.TRASFERTA.rank = this.getRank(partite.TRASFERTA.goals, partite.TRASFERTA.punti, fase)
    }

    payload = {
      giornata: giornata,
      risultati: palinsesto
    }

    return payload
  }

  private getPunti(a: number, b: number) {
    if (a == b) return 1
    if (a > b) return 3
    else return 0
  }

  private getGoals(somma: number): number {

    if (somma < 30) {
      return 0
    } else {
      let tmp: any = (somma - 27) / 3;
      return Number(parseInt(tmp).toFixed(0));
    }
  }

  private getRank(goals: number, punti: number, fase: number): number {
    return (goals * 2 * fase) + punti
  }

}
