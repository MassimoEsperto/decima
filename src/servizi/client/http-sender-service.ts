import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs'
import { Utente } from 'src/app/classi/utente';
import { WS_BASE_URL, TOKEN_STORAGE, LANGUAGE_STORAGE, LABEL_STORAGE, SHIT_VERSION } from 'src/environments/env';


export class HttpSenderService {

  typeServices: string;

  constructor(type = "/", private httpClient: HttpClient) {
    this.typeServices = type
  }


  helper = new JwtHelperService();


  buildURL(operation: string = ""): string {

    let URL: string = WS_BASE_URL

    URL = URL + this.typeServices + operation + ".php"

    return URL

  }

  getLocalStorageParse() {
    let storage = this.getLocalStorage()
    return storage ? JSON.parse(storage) : false
  }

  getLocalStorage() {
    return localStorage.getItem(TOKEN_STORAGE)
  }

  delLocalStorage() {
    localStorage.removeItem(TOKEN_STORAGE);
    localStorage.removeItem(LANGUAGE_STORAGE);
    localStorage.removeItem(LABEL_STORAGE);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  setLocalStorage(input: any) {
    localStorage.setItem(TOKEN_STORAGE, input);
  }


  getLoggato() {

    let element = this.getLocalStorageParse()
    let utente: Utente = new Utente(element)

    return utente

  }

  scadenza() {
    let primaDate = new Date();
    primaDate.setHours(primaDate.getHours() + 2);

    return primaDate;
  }


  tokenError(res: any) {
    let errorToken = res['errorToken'];
    if (errorToken) {
      throw new Error('Token Non Valido')
    }
  }

  refreshPage() {
    window.location.reload();
  }


  refreshAndNav(router: Router, path: string) {

    window.location.replace("#/" + path);
    window.location.reload();

  }



  versione() {
    return SHIT_VERSION
  }

  postFree(servizio: string, payload: any) {

    return this.httpClient.post(`${this.buildURL(servizio)}`, { data: payload })
      .pipe(map((res: any) => {
        return res['data'];
      }));
  }

  putFree(servizio: string, payload: any) {

    return this.httpClient.put(`${this.buildURL(servizio)}`, { data: payload })
      .pipe(map((res: any) => {
        return res['data'];
      }));
  }

  getFree(servizio: string, params?: HttpParams) {

    return this.httpClient.get(`${this.buildURL(servizio)}`, { params: params }).pipe(
      map((res: any) => {
        return res['data'];
      }));
  }


  getAuth(servizio: string, params?: HttpParams) {

    return this.httpClient.get<any>(`${this.buildURL(servizio)}`,
      { params: params })
      .pipe(map((res: any) => {
        this.tokenError(res);//controllo token
        return res['data']
      }));
  }


  postAuth(servizio: string, payload: any) {

    return this.httpClient.post(`${this.buildURL(servizio)}`,
      { data: payload })
      .pipe(map((res: any) => {
        this.tokenError(res);//controllo token
        return res['data'];
      }));
  }

  putAuth(servizio: string, payload: any) {

    return this.httpClient.put(`${this.buildURL(servizio)}`,
      { data: payload })
      .pipe(map((res: any) => {
        this.tokenError(res);//controllo token
        return res['data'];
      })
      );
  }


}