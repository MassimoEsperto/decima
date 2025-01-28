import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs';
import { AdminService } from 'src/servizi/client/admin.service';
import { AuthService } from 'src/servizi/client/auth.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { RecPassComponent } from './rec-pass/rec-pass.component';
import { FrontespizioComponent } from './frontespizio/frontespizio.component';
import { CommonModule } from '@angular/common';
import { ShitCup } from 'src/app/classi/dto/shitcup.dto';
import { SHIT_VERSION } from 'src/environments/env';
import { InfoGenerali } from 'src/app/classi/dto/info.generali.dto';
import { ALERT_MSG, LOGIN_PAGE } from 'src/environments/costanti';




@Component({
  selector: 'login',
  standalone: true,
  imports: [
    SignInComponent,
    RegisterComponent,
    RecPassComponent,
    FrontespizioComponent,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loading_btn: boolean = false;
  loading_page: boolean = false;
  loading_table: boolean = false;

  LOGIN_PAGE = LOGIN_PAGE;

  ALERT_MSG = ALERT_MSG;
  view: number = this.LOGIN_PAGE.SIGN_IN;
  utenti: any = []
  errore: boolean = false;
  info!: InfoGenerali;

  constructor(private adminService: AdminService,
    private authService: AuthService,
    public language: LanguageService) {
  }


  ngOnInit() {
    this.loading_page = true
    this.authService.clearLocalStorage()
    this.getUtenti()
    this.getInfo()
  }

  changeView(item: number) {
    this.view = item
  }


  getUtenti() {
    this.adminService.get_all_object("utenti")
      .subscribe({
        next: (result: any) => {
          this.utenti = result
        }
      })
  }



  getInfo() {

    this.authService.getInfo()
      .pipe(
        map(data => new ShitCup(data)),
        finalize(() => {
          setTimeout(() => {
            this.loading_page = false
          }, 3000)
        })
      ).subscribe({

        next: (result: ShitCup) => {
          result.info.versione_fe = SHIT_VERSION
          this.info = result.info
          this.adminService.setInfoCompetizione(result.info)
          this.errore = this.info.erroreVersione()

        },
        error: (error: any) => {
          this.errore = true
        },

      })

  }


}
