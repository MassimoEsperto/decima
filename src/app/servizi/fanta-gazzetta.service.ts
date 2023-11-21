import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE_TYPE, FANTA_SERVICE } from '../../environments/environment';
import { HttpSenderService } from './http-sender-service';

@Injectable({
  providedIn: 'root'
})
export class FantaGazzettaService extends HttpSenderService {

  constructor(private http: HttpClient) {
    super(SERVICE_TYPE.FANTA, http);
  }

  getProbabiliFormazione() {
    return this.getFree(FANTA_SERVICE.GET_PROBABILI_FORMAZIONI)
  }

  getLiveFormazione() {
    return this.getFree(FANTA_SERVICE.GET_VOTI_LIVE)
  }

  getLega(lega: string) {
    const params = new HttpParams().set('lega', lega);
    return this.getFree(FANTA_SERVICE.GET_LEGA, params)
  }

}
