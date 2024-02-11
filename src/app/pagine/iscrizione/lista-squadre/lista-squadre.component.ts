import { AfterContentInit, Component, EventEmitter, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { AlertService } from 'src/app/servizi/alert.service';
import { ConfirmDialogService } from 'src/app/servizi/confirm-dialog.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';
import { SpinnerService } from 'src/app/servizi/spinner.service';
import { ViewIscirzione } from 'src/environments/enums';

@Component({
  selector: 'lista-squadre',
  templateUrl: './lista-squadre.component.html',
  styleUrls: ['./lista-squadre.component.scss']
})
export class ListaSquadreComponent implements AfterContentInit {

  @Output() change = new EventEmitter();
  VIEW_ISCRIZIONE = ViewIscirzione;

  info: any
  squadre: any = []
  loading_btn: boolean = false;
  date: string = new Date().getFullYear() + "/" + new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getFullYear()

  constructor(
    private playerService: PlayerService,
    public language: LanguageService,
    public spinner: SpinnerService,
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
      //this.delSquadra(payload);
      console.log("delSquadra ", payload)
    })
  }


  delSquadra(payload: any) {

    this.loading_btn = true;

    this.playerService.delSquadra(payload)
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

