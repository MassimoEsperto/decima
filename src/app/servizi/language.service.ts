import { Injectable } from '@angular/core';
import language_ita from 'src/assets/language/ita.json';
import language_eng from 'src/assets/language/eng.json';
import language_fra from 'src/assets/language/fra.json';
import language_cin from 'src/assets/language/cin.json';
import { LABEL_STORAGE, LANGUAGE_STORAGE } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  ITALIANO: string = "ita";
  INGLESE: string = "eng";
  FRANCESE: string = "fra";
  CINESE: string = "cin";
  DEFAULT: string = "ita";

  label: any = this.getLinguaggio()
  def: string = "ita";

  getLinguaggio() {
    let key = this.getLocalStorage(LANGUAGE_STORAGE);
    let label = this.getLocalStorageParse(LABEL_STORAGE)
    return !label ? this.chengeLinguaggio(key) : label
  }

  setLinguaggio(selected: string) {
    this.setLocalStorage(LANGUAGE_STORAGE, selected)
    let label = this.chengeLinguaggio(selected)
    this.setLocalStorage(LABEL_STORAGE, JSON.stringify(label))

    this.refreshPage();
  }

  chengeLinguaggio(key: string) {

    switch (key) {
      case this.ITALIANO:
        return language_ita
      case this.INGLESE:
        return language_eng
      case this.FRANCESE:
        return language_fra
      case this.CINESE:
        return language_cin

      default:
        this.setLocalStorage(LANGUAGE_STORAGE, this.DEFAULT)
        this.setLocalStorage(LABEL_STORAGE, JSON.stringify(language_ita))
        return language_ita
    }
  }

  refreshPage() {
    window.location.reload();
  }


  getLocalStorageParse(element: string) {
    let storage = this.getLocalStorage(element)
    return storage ? JSON.parse(storage) : false
  }

  getLocalStorage(element: string) {
    return localStorage.getItem(element) || ""
  }

  delLocalStorage(element: string) {
    localStorage.removeItem(element);
  }

  setLocalStorage(element: string, value: any) {
    localStorage.setItem(element, value);
  }
}
