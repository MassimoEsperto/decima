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

  setData(data: any) {
    this.subject.next({ data: data });
  }
  
}