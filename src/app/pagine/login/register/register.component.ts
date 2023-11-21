import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends OnInitComp implements OnInit {

  @Output() submitto = new EventEmitter();

  constructor(
    private alert: AlertService,
    private auth: AuthService) {
    super();
  }

  ngOnInit(): void {
  }

  onRegister(payload: any) {

    this.loading_btn = true

    this.auth.registraUtente(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success("ok");
          
          this.goToLink(payload)
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }


  goToLink(payload: any) {

    this.submitto.emit(this.LOGIN_PAGE.SIGN_IN)
  }


}
