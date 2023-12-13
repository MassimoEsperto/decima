import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalFormService } from 'src/app/servizi/modal-form.service';


@Component({
  selector: 'my-modal-form',
  templateUrl: './my-modal-form.component.html',
  styleUrls: ['./my-modal-form.component.scss']
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
