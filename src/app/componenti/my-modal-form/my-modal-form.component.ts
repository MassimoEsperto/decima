import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalFormService } from 'src/servizi/local/modal-form.service';
import { FormUtenti } from './form-utenti/form-utenti.component';
import { FormPartite } from './form-partite/form-partite.component';
import { FormGiornate } from './form-giornate/form-giornate.component';


@Component({
  selector: 'my-modal-form',
  templateUrl: './my-modal-form.component.html',
  standalone: true,
  imports: [
    FormUtenti,
    FormPartite,
    FormGiornate
  ],
  styleUrl: './my-modal-form.component.scss'
})
export class MyModalForm implements OnInit {

  private subscription: Subscription = new Subscription;

  data: any;
  combo: any;
  input: any;

  constructor(private forms: ModalFormService) { }

  ngOnInit(): any {

    this.subscription = this.forms.getData().subscribe((input: any) => {

      this.input = input
      this.data = input.data ? input.data : this.data;
      this.combo = input.combo ? input.combo.lista : this.combo;

    });
  }

  sottomesso() {
    this.input.sottomesso();
  }

  ngOnDestroy() {
    document.body.removeAttribute("style");
  }

}  
