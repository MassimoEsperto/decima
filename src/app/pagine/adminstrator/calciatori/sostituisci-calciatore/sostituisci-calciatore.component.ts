import { Component, Input } from '@angular/core';
import { AdminService } from 'src/servizi/client/admin.service';
import { PlayerService } from 'src/servizi/client/player.service';
import { AlertService } from 'src/servizi/local/alert.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sostituisci-calciatore',
  standalone: true,
  imports: [
    MyButton,
    CommonModule,
    FormsModule
  ],
  templateUrl: './sostituisci-calciatore.component.html',
  styleUrl: './sostituisci-calciatore.component.scss'
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
          this.loading_btn = false;
        },
        error: (error: any) => {
          this.alert.error(error);

        }
      })

  }

  sostituisciCalciatore(payload: any) {

    this.adminService.sostituisciCalciatore(payload)
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

    this.loading_btn = true;

    let payload = {
      id_squadra: element.utente.id_squadra,
      player_in: element.player,
      player_out: element.utente.id_calciatore
    }

    this.sostituisciCalciatore(payload)
  }


}

