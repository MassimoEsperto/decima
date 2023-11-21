import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../classi/utente';
import { HttpSenderService } from './http-sender-service';
import { SERVICE_TYPE, ADMIN_SERVICE } from '../../environments/environment';
import { Rosa } from '../classi/rosa';
//import * as XLSX from 'xlsx';

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

  insertSvincolati(payload: Rosa[]) {
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

  deleteUtente(id_utente: string) {
    const params = new HttpParams().set('id_utente', id_utente);
    return this.getFree(ADMIN_SERVICE.DEL_UTENTE, params)
  }

  deleteRosa(id_utente: string) {
    const params = new HttpParams().set('id_utente', id_utente);
    return this.getFree(ADMIN_SERVICE.DEL_ROSA_UTENTE, params)
  }

  deleteAccoppiamento(id: string) {
    const params = new HttpParams().set('id', id);
    return this.getFree(ADMIN_SERVICE.DEL_ACCOPPIAMENTO, params)
  }


  //recupero voti da xls
  // async getWorkbookFromFile(excelFile: File) {
  //   return new Promise<any>((resolve, reject) => {
  //     var reader = new FileReader();

  //     reader.onload = (event: any) => {
  //       var data = event.target.result;

  //       var workbook = XLSX.read(data, { type: 'binary' });

  //       console.log(workbook.SheetNames);
  //       resolve(workbook);
  //     };
  //     reader.readAsBinaryString(excelFile);
  //   });
  // }

  // async getVotiFromFile(file: File) {

  //   let filelist: any = [];

  //   var workbook = await this.getWorkbookFromFile(file);

  //   var first_sheet_name = workbook.SheetNames[0];
  //   var worksheet = workbook.Sheets[first_sheet_name];

  //   let _EMPTY_0 = worksheet.A1['h']
  //   var arraylist: any = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });

  //   for (let element of arraylist) {
  //     if (element.__EMPTY) {
  //       let nome: string = element['__EMPTY'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
  //       let voto: number = element['__EMPTY_3'] != '-' ? Number(element['__EMPTY_3'].toString().trim()) : 4
  //       let ruolo: string = element[_EMPTY_0].toString().trim()

  //       let ris = {
  //         nome: nome,
  //         voto: voto
  //       }
  //       //filelist.push(ris);
  //       filelist[nome] = voto
  //     }

  //     if (element.__EMPTY_6) {
  //       let nome: string = element['__EMPTY_6'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
  //       let voto: number = element['__EMPTY_9'] != '-' ? Number(element['__EMPTY_9'].toString().trim()) : 4
  //       let ruolo: string = element['__EMPTY_5'].toString().trim()

  //       let ris = {
  //         nome: nome,
  //         voto: voto
  //       }
  //       //filelist.push(ris);
  //       filelist[nome] = voto
  //     }
  //   }

  //   return filelist;
  // }


}

