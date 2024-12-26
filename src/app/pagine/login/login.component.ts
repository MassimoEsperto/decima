import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
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
export class LoginComponent extends OnInitComp implements OnInit {

  view: number = this.LOGIN_PAGE.SIGN_IN;
  utenti: any = []
  errore: boolean = false;
  verifica: any;

  constructor(private adminService: AdminService,
    private authService: AuthService,
    public language: LanguageService) {
    super();
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
          console.log("getInfo", result)

          let verifica = {
            applicazione: result.info.versione,
            locale: SHIT_VERSION,
            error: result.info.versione != SHIT_VERSION
          }

          this.verifica = verifica;
          this.errore = verifica.error

        },
        error: (error: any) => {
          this.errore = true
        },

      })

  }


}
