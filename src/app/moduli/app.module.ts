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
import { AuthGuard } from '../servizi/auth-guard';
import { AdminGuard } from '../servizi/admin-guard';
import { InfoUtenteComponent } from '../pagine/dashboard/info-utente/info-utente.component';
import { PartitaIncorsoComponent } from '../pagine/dashboard/home/partita-incorso/partita-incorso.component';
import { PrePartitaComponent } from '../pagine/dashboard/home/pre-partita/pre-partita.component';
import { PostPartitaComponent } from '../pagine/dashboard/home/post-partita/post-partita.component';
import { StatisticheComponent } from '../pagine/dashboard/home/statistiche/statistiche.component';
import { SchieramentoComponent } from '../pagine/dashboard/schieramento/schieramento.component';
import { ComunicazioneComponent } from '../pagine/dashboard/comunicazione/comunicazione.component';

@NgModule({
  declarations: [
    //app
    AppComponent,
    //login
    LoginComponent,
    SignInComponent,
    RegisterComponent,
    RecPassComponent,
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
    //admin
    AdminstratorComponent,
    UtentiComponent,
    CompetizioneComponent
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
  providers: [AuthGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
