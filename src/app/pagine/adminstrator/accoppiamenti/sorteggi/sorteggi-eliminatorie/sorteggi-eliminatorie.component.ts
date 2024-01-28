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

    this.eliminatorie = this.util.sorteggiaEliminatorie(this.sorteggiati, this.opzioni)

    if (this.eliminatorie.length == 0) {
      this.alert.error("Attenzione Accoppiamento Impossibilei")
    }

    this.loading_btn = false
  }

  annulla() {
    this.sorteggiati = []
    this.eliminatorie = []
    this.view = this.views.LISTA
  }

  salvaEliminatoria() {
    let payload = { squadre: this.eliminatorie, id_fase: this.opzioni.fase.id }
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
