import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { LanguageService } from 'src/app/servizi/language.service';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
