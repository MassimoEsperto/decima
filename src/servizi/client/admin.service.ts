import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSenderService } from './http-sender-service';
import * as XLSX from 'xlsx';
import { Rosa } from 'src/app/classi/rosa';
import { Utente } from 'src/app/classi/utente';
import { SERVICE_TYPE, ADMIN_SERVICE } from 'src/environments/costanti';

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


  //recupero valori da xls
  async getWorkbookFromFile(excelFile: File) {
    return new Promise<any>((resolve, reject) => {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        var data = event.target.result;

        var workbook = XLSX.read(data, { type: 'binary' });

        //console.log(workbook.SheetNames);
        resolve(workbook);
      };
      reader.readAsBinaryString(excelFile);
    });
  }


  async getVotiFromFile(file: File) {

    let filelist: any = [];

    var workbook = await this.getWorkbookFromFile(file);

    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];

    let _EMPTY_0 = worksheet.A1['h']
    var arraylist: any = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });

    for (let element of arraylist) {
      if (element.__EMPTY) {
        let nome: string = element['__EMPTY'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
        let voto: number = element['__EMPTY_3'] != '-' ? Number(element['__EMPTY_3'].toString().trim()) : 4
        let ruolo: string = element[_EMPTY_0].toString().trim()

        let ris = {
          nome: nome,
          voto: voto
        }
        //filelist.push(ris);
        filelist[nome] = voto
      }

      if (element.__EMPTY_6) {
        let nome: string = element['__EMPTY_6'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
        let voto: number = element['__EMPTY_9'] != '-' ? Number(element['__EMPTY_9'].toString().trim()) : 4
        let ruolo: string = element['__EMPTY_5'].toString().trim()

        let ris = {
          nome: nome,
          voto: voto
        }
        //filelist.push(ris);
        filelist[nome] = voto
      }
    }

    return filelist;
  }


  async getSvincolatiFromFile(file: File, lista_attuale: any) {

    let filelist: any = [];

    var workbook = await this.getWorkbookFromFile(file);

    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];

    var arraylist: any = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });

    for (let i = 2; i < arraylist.length; i++) {
      let element = arraylist[i]

      let ruolo: string = element['__EMPTY'].toLocaleUpperCase().replace("'", "").trim()
      let nome: string = element['__EMPTY_1'].toLocaleUpperCase().replace("'", "").trim()

      if (!nome.includes("*")) {
        let esiste = lista_attuale.some((i: { nome_calciatore: string; }) => i.nome_calciatore == nome);
        if (!esiste) {
          let ele: Rosa = new Rosa(ruolo, nome);
          filelist.push(ele);
        }
      }

    }

    return filelist;
  }



  async getSquadreFromFile(file: File, lista_attuale: any) {

    let filelist = { formazioni: new Array(), lega: "", inesistente: "" }

    let formazione_S: any = [];
    let formazione_D: any = [];

    var workbook = await this.getWorkbookFromFile(file);

    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];

    let _EMPTY_0 = worksheet.A1['h']

    var arraylist: any = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });


    filelist.lega = arraylist[0][_EMPTY_0].replace("https://leghe.fantacalcio.it/", "").replace("'", "").replace(".", "").trim()

    let team_S: string = "";
    let team_D: string = "";
    for (let i = 0; i < arraylist.length; i++) {

      let element = arraylist[i];

      let ruolo_S: string = element[_EMPTY_0] ? element[_EMPTY_0].toString().trim() : "";
      let ruolo_D: string = element['__EMPTY_4'] ? element['__EMPTY_4'].toString().trim() : "";

      if (ruolo_S && ruolo_S.length < 2) {
        team_S = team_S ? team_S : arraylist[i - 2][_EMPTY_0].toLocaleUpperCase().replace("'", "").replace(".", "").trim()

        let nome_calciatore = element['__EMPTY'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
        try {

          let ele = {
            nome: nome_calciatore,
            id_calciatore: lista_attuale.find((x: { [x: string]: any; }) => x['nome_calciatore'] == nome_calciatore).id_calciatore
          }

          formazione_S.push(ele);
        } catch (error) {
          filelist.inesistente = filelist.inesistente + nome_calciatore + ' di ' + team_S + ' non presente nella lista! '
        }


      } else {
        if (team_S) {
          let singolo = {
            utente: team_S,
            squadra: formazione_S
          }
          filelist.formazioni.push(singolo)
          team_S = "";
          formazione_S = [];
        }
      }

      if (ruolo_D && ruolo_D.length < 2) {
        team_D = team_D ? team_D : arraylist[i - 2]['__EMPTY_4'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()

        let nome_calciatore = element['__EMPTY_5'].toLocaleUpperCase().replace("'", "").replace(".", "").trim()
        try {

          let ele = {
            nome: nome_calciatore,
            id_calciatore: lista_attuale.find((x: { [x: string]: any; }) => x['nome_calciatore'] == nome_calciatore).id_calciatore
          }

          formazione_D.push(ele);
        } catch (error) {
          filelist.inesistente = filelist.inesistente + nome_calciatore + ' di ' + team_D + ' non presente nella lista! '
        }

      } else {
        if (team_D) {
          let singolo: any = {
            utente: team_D,
            squadra: formazione_D
          }
          filelist.formazioni.push(singolo)
          team_D = "";
          formazione_D = [];
        }
      }

    }

    return filelist;
  }




}

