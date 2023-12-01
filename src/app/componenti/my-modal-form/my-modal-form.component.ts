import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/servizi/admin.service';
import { ModalFormService } from 'src/app/servizi/modal-form.service';


@Component({
  selector: 'my-modal-form',
  templateUrl: './my-modal-form.component.html',
  styleUrls: ['./my-modal-form.component.scss']
})
export class MyModalForm implements OnInit {

  private subscription: Subscription = new Subscription;

  data: any;

  constructor(
    private forms: ModalFormService,
    private adminService: AdminService
  ) { }

  ngOnInit(): any {

    this.subscription = this.forms.getData().subscribe((input: any) => {
      this.data = input.data.record;
      if (this.data) {
        console.log("this.data",this.data)
      }
    });
  }

 
  ngOnDestroy() {
    document.body.removeAttribute("style");
  }

}  
