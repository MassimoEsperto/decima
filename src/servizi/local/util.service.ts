import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { PayloadCalcolo, Risultato } from 'src/app/classi/entity/risultato.entity';
import { Giornata } from 'src/app/classi/dto/giornata.dto';
import { LOOKUPS, RepTurni } from 'src/app/classi/dto/lookup.dto';
import { BOLEANO } from 'src/environments/costanti';


@Injectable({
  providedIn: 'root'
})
export class UtilService {


  constructor(
    private language: LanguageService) { }

  FASE_COMPETIZIONE = LOOKUPS.FASI;
  TURNI_COMPETIZIONE = LOOKUPS.TURNI;


  getTurni(input: number) {

    switch (Number(input)) {
      case this.TURNI_COMPETIZIONE.GIRONI:
        return this.language.label.page.turni.gironi
      case this.TURNI_COMPETIZIONE.SPAREGGI:
        return this.language.label.page.turni.spareggi
      case this.TURNI_COMPETIZIONE.OTTAVI:
        return this.language.label.page.turni.ottavi
      case this.TURNI_COMPETIZIONE.QUARTI:
        return this.language.label.page.turni.quarti
      case this.TURNI_COMPETIZIONE.SEMIFINALE:
        return this.language.label.page.turni.semi_finale
      case this.TURNI_COMPETIZIONE.FINALE:
        return this.language.label.page.turni.finale
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

    format.ottavi = tabellone.find((i: { id_turno: number; }) => i.id_turno == LOOKUPS.TURNI.OTTAVI);
    format.quarti = tabellone.find((i: { id_turno: number; }) => i.id_turno == LOOKUPS.TURNI.QUARTI);
    format.semifinale = tabellone.find((i: { id_turno: number; }) => i.id_turno == LOOKUPS.TURNI.SEMIFINALE);
    format.finale = tabellone.find((i: { id_turno: number; }) => i.id_turno == LOOKUPS.TURNI.FINALE);

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
    return (goals * fase) + punti
  }

  // Funzione per generare numeri casuali unici
  private getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }


  // Metodo che genera il calendario con gironi, eliminatorie e spareggio
  generaGiornate(min: number, max: number, turni: RepTurni[]): Giornata[] {

    const numeriGiornate: Set<number> = new Set();
    const giornateDisponibili = max - min;
    const media = Math.floor((giornateDisponibili - 10) / (turni.length - 1));

    if (20 >= giornateDisponibili) {
      throw new Error('Valori non validi per le fasi o il range');
    }

    numeriGiornate.add(min); //aggiungo la prima giornata

    let minimo: number = min;
    let quantitaTotale: number = 0;

    for (let turno of turni) {

      let quantitaSingola: number = turno.quantita;
      let massimo = quantitaSingola < 4 ? media : 10
      quantitaTotale += quantitaSingola

      while (numeriGiornate.size < quantitaTotale) {
        numeriGiornate.add(this.getRandomInt(minimo, minimo + massimo));
      }
      minimo += massimo
    }

    const giornateOrdinate = Array.from(numeriGiornate).sort((a, b) => a - b);

    return giornateOrdinate.map((numero, index) => {
      let giornata = index + 1 // Indice che parte da 1
      let turno = this.findFaseByGiornata(giornata, turni);

      return {
        id_giornata: giornata,
        id_turno: turno,
        serie_a: numero
      };
    });

  }

  findFaseByGiornata(gio: number, turni: RepTurni[]): number {
    let quantita: number = 0;
    for (let turno of turni) {
      quantita += turno.quantita;

      if (gio <= quantita) {
        return turno.code
      }

    }

    return 0
  }






}
