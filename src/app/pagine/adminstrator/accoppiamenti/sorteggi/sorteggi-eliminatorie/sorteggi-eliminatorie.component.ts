import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { UtilService } from 'src/app/servizi/util.service';

@Component({
  selector: 'sorteggi-eliminatorie',
  templateUrl: './sorteggi-eliminatorie.component.html',
  styleUrls: ['./sorteggi-eliminatorie.component.scss'],
  providers: [UtilService],
})
export class SorteggiEliminatorieComponent extends OnInitComp implements OnInit {

  views = { DEFAULT: 0, LISTA: 1, CARD: 2 }
  view: number = 0


  sorteggiabili: any
  sorteggiati: any = []
  fasi: any
  opzioni: any = { fase: "", girone: false, utente: false }

  eliminatorie: any = []

  constructor(
    public language: LanguageService,
    private alert: AlertService,
    private adminService: AdminService,
    private util: UtilService) {
    super();
  }


  ngOnInit() {

  }


  selected() {
    return this.sorteggiabili ? this.sorteggiabili.filter((e: { selected: boolean; }) => e.selected === true) : [];
  }

  selezionaTutto(event: any) {

    let checked = event.target.checked

    for (let s of this.sorteggiabili) {
      s.selected = checked
    }
  }


  sorteggio() {

    this.loading_btn = true
    this.sorteggiati = this.selected();
    this.eliminatorie = []


    //controllo se è pari
    if (this.util.isDisPari(this.sorteggiati.length)) {
      this.alert.error("Attenzione Numero Dispari")
      this.loading_btn = false
      return
    }

    this.view = this.views.CARD

    console.log("sorteggiati", this.sorteggiati)
    console.log("OPZIONI", this.opzioni)

    this.eliminatorie = this.util.sorteggiaEliminatorie(this.sorteggiati,this.opzioni)
 
    if(this.eliminatorie.length==0){
      this.alert.error("Attenzione Accoppiamento Impossibilei")
    }


   // console.log("tabellone ", this.eliminatorie)
    // let ran = this.randomInteger(0, lista.length - 1)
    // this.sorteggiati.push(lista[ran])
    // this.removeElement(lista[ran].id)
    this.loading_btn = false
  }

/*
  setTabellone() {

    let quantita = this.sorteggiati.length
    let scelto = this.sorteggiati[0]
    console.log("scelto", scelto)

    this.removeElement(scelto.id, this.sorteggiati)

    for (let i = 1; i < quantita; i++) {

      let proposta = this.getProposta(scelto, i)

      if (!proposta) {
        this.alert.error("Attenzione Accoppiamento Impossibilei")
        this.eliminatorie = []
        this.loading_btn = false
        return
      }

      let accettata: boolean = this.isPropostaAccettata(proposta, (quantita - 2) / 2)

      if (accettata) {
        console.log("proposta accettata", proposta)
        this.removeElement(proposta.id, this.sorteggiati)
        this.eliminatorie.push({ casa: scelto, trasferta: proposta })
        if (this.sorteggiati.length > 0) {
          this.setTabellone()
          break
        }
      } else {
        console.log("proposta rifiutata", proposta)
        continue;
      }
    }
  }


  isPropostaAccettata(proposta: any, quantita: number) {

    console.log("quantita minima", quantita)
    let indubbio = []
    let isDubbio: boolean = false

    for (let item of this.sorteggiati) {

      if(item.id == proposta.id) continue;

      let associabili = this.getAssociabili(item)

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


  getProposta(scelto: any, indice: number) {
    let associabili = this.getAssociabili(scelto)
    return associabili[associabili.length - indice]
  }


  getAssociabili(scelto: any) {

    let lista = []
    if (this.opzioni.girone && !this.opzioni.utente) {
      lista = this.sorteggiati.filter((e: { girone: string, id: string }) => 
      e.girone != scelto.girone && e.id != scelto.id);
    }
    if (!this.opzioni.girone && this.opzioni.utente) {
      lista = this.sorteggiati.filter((e: { id_utente: string, id: string }) => 
      e.id_utente != scelto.id_utente && e.id != scelto.id);
    }
    if (this.opzioni.girone && this.opzioni.utente) {
      lista = this.sorteggiati.filter((e: { id_utente: string, girone: string, id: string }) =>
       e.id_utente != scelto.id_utente && e.girone != scelto.girone && e.id != scelto.id);
    }

    if (!this.opzioni.girone && !this.opzioni.utente) {
      lista = this.sorteggiati
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
*/

  annulla() {
    this.sorteggiati = []
    this.eliminatorie = []
    this.view = this.views.LISTA
  }

  salvaEliminatoria() {

     let payload = { squadre: this.eliminatorie, id_fase: this.opzioni.fase.id }
     console.log("payload",payload)
     this.setGeneraEliminatoria(payload)

  }

  getStartNewEliminatoria() {

    this.adminService.getGeneraCompetizioneEliminatorie()

      .subscribe({
        next: (result: any) => {

          this.sorteggiabili = result.sorteggiabili;
          this.fasi = result.fasi
          this.view = this.views.LISTA

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }


  setGeneraEliminatoria(payload: any) {

    this.loading_btn = true;

    console.log("payload", payload)

    this.adminService.setGeneraCompetizioneEliminatorie(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }
      )).subscribe({

        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          this.view = this.views.DEFAULT
          this.sorteggiati = []
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }






}
