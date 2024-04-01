import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, VERSION } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { Utente } from 'src/app/classi/utente';
import { PAGE } from 'src/environments/costanti';
import { ASSETS_BASE_URL, WHATSAPP_URL } from 'src/environments/env';
import { AuthService } from 'src/servizi/client/auth.service';
import { LanguageService } from 'src/servizi/local/language.service';



@Component({
  selector: 'my-footer',
  templateUrl: './my-footer.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  styleUrl: './my-footer.component.scss'
})
export class MyFooter extends OnInitComp implements OnInit {

  versione = VERSION;
  url_pdf = ASSETS_BASE_URL + PAGE.DOWLOAD_PDF;
  url_whatsapp = WHATSAPP_URL;
  PAGE = PAGE
  

  loggato: Utente = new Utente();
  @Input() amministrazione = false;

  constructor(
    private authService: AuthService,
    public language: LanguageService) {
    super();
  }

  ngOnInit() {
    this.loggato = this.authService.getLoggato();
    PAGE.DASHBOARD.ABSOLUTE._INFO_UTENTE
    
  }


  logOut() {
    this.authService.logout();
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  azzeraMessaggi() { }

}
