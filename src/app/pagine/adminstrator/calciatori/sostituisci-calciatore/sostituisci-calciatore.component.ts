import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { LanguageService } from 'src/app/servizi/language.service';
import { PlayerService } from 'src/app/servizi/player.service';

@Component({
  selector: 'sostituisci-calciatore',
  templateUrl: './sostituisci-calciatore.component.html',
  styleUrls: ['./sostituisci-calciatore.component.scss']
})
export class SostituisciCalciatoreComponent {


  @Input() listaRose: any;
  loading_btn: boolean = false
  listaRoseUtenti: any;

  constructor(
    private adminService: AdminService,
    private playerService: PlayerService,
    public language: LanguageService,
    private alert: AlertService) {
  }


  ngOnInit() { this.getListaRoseUtenti() }


  getListaRoseUtenti() {

    this.playerService.getListaRose()

      .subscribe({

        next: (result: any) => {
          this.listaRoseUtenti = result;
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  sostituisciCalciatore(payload: any) {

    this.adminService.sostituisciCalciatore(payload)
      .pipe(finalize(() => {
        this.loading_btn = false;
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success(this.language.label.alert.success);
          this.getListaRoseUtenti()
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }


  onSostituisci(element: any) {

    let payload = {
      id_squadra: element.utente.id_squadra,
      player_in: element.player,
      player_out: element.utente.id_calciatore
    }

    this.sostituisciCalciatore(payload)
  }


}

