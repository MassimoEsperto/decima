import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';
import { SharedModule } from './shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//Component
import { LoginComponent } from '../pagine/login/login.component';
import { DashboardComponent } from '../pagine/dashboard/dashboard.component';
import { CalendarioComponent } from '../pagine/dashboard/calendario/calendario.component';
import { SquadreComponent } from '../pagine/dashboard/squadre/squadre.component';
import { AdminstratorComponent } from '../pagine/adminstrator/adminstrator.component';
import { UtentiComponent } from '../pagine/adminstrator/utenti/utenti.component';
import { CompetizioneComponent } from '../pagine/adminstrator/competizione/competizione.component';
import { SignInComponent } from '../pagine/login/sign-in/sign-in.component';
import { RegisterComponent } from '../pagine/login/register/register.component';
import { RecPassComponent } from '../pagine/login/rec-pass/rec-pass.component';
import { ClassificaComponent } from '../pagine/dashboard/classifica/classifica.component';
import { HomeComponent } from '../pagine/dashboard/home/home.component';
import { InfoUtenteComponent } from '../pagine/dashboard/info-utente/info-utente.component';
import { PartitaIncorsoComponent } from '../pagine/dashboard/home/partita-incorso/partita-incorso.component';
import { PrePartitaComponent } from '../pagine/dashboard/home/pre-partita/pre-partita.component';
import { PostPartitaComponent } from '../pagine/dashboard/home/post-partita/post-partita.component';
import { StatisticheComponent } from '../pagine/dashboard/home/statistiche/statistiche.component';
import { SchieramentoComponent } from '../pagine/dashboard/schieramento/schieramento.component';
import { ComunicazioneComponent } from '../pagine/dashboard/comunicazione/comunicazione.component';
import { FrontespizioComponent } from '../pagine/login/frontespizio/frontespizio.component';
import { VotiLiveComponent } from '../pagine/dashboard/voti-live/voti-live.component';
import { RegistraSquadraComponent } from '../pagine/mercato/registra-squadra/registra-squadra.component';
import { MercatoComponent } from '../pagine/mercato/mercato.component';
import { ListaSquadreComponent } from '../pagine/mercato/lista-squadre/lista-squadre.component';
import { CalcoloVotiComponent } from '../pagine/adminstrator/competizione/calcolo-voti/calcolo-voti.component';
import { AccoppiamentiComponent } from '../pagine/adminstrator/accoppiamenti/accoppiamenti.component';
import { ListaSvincolatiComponent } from '../pagine/adminstrator/calciatori/lista-svincolati/lista-svincolati.component';
import { CaricaSquadreComponent } from '../pagine/adminstrator/calciatori/carica-squadre/carica-squadre.component';
import { SostituisciCalciatoreComponent } from '../pagine/adminstrator/calciatori/sostituisci-calciatore/sostituisci-calciatore.component';
import { CalciatoriComponent } from '../pagine/adminstrator/calciatori/calciatori.component';
import { NotificheComponent } from '../pagine/adminstrator/notifiche/notifiche.component';
import { InviaNotificaComponent } from '../pagine/adminstrator/notifiche/invia-notifica/invia-notifica.component';
import { ScriviNotificaComponent } from '../pagine/adminstrator/notifiche/scrivi-notifica/scrivi-notifica.component';
import { RecuperoFormazioniComponent } from '../pagine/adminstrator/competizione/recupero-formazioni/recupero-formazioni.component';
import { NicknameCalciatoriComponent } from '../pagine/adminstrator/calciatori/nickname-calciatori/nickname-calciatori.component';
import { PartiteComponent } from '../pagine/adminstrator/accoppiamenti/partite/partite.component';
import { DataGiornateComponent } from '../pagine/adminstrator/accoppiamenti/data-giornate/data-giornate.component';
import { SorteggiComponent } from '../pagine/adminstrator/accoppiamenti/sorteggi/sorteggi.component';
import { SorteggiEliminatorieComponent } from '../pagine/adminstrator/accoppiamenti/sorteggi/sorteggi-eliminatorie/sorteggi-eliminatorie.component';
import { SorteggiGironiComponent } from '../pagine/adminstrator/accoppiamenti/sorteggi/sorteggi-gironi/sorteggi-gironi.component';
import { PageNotFoundComponent } from '../pagine/page-not-found/page-not-found.component';
import { UpgradeSquadraFantaComponent } from '../pagine/mercato/upgrade-squadra-fanta/upgrade-squadra-fanta.component';
import { ComponiSquadraComponent } from '../pagine/mercato/componi-squadra/componi-squadra.component';
import { UpgradeSquadraLocaleComponent } from '../pagine/mercato/upgrade-squadra-locale/upgrade-squadra-locale.component';




@NgModule({
  declarations: [
    //app
    AppComponent,
    //login
    LoginComponent,
    SignInComponent,
    RegisterComponent,
    RecPassComponent,
    FrontespizioComponent,
    //iscrizione
    MercatoComponent,
    RegistraSquadraComponent,
    ListaSquadreComponent,
    UpgradeSquadraFantaComponent,
    ComponiSquadraComponent,
    UpgradeSquadraLocaleComponent,
    //not fount
    PageNotFoundComponent,
    //dash
    DashboardComponent,
    HomeComponent,
    CalendarioComponent,
    SquadreComponent,
    ClassificaComponent,
    InfoUtenteComponent,
    PartitaIncorsoComponent,
    PrePartitaComponent,
    PostPartitaComponent,
    StatisticheComponent,
    SchieramentoComponent,
    ComunicazioneComponent,
    VotiLiveComponent,
    //admin
    AdminstratorComponent,
    UtentiComponent,
    CompetizioneComponent,
    CalcoloVotiComponent,
    RecuperoFormazioniComponent,
    AccoppiamentiComponent,
    DataGiornateComponent,
    SorteggiComponent,
    SorteggiGironiComponent,
    SorteggiEliminatorieComponent,
    PartiteComponent,
    ListaSvincolatiComponent,
    CaricaSquadreComponent,
    SostituisciCalciatoreComponent,
    NicknameCalciatoriComponent,
    CalciatoriComponent,
    NotificheComponent,
    InviaNotificaComponent,
    ScriviNotificaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
