import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MyButton } from '../componenti/my-button/my-button.component';
import { MyConfirmDialog } from '../componenti/my-confirm-dialog/my-confirm-dialog.component';
import { MyAlert } from '../componenti/my-alert/my-alert.component';
import { MyFooter } from '../componenti/my-footer/my-footer.component';
import { MySpinner } from '../componenti/my-spinner/my-spinner.component';
import { MyNavbarAdmin } from '../componenti/my-navbar-admin/my-navbar-admin.component';
import { MyNavbarUtente } from '../componenti/my-navbar-utente/my-navbar-utente.component';
import { MyNavlink } from '../componenti/my-navlink/my-navlink.component';
import { MyTitolo } from '../componenti/my-titolo/my-titolo.component';
import { MyRisultati } from '../componenti/my-risultati/my-risultati.component';
import { MyModalViewMatch } from '../componenti/my-modal-view-match/my-modal-view-match.component';
import { MyLogo } from '../componenti/my-logo/my-logo.component';
import { MyModalAlbo } from '../componenti/my-modal-albo/my-modal-albo.component';
import { MyModalLanguage } from '../componenti/my-modal-language/my-modal-language.component';
import { MyInfoCard } from '../componenti/my-info-card/my-info-card.component';
import { MyModalForm } from '../componenti/my-modal-form/my-modal-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [
    MyButton,
    MyNavbarAdmin,
    MyNavbarUtente,
    MyNavlink,
    MyConfirmDialog,
    MyAlert,
    MyFooter,
    MySpinner,
    MyTitolo,
    MyRisultati,
    MyModalViewMatch,
    MyLogo,
    MyModalAlbo,
    MyModalLanguage,
    MyInfoCard,
    MyModalForm
  ],
  exports: [
    MyButton,
    MyNavbarAdmin,
    MyNavbarUtente,
    MyNavlink,
    MyConfirmDialog,
    MyAlert,
    MyFooter,
    MySpinner,
    MyTitolo,
    MyRisultati,
    MyModalViewMatch,
    MyLogo,
    MyModalAlbo,
    MyModalLanguage,
    MyInfoCard,
    MyModalForm
  ],
  providers: [
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
