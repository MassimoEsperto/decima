import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { LOGIN_PAGE } from 'src/environments/costanti';
import { AuthService } from 'src/servizi/client/auth.service';
import { AlertService } from 'src/servizi/local/alert.service';

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    MyButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @Output() submitto = new EventEmitter();

  constructor(
    private alert: AlertService,
    private auth: AuthService) {
  }

  loading_btn: boolean = false
  LOGIN_PAGE = LOGIN_PAGE


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

    this.submitto.emit(LOGIN_PAGE.SIGN_IN)
  }


}
