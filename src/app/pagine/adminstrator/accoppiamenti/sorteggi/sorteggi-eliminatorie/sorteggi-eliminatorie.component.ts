import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/servizi/client/admin.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { UtilService } from 'src/servizi/local/util.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sorteggi-eliminatorie',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './sorteggi-eliminatorie.component.html',
  styleUrl: './sorteggi-eliminatorie.component.scss',
  providers: [UtilService],
})
export class SorteggiEliminatorieComponent implements OnInit {

  views = { DEFAULT: 0, LISTA: 1, CARD: 2 }
  view: number = 0

  loading_btn: boolean = false;
  loading_page: boolean = false;
  loading_table: boolean = false;

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
