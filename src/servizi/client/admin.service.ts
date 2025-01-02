import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSenderService } from './http-sender-service';
import { Utente } from 'src/app/classi/utente';
import { SERVICE_TYPE, ADMIN_SERVICE } from 'src/environments/costanti';
import { Calciatore } from 'src/app/classi/calciatore';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends HttpSenderService {

  constructor(private http: HttpClient) {
    super(SERVICE_TYPE.ADMIN, http);
  }


  getAdministrator(): Observable<any> {
    return this.getFree(ADMIN_SERVICE.GET_ADMINISTRATOR)
  }

  getFormazioniByGionata(giornata: string) {
    const params = new HttpParams().set('giornata', giornata);
    return this.getFree(ADMIN_SERVICE.GET_FORMAZIONI_BY_GIORNATA, params)
  }

  getGeneraCompetizioneGironi() {
    return this.getFree(ADMIN_SERVICE.GET_GENERA_COMPETIZIONE_GIRONI)
  }

  getGeneraCompetizioneEliminatorie() {
    return this.getFree(ADMIN_SERVICE.GET_GENERA_COMPETIZIONE_ELIMINATORIE)
  }

  getAccoppiamenti(): Observable<any[]> {
    return this.getFree(ADMIN_SERVICE.GET_ACCOPPIAMENTI)
  }

  get_all_object(tabelle: string) {
    const params = new HttpParams().set('tabelle', tabelle);
    return this.getFree(ADMIN_SERVICE.GET_ALL_OBJECTS, params)
  }

  calcolaGiornata(payload: any): Observable<any[]> {
    return this.postFree(ADMIN_SERVICE.SET_CALCOLO_GIORNATA, payload)
  }

  insertSvincolati(payload: Calciatore[]) {
    return this.postFree(ADMIN_SERVICE.SET_SVINCOLATI, payload)
  }

  insertRosaUtente(payload: any) { //associa la rosa all'utente
    return this.postFree(ADMIN_SERVICE.SET_ROSA_UTENTE, payload)
  }


  recuperoFormazione(payload: any): Observable<any[]> {
    return this.postFree(ADMIN_SERVICE.RECUPERA_SCHIERAMENTO, payload)
  }

  setComunicazione(payload: any): Observable<any[]> {
    return this.postFree(ADMIN_SERVICE.SET_COMUNICAZIONE, payload)
  }

  associaComunicazione(payload: any): Observable<any[]> {
    return this.postFree(ADMIN_SERVICE.ASSOCIA_COMUNICAZIONE, payload)
  }

  setGeneraCompetizioneGironi(payload: any): Observable<any[]> {
    return this.postFree(ADMIN_SERVICE.SET_GENERA_COMPETIZIONE_GIRONI, payload)
  }

  setGeneraCompetizioneEliminatorie(payload: any): Observable<any[]> {
    return this.postFree(ADMIN_SERVICE.SET_GENERA_COMPETIZIONE_ELIMINATORIE, payload)
  }

  sostituisciCalciatore(payload: any) {
    return this.postFree(ADMIN_SERVICE.UPD_PLAYER_UTENTE, payload)
  }

  cambiaDate(payload: any) {
    return this.postFree(ADMIN_SERVICE.UPD_GIORNATA, payload)
  }

  newData(payload: any) {
    return this.postFree(ADMIN_SERVICE.SET_GIORNATA, payload)
  }

  setAccoppiamento(payload: any) {
    return this.postFree(ADMIN_SERVICE.SET_ACCOPPIAMENTO, payload)
  }

  updAccoppiamento(payload: any) {
    return this.postFree(ADMIN_SERVICE.UPD_ACCOPPIAMENTO, payload)
  }

  deleteObjectById(payload: any) {
    return this.postFree(ADMIN_SERVICE.DEL_OBJECT_BY_ID, payload)
  }

  updDetailUtente(payload: Utente) {
    return this.putFree(ADMIN_SERVICE.UPD_DETAIL_UTENTE, payload)
  }

  deleteSquadra(payload: any) {
    return this.postFree(ADMIN_SERVICE.DEL_SQUADRA, payload)
  }

  deleteRosa(id_utente: string) {
    const params = new HttpParams().set('id_utente', id_utente);
    return this.getFree(ADMIN_SERVICE.DEL_ROSA_UTENTE, params)
  }

  deleteAccoppiamento(id: string) {
    const params = new HttpParams().set('id', id);
    return this.getFree(ADMIN_SERVICE.DEL_ACCOPPIAMENTO, params)
  }

  updCalciatore(payload: any) {
    return this.putFree(ADMIN_SERVICE.UPD_CALCIATORE, payload)
  }

  caricaLega(payload: any) {
    return this.postFree(ADMIN_SERVICE.SET_LEGA, payload)
  }

  setSwitchs(payload: any): Observable<any[]> {
    return this.postFree(ADMIN_SERVICE.SET_SWITCHS, payload)
  }

  setSwitchsItem(payload: any): Promise<any[]> {
    return this.postPromise(ADMIN_SERVICE.SET_SWITCHS, payload)
  }

  getFormazioniItem(giornata: string) {
    const params = new HttpParams().set('giornata', giornata);
    return this.getPromise(ADMIN_SERVICE.GET_FORMAZIONI_BY_GIORNATA, params)
  }

  recuperoFormazioneItem(payload: any): Promise<any[]> {
    return this.postPromise(ADMIN_SERVICE.RECUPERA_SCHIERAMENTO, payload)
  }

  setGeneraGiornate(payload: any): Observable<any[]> {
    return this.postFree(ADMIN_SERVICE.SET_GENERA_GIORNATE, payload)
  }

}

