import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { ViewIscirzione, TipoSquadra, StatiSquadra, FasiCompetizione } from 'src/environments/enums';
import { AuthService } from 'src/servizi/client/auth.service';
import { PlayerService } from 'src/servizi/client/player.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { ConfirmDialogService } from 'src/servizi/local/confirm-dialog.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SpinnerService } from 'src/servizi/local/spinner.service';
import { UtilService } from 'src/servizi/local/util.service';



@Component({
  selector: 'lista-squadre',
  standalone: true,
  imports: [
    MyButton,
    CommonModule,
    RouterModule
  ],
  templateUrl: './lista-squadre.component.html',
  styleUrl: './lista-squadre.component.scss'
})
export class ListaSquadreComponent implements AfterContentInit {

  @Output() change = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() mercato = new EventEmitter();
  @Input() fase: number = 0;

  VIEW_ISCRIZIONE = ViewIscirzione;
  TIPO_SQUADRA = TipoSquadra;
  STATO_SQUADRA = StatiSquadra;
  FASE_COMPETIZIONE = FasiCompetizione;




  info: any
  squadre: any = []
  loading_btn: boolean = false;
  date: string = this.utilService.getAnnata()

  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    public language: LanguageService,
    public spinner: SpinnerService,
    private utilService: UtilService,
    private confirmDialogService: ConfirmDialogService,
    private alert: AlertService) {
  }

  //aggiunto per il reload
  ngAfterContentInit() {
    this.getInfoUtente();
  }

  getInfoUtente() {

    this.spinner.view();

    this.playerService.getInfoUtente()
      .pipe(finalize(() => {
        this.spinner.clear()
      }))
      .subscribe({
        next: (result: any) => {
          this.info = result;
          this.squadre = result.squadre
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })
  }


  onDelete(id: any) {

    let payload = { id: id }

    this.confirmDialogService.confirmThis("Sei sicuro di voler eliminare la squadra ?", () => {
      this.delSquadra(payload);
    })
  }


  delSquadra(payload: any) {

    this.loading_btn = true;

    this.authService.delSquadraRegistrata(payload)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {

          this.alert.success(this.language.label.alert.success);
          this.getInfoUtente();

        },
        error: (error: any) => {
          this.alert.error(error);
        },

      })
  }

  copyMessage(text: string) {
    navigator.clipboard.writeText(text).then().catch(e => console.log(e));
  }

}

