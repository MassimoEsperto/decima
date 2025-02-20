import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { InfoGenerali } from 'src/app/classi/dto/info.generali.dto';
import { LOOKUPS } from 'src/app/classi/dto/lookup.dto';
import { MyButton } from 'src/app/componenti/my-button/my-button.component';
import { LOGIN_PAGE, PAGE } from 'src/environments/costanti';
import { AuthService } from 'src/servizi/client/auth.service';
import { AlertService } from 'src/servizi/local/alert.service';



@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [
    MyButton,
    FormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  @Output() submitto = new EventEmitter();
  loading_btn: boolean = false
  LOGIN_PAGE = LOGIN_PAGE

  constructor(
    private router: Router,
    private alert: AlertService,
    private auth: AuthService) {
  }

  ngOnInit() { }

  onLogin(payload: any) {

    this.auth.login(payload)
      .pipe(finalize(() =>
        this.loading_btn = false
      ))
      .subscribe({

        next: (result: any) => {

          let info: InfoGenerali = this.auth.getInfoCompetizione()
          let num_msg: number = Number(result.num_msg)

          if (info.fase == LOOKUPS.FASI.ISCRIZIONE || info.fase == LOOKUPS.FASI.MERCATO) {
            this.navigate(PAGE.MERCATO)
          } else {
            if (num_msg > 0){
              this.router.navigate([PAGE.DASHBOARD.ABSOLUTE.COMUNICAZIONI]);
            }
            else{
              this.router.navigate([PAGE.DASHBOARD.ABSOLUTE.HOME]);
          }
          }
        },
        error: (error: any) => {
          this.alert.error(error);
        }
      })

  }



  navigate(path: string) {
    this.router.navigate([path])
      .then(() => {
        window.location.reload();
      });
  }

}



