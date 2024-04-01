import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyAlert } from './componenti/my-alert/my-alert.component';
import { MyModalViewMatch } from './componenti/my-modal-view-match/my-modal-view-match.component';
import { MyConfirmDialog } from './componenti/my-confirm-dialog/my-confirm-dialog.component';
import { MyModalAlbo } from './componenti/my-modal-albo/my-modal-albo.component';
import { MyModalForm } from './componenti/my-modal-form/my-modal-form.component';
import { MyModalLanguage } from './componenti/my-modal-language/my-modal-language.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MyAlert,
    MyModalViewMatch,
    MyConfirmDialog,
    MyModalAlbo,
    MyModalForm,
    MyModalLanguage
  ],
  template: ` 
  <router-outlet></router-outlet>
  <my-alert></my-alert>
  <my-modal-view-match></my-modal-view-match>
  <my-confirm-dialog></my-confirm-dialog>
  <my-modal-albo></my-modal-albo>
  <my-modal-form></my-modal-form>
  <my-modal-language></my-modal-language>
`
})
export class AppComponent {
  
}
