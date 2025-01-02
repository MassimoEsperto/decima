import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalFormService {

  private subject = new Subject<any>();


  getData(): Observable<any> {
    return this.subject.asObservable();
  }


  setData(data: any, sottomesso: () => void): any {
 
    this.subject.next({
      data: data,
      sottomesso(): any {
        if(this.subject)
        this.subject.next("");
        sottomesso();
      }
    });

  }

  setCombo(combo: any) {
    this.subject.next({ combo: combo });
  }
  
}