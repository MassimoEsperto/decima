import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { OnInitComp } from 'src/app/classi/OnInitComp';


@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends OnInitComp implements OnInit {

  @Output() submitto = new EventEmitter();

  constructor(
    private router: Router,
    private alert: AlertService,
    private auth: AuthService) {
    super();
  }

  ngOnInit() { }

  onLogin(payload: any) {

    this.auth.login(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {

          let num_msg: number = Number(result.num_msg)
          let fase: number = Number(result.fase)

          if (fase == this.FASE_COMPETIZIONE.ISCRIZIONE || fase == this.FASE_COMPETIZIONE.MERCATO) {
            this.navigate('mercato', '')
          } else {
            if (num_msg > 0)
              this.navigate("comunicazioni", "dashboard/");
            else
              this.navigate("home", "dashboard/");

          }
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }

  navigate(page: string, path: string) {
    let destination: string = path + page
    this.router.navigate([destination])
      .then(() => {
        window.location.reload();
      });
  }

}



