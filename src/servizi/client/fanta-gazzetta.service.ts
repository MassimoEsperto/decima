import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpSenderService } from './http-sender-service';
import { FANTA_SERVICE, SERVICE_TYPE } from 'src/environments/costanti';

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
