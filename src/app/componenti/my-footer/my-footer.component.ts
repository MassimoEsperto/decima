import { Component, Input, OnInit } from '@angular/core';
import { ASSETS_BASE_URL, VERSION, WHATSAPP_URL } from 'src/environments/environment';
import { AuthService } from 'src/app/servizi/auth.service';
import { OnInitComp } from 'src/app/classi/OnInitComp';
import { Utente } from 'src/app/classi/utente';
import { LanguageService } from 'src/app/servizi/language.service';

@Component({
  selector: 'my-footer',
  templateUrl: './my-footer.component.html',
  styleUrls: ['./my-footer.component.scss']
})
export class MyFooter extends OnInitComp implements OnInit {

  versione = VERSION;
  url_assets = ASSETS_BASE_URL;
  url_whatsapp = WHATSAPP_URL;

  loggato: Utente = new Utente();
  @Input() amministrazione = false;

  constructor(
    private authService: AuthService,
    public language: LanguageService) {
    super();
  }

  ngOnInit() {
    this.loggato = this.authService.getLoggato();
  }


  logOut() {
    this.authService.logout();
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  azzeraMessaggi(){}

}
