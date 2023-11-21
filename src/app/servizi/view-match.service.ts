import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewMatchService {
  
  private subject = new Subject<any>();  

 
  getMatch(): Observable<any> {  
      return this.subject.asObservable();  
  }  

  setMatch(match: any) {
    this.subject.next({ data: match});
}
}