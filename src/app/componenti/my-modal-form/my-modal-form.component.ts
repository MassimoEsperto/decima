import { Component, OnInit } from '@angular/core';
import { finalize, map, Subscription } from 'rxjs';
import { ModalFormService } from 'src/servizi/local/modal-form.service';
import { FormUtenti } from './form-utenti/form-utenti.component';
import { FormPartite } from './form-partite/form-partite.component';
import { FormGiornate } from './form-giornate/form-giornate.component';
import { FormSwitchs } from './form-switchs/form-switchs.component';
import { AuthService } from 'src/servizi/client/auth.service';
import { ShitCup } from 'src/app/classi/dto/shitcup.dto';
import { Lookup } from 'src/app/classi/dto/lookup.dto';
import { FormSquadre } from './form-squadre/form-squadre.component';


@Component({
  selector: 'my-modal-form',
  templateUrl: './my-modal-form.component.html',
  standalone: true,
  imports: [
    FormUtenti,
    FormSquadre,
    FormPartite,
    FormGiornate,
    FormSwitchs
  ],
  styleUrl: './my-modal-form.component.scss'
})
export class MyModalForm implements OnInit {

  private subscription: Subscription = new Subscription;

  data: any;
  combo: any;
  input: any;
  lookup!: Lookup;

  constructor(
    private forms: ModalFormService,
    private authService: AuthService
  ) { }

  ngOnInit(): any {

    this.getInfo()

    this.subscription = this.forms.getData().subscribe((input: any) => {

      this.input = input
      this.data = input.data ? input.data : this.data;
      this.combo = input.combo ? input.combo.lista : this.combo;

    });
  }

  getInfo() {

    this.authService.getInfo()
      .pipe(
        map(data => new ShitCup(data)),
      ).subscribe({

        next: (result: ShitCup) => {
          this.lookup = result.lookup
        },
        error: (error: any) => {

        },

      })

  }

  sottomesso() {
    this.input.sottomesso();
  }

  ngOnDestroy() {
    document.body.removeAttribute("style");
  }

}  
