import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HttpSenderService } from './http-sender-service';
import { Observable } from 'rxjs';

import { FasiCompetizione, RuoliUtente } from 'src/environments/enums';
import { AUTH_SERVICE, SERVICE_TYPE } from 'src/environments/costanti';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpSenderService {

  /**
   * Costruttore
   * @param http Servizio richieste HTTP
   */
  constructor(private http: HttpClient, private route: Router) {
    super(SERVICE_TYPE.AUT, http);
  }

  /**
   * Login
   * @param username Username
   * @param password Password
   * cambiare in post
   */
  login(payload: any) {

    return this.http.post(`${this.buildURL(AUTH_SERVICE.SIGNI_IN)}`, { data: payload })
      .pipe(map((res: any) => {
        let token = res['token'];

        const decoded = this.helper.decodeToken(token);
        decoded.token = token;

        this.setToken(decoded);

        return decoded;
      })
      );
  }


  /**
   * Effettua il logout
   */
  logout(): void {
    this.delLocalStorage();
    this.refreshPage();
  }

  /**
   * Verifica se l'utente è loggato
   */
  isLogged(): boolean {

    let token = this.getLocalStorage()

    if (!token) return false; //nel caso nn ci sia token

    let now = new Date();
    let scadenza: Date = new Date(this.getLocalStorageParse().scadenza);

    // Ritorna true se il token è presente nella sessione false nel caso sia scaduto
    return !!token && now < scadenza

  }

  isAdmin(): boolean {

    if (!this.isLogged()) return false

    let ruolo = this.getLoggato().ruolo

    if (ruolo == RuoliUtente.ADMIN) return true

    return false
  }

  isPlayer(): boolean {

    if (!this.isLogged()) return false

    let ruolo = this.getLoggato().ruolo

    if (ruolo == RuoliUtente.ADMIN || ruolo == RuoliUtente.PLAYER) return true

    return false
  }

  isGhost(): boolean {

    if (!this.isLogged()) return false

    let ruolo = this.getLoggato().ruolo

    if (ruolo == RuoliUtente.GHOST) return true

    return false
  }


  isMercato(): boolean {

    if (!this.isLogged()) return false

    let fase = this.getLoggato().fase

    if (fase == FasiCompetizione.MERCATO || fase == FasiCompetizione.ISCRIZIONE) return true

    return false
  }



  /**
  * salva il token in sessione
  * @param tkuser 
  */
  setToken(tkuser: any) {
    tkuser.scadenza = this.scadenza().toString();
    let input = JSON.stringify(tkuser)
    this.setLocalStorage(input)
  }

  setTokenDecoded(tkuser: any) {
    const decoded = this.helper.decodeToken(tkuser);
    decoded.token = tkuser;
    this.setToken(decoded);
  }

  /**
   * recupera la password
   * @param username 
   * @param email 
   */
  recuperaPassword(id: string) {
    const params = new HttpParams().set('id_utente', id);
    return this.getFree(AUTH_SERVICE.RECUPERA_PASSWORD, params)
  }

  segnalaUtente(payload: any) {
    return this.postFree(AUTH_SERVICE.REGISTER_MAIL, payload)
  }

  registraUtente(payload: any): Observable<any[]> {
    return this.postFree(AUTH_SERVICE.REGISTRA_UTENTE, payload)
  }

  registraSquadra(payload: any): Observable<any[]> {
    return this.postFree(AUTH_SERVICE.REGISTRA_SQUADRA, payload)
  }

  getRegister() {
    return this.getFree(AUTH_SERVICE.GET_REGISTER)
  }

  getComponiSquadra(id: number) {
    const params = new HttpParams().set('id_squadra', id);
    return this.getFree(AUTH_SERVICE.GET_COMPONI_SQUADRA, params)
  }

  setComponiSquadra(payload: any): Observable<any[]> {
    return this.postAuth(AUTH_SERVICE.SET_COMPONI_SQUADRA, payload)
  }

  updComponiSquadra(payload: any): Observable<any[]> {
    return this.postAuth(AUTH_SERVICE.UPD_COMPONI_SQUADRA, payload)
  }

  delSquadraRegistrata(payload: any): Observable<any[]> {
    return this.postAuth(AUTH_SERVICE.DEL_SQUADRA_REGISTRATA, payload)
  }

  verificaVersioneWeb() {
    return this.http.get(`${this.buildURL("info")}`)
      .pipe(map((res: any) => {
        let verifica = {
          applicazione: res['data']['info']['VERSIONE'],
          locale: this.versione(),
          error: res['data']['info']['VERSIONE'] != this.versione()
        }
        return verifica;
      }));
  }

}