import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpSenderService } from './http-sender-service';
import { Utente } from 'src/app/classi/utente';
import { SERVICE_TYPE, PLAYER_SERVICE } from 'src/environments/costanti';



@Injectable({
  providedIn: 'root'
})
export class PlayerService extends HttpSenderService {

  constructor(private http: HttpClient, private route: Router) {
    super(SERVICE_TYPE.PLAYER, http);
  }


  getListaRose() {
    return this.getAuth(PLAYER_SERVICE.GET_ALL_ROSE_UTENTI)
  }

  getAvatars() {
    return this.getAuth(PLAYER_SERVICE.GET_AVATARS)
  }

  getInfoUtente() {
    return this.getAuth(PLAYER_SERVICE.GET_INFO_UTENTE)
  }

  getDashboard() {
    return this.getAuth(PLAYER_SERVICE.GET_DASHBOARD)
  }

  getCalendario() {
    return this.getAuth(PLAYER_SERVICE.GET_CALENDARIO_RISULTATI)
  }

  getClassifiche() {
    return this.getAuth(PLAYER_SERVICE.GET_CLASSIFICHE)
  }

  getFormazioniInserite() {
    return this.getAuth(PLAYER_SERVICE.GET_FORMAZIONI_INSERITE)
  }

  getConvocabili() {
    return this.getAuth(PLAYER_SERVICE.GET_CONVOCABILI)
  }

  getCommunicazioni() {
    return this.getAuth(PLAYER_SERVICE.GET_COMUNICAZIONI)
  }

  viewMatch(match: any) { //match_live
    const params = new HttpParams().set('match', match.id_calendario);
    return this.getAuth(PLAYER_SERVICE.GET_VIEW_MATCH, params)
  }

  insertFormazione(payload: any): Observable<any[]> {
    return this.postAuth(PLAYER_SERVICE.SET_SCHIERAMENTO, payload)
  }

  upgradeRosa(payload: any): Observable<any[]> {
    return this.postAuth(PLAYER_SERVICE.UPGRADE_ROSA, payload)
  }

  updateUtente(payload: Utente) {
    return this.putAuth(PLAYER_SERVICE.UPD_UTENTE, payload)
  }



}

