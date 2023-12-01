import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { OnInitComp } from 'src/app/classi/OnInitComp';


@Component({
  selector: 'rec-pass',
  templateUrl: './rec-pass.component.html',
  styleUrls: ['./rec-pass.component.scss']
})
export class RecPassComponent extends OnInitComp implements OnInit {

  @Output() submitto = new EventEmitter();
  @Input() combo: any;

  constructor(
    private alert: AlertService,
    private auth: AuthService) {
    super();
  }

  ngOnInit(): void { }

  onRecPass(utente: any) {

    this.loading_btn = true

    this.auth.recuperaPassword(utente.id)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {
          this.alert.success("A breve riceverai una email con la tua password");
          this.submitto.emit(this.LOGIN_PAGE.SIGN_IN)

        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

}

