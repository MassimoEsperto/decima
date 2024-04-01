import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { AdminService } from 'src/servizi/client/admin.service';
import { AuthService } from 'src/servizi/client/auth.service';
import { LanguageService } from 'src/servizi/local/language.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { RecPassComponent } from './rec-pass/rec-pass.component';
import { FrontespizioComponent } from './frontespizio/frontespizio.component';
import { CommonModule } from '@angular/common';




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
    this.verificaVersione()
    this.getUtenti()
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

  verificaVersione() {

    this.authService.verificaVersioneWeb()
      .pipe(finalize(() => {
        setTimeout(() => {
          this.loading_page = false
        }, 3000)
      }
      ))
      .subscribe({

        next: (result: any) => {
          this.verifica = result;
          this.errore = result.error
        },
        error: (error: any) => {
          this.errore = true
        }
      })

  }


}
