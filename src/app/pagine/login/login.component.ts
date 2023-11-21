import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servizi/admin.service';
import { AlertService } from 'src/app/servizi/alert.service';
import { AuthService } from 'src/app/servizi/auth.service';
import { finalize } from 'rxjs';
import { OnInitComp } from 'src/app/classi/OnInitComp';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends OnInitComp implements OnInit  {

    //MOMENTANEE
 
    view: number = this.LOGIN_PAGE.SIGN_IN;
    utenti: any = []
  
    constructor(  private adminService: AdminService,
      private alert: AlertService,
      private auth: AuthService){
      super();
    }

 

  
    ngOnInit() {
      this.loading_page = true
      this.getUtenti()
    }
  
    changeView(item: number) {
      this.view = item
    }
    

    getUtenti() {

      this.adminService.get_all_object("utenti")
        .pipe(finalize(() =>
          setTimeout(() => {
            this.loading_page = false
          }, 3000)
  
        ))
        .subscribe({
  
          next: (result: any) => {
            this.utenti = result
          },
          error: (error: any) => {
            this.alert.error(error);
          }
        })
  
    }
 

}
