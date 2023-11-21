import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: ` 
              <router-outlet></router-outlet>
              <my-alert></my-alert>
              <my-modal-view-match></my-modal-view-match>
              <my-confirm-dialog></my-confirm-dialog>
              <my-modal-albo></my-modal-albo>
<my-modal-language></my-modal-language>
            `
})
export class AppComponent {

  ngOnInit() { }

}
