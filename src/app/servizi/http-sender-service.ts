import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, throwError } from 'rxjs'
import { Utente } from '../classi/utente';
import { WS_BASE_URL, TOKEN_STORAGE, VERSION, LANGUAGE_STORAGE, LABEL_STORAGE } from '../../environments/environment';


export class HttpSenderService {

  typeServices: string;

  constructor(type = "/", private httpClient: HttpClient) {
    this.typeServices = type
  }


  helper = new JwtHelperService();
  
  myheaders: any

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

  setLocalStorage(input: any) {
    localStorage.setItem(TOKEN_STORAGE, input);
  }


  getLoggato() {

    let element = this.getLocalStorageParse()
    let utente: Utente = new Utente(element)

    return utente

  }

  refreshHeaders() {
    if (!this.myheaders) {
      let utente: Utente = this.getLoggato()
      if (Utente)
        this.myheaders = { headers: new HttpHeaders().set('Authorization', `Bearer ${utente.token}`) }
    }
  }


  scadenza() {
    let primaDate = new Date();
    primaDate.setHours(primaDate.getHours() + 2);

    return primaDate;
  }


  handleError(response: HttpErrorResponse) {
    console.log("response", response)
    let message = response.error ? response.error.message : response
    return throwError(message);
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

  versione() {
    return VERSION
  }

  postFree(servizio: string, payload: any) {

    return this.httpClient.post(`${this.buildURL(servizio)}`, { data: payload })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  putFree(servizio: string, payload: any) {

    return this.httpClient.put(`${this.buildURL(servizio)}`, { data: payload })
      .pipe(map((res: any) => {
        return res['data'];
      }),
        catchError(this.handleError));
  }

  getFree(servizio: string, params?: HttpParams) {

    return this.httpClient.get(`${this.buildURL(servizio)}`, { params: params }).pipe(
      map((res: any) => {
        return res['data'];
      }),
      catchError(this.handleError));
  }


  getAuth(servizio: string, params?: HttpParams) {

    this.refreshHeaders()

    return this.httpClient.get<any>(`${this.buildURL(servizio)}`,
      { params: params, headers: this.myheaders.headers })
      .pipe(map((res: any) => {
        this.tokenError(res);//controllo token
        return res['data']
      }),
        catchError(this.handleError));
  }


  postAuth(servizio: string, payload: any) {

    this.refreshHeaders()

    return this.httpClient.post(`${this.buildURL(servizio)}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {
        this.tokenError(res);//controllo token
        return res['data'];
      }),
        catchError(this.handleError));
  }

  putAuth(servizio: string, payload: any) {

    this.refreshHeaders()

    return this.httpClient.put(`${this.buildURL(servizio)}`,
      { data: payload }, this.myheaders)
      .pipe(map((res: any) => {
        this.tokenError(res);//controllo token
        return res['data'];
      }),
        catchError(this.handleError));
  }


}