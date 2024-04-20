import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(

    private el: ElementRef,
    private renderer?: Renderer2) { }

  
  clodeModal() {
    if(this.renderer){
      let div = this.renderer.createElement('div');
      div.setAttribute('data-bs-dismiss', 'modal');
      div.setAttribute('hidden', 'true');
      this.renderer.appendChild(this.el.nativeElement, div);
      div.click();
      this.renderer.removeChild(this.el.nativeElement, div);
    }
  }

}
