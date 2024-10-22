import { Injectable } from '@angular/core';
import { Calciatore, Roster } from 'src/app/classi/calciatore';
import * as XLSX from 'xlsx';

const ruoli_consentiti: Array<string> = ["P", "C", "D", "A", "C", "D", "Por", "Ds", "Dc", "Dd", "B", "E", "M", "C", "W", "T", "A", "Pc"];

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

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
        let nome: string = element['__EMPTY'].replace("'", "").trim()
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
        let nome: string = element['__EMPTY_6'].replace("'", "").trim()
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

    let filelist: Roster = new Roster();

    var workbook = await this.getWorkbookFromFile(file);

    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];

    var arraylist: any = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });

    for (let i = 1; i < arraylist.length; i++) {
      let element = arraylist[i]

      let ruolo: string = element['__EMPTY'].toLocaleUpperCase().replace("'", "").trim();
      let nome: string = element['__EMPTY_2'].replace("'", "").trim();
      let valore: number = element['__EMPTY_10'];


      if (!nome.includes("*")) {
        let esiste = lista_attuale.some((i: { nome_calciatore: string; }) => i.nome_calciatore == nome);
        let ele: Calciatore = new Calciatore(ruolo, nome, valore);
        esiste ? filelist.vincolati.push(ele) : filelist.svincolati.push(ele)

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

    filelist.lega = arraylist[0][_EMPTY_0].replace("https://leghe.fantacalcio.it/", "").replace("'", "").trim()

    let team_S: string = "";
    let team_D: string = "";
    for (let i = 0; i < arraylist.length; i++) {

      let element = arraylist[i];

      let ruolo_S: string = element[_EMPTY_0] ? element[_EMPTY_0].toString().trim() : "";
      let ruolo_D: string = element['__EMPTY_4'] ? element['__EMPTY_4'].toString().trim() : "";

      if (this.isRuolo(ruolo_S)) {
        team_S = team_S ? team_S : arraylist[i - 2][_EMPTY_0].replace("'", "").trim()

        let nome_calciatore = element['__EMPTY'].replace("'", "").trim()
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

      if (this.isRuolo(ruolo_D)) {
        team_D = team_D ? team_D : arraylist[i - 2]['__EMPTY_4'].replace("'", "").trim()

        let nome_calciatore = element['__EMPTY_5'].replace("'", "").trim()
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

  isRuolo(item: string): boolean {

    let ele = item.split(";")[0]

    return ruoli_consentiti.some(x => x == ele)

  }

}
