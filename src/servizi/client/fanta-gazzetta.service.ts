import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpSenderService } from './http-sender-service';
import { FANTA_SERVICE, SERVICE_TYPE } from 'src/environments/costanti';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FantaGazzettaService extends HttpSenderService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    super(SERVICE_TYPE.FANTA, http);
  }

  getProbabiliFormazione() {
    return this.getFree(FANTA_SERVICE.GET_PROBABILI_FORMAZIONI)
  }

  getLiveFormazione() {
    return this.getFree(FANTA_SERVICE.GET_VOTI_LIVE)
  }

  getVotiGionata(giornata: number) {
    const params = new HttpParams().set('giornata', giornata);
    return this.getFree(FANTA_SERVICE.GET_VOTI_GIORNATA, params)
  }


  getLega(lega: string) {
    const params = new HttpParams().set('lega', lega);
    return this.getFree(FANTA_SERVICE.GET_LEGA, params)
  }

  private _ballDontLieAuthHeader = {
    Authorization: `MY_AMAZING_TOKEN`,
  }

  async gettestread() {

    let urltest = "https://leghe.fantacalcio.it/fittiziainfinita/rose";
    let headers = new HttpHeaders()
      .set('App_key', '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a')
      .set('No-Auth', 'True')
    //.set('User-Agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.15) Gecko/20080623 Firefox/2.0.0.15')
    //   .set('Host', 'leghe.fantacalcio.it');


    await this.http.get(urltest, {
      headers: headers, responseType: 'text'
    }).subscribe(response => {
      let displayHTML = this.sanitizer.bypassSecurityTrustHtml(response);
      console.log("displayHTML", response)
    })
  }

  gettestread2() {
    var myHeaders = new Headers();

    myHeaders.append("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.15) Gecko/20080623 Firefox/2.0.0.15");
    myHeaders.append("App_key", "0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a");
    myHeaders.append("Cookie", "FCLeague=0=63ofH%2bkfxEnjFbQ1Q66SkwLayHL9S8CCmm%2fvZhZJ5%2bOvB5v7jb36rV5EdthHILsO7hqyf3JxKBa3s828gy%2b4s8GSFqMi4WRRFghMTh2xcL1IYMkimpXA%2bZSUg1BqiNsXo1SZyAVBiU1moe%2fUW6zCl1ViAAUAq13I4avtWBp1fAFVdT3PCx0C3r6bQl5JQZD1GGHt3mqS76U%2bS672fwb2K%2b6NJCPaX%2fJoSB4y1LvE1c8L%2bpNkH9%2fKoe9TYJFNuUj%2bMtvIXWdkVaGrx9npwu6CoPszatpuwwM%2fPmj0rYU%2f0YojHwu2o5qMY7mVXO16z9qrcCNY2Z6RSRhiYk%2fDkWn8NOtStHGRk2E1YI9sPPu%2f5u0%2biXG1%2fEyZeuSixIk0Z9aKoSxhY2clKmUCnYrK%2f9yWidDTxSxt6Tb%2f4dzPc%2fzcHDNWBt67GP1FqYfhEZoMT3%2bjrdkNOsrqCW7H0hFAAnuP17Qrsp1mE4Kw; comp_fittiziainfinita_FCLeague=0=206774; AWSALB=ocMQL7BSbY49c52uhZhtpXgsqJneSHERdC2ld4jv7MJnKcz8nyu6hkPsWz3BkEjRJjYAJ6Evh6IuH8fiO3jqui/ptLMVZgWf3CxqGN0ahyUAK67it+B5E03E4K+I; AWSALBCORS=ocMQL7BSbY49c52uhZhtpXgsqJneSHERdC2ld4jv7MJnKcz8nyu6hkPsWz3BkEjRJjYAJ6Evh6IuH8fiO3jqui/ptLMVZgWf3CxqGN0ahyUAK67it+B5E03E4K+I");



    fetch("https://leghe.fantacalcio.it/fittiziainfinita/rose", {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      mode: 'no-cors',

    })
      .then(response => console.log("response.text()", response))
      .catch(error => console.log('error', error));
  }

}
