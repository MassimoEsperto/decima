import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from '../pagine/dashboard/calendario/calendario.component';
import { SquadreComponent } from '../pagine/dashboard/squadre/squadre.component';
import { DashboardComponent } from '../pagine/dashboard/dashboard.component';
import { LoginComponent } from '../pagine/login/login.component';
import { AdminstratorComponent } from '../pagine/adminstrator/adminstrator.component';
import { UtentiComponent } from '../pagine/adminstrator/utenti/utenti.component';
import { CompetizioneComponent } from '../pagine/adminstrator/competizione/competizione.component';
import { HomeComponent } from '../pagine/dashboard/home/home.component';
import { ClassificaComponent } from '../pagine/dashboard/classifica/classifica.component';
import { CalciatoriComponent } from '../pagine/adminstrator/calciatori/calciatori.component';
import { AuthGuard } from '../servizi/auth-guard';
import { AdminGuard } from '../servizi/admin-guard';
import { InfoUtenteComponent } from '../pagine/dashboard/info-utente/info-utente.component';
import { SchieramentoComponent } from '../pagine/dashboard/schieramento/schieramento.component';
import { ComunicazioneComponent } from '../pagine/dashboard/comunicazione/comunicazione.component';
import { VotiLiveComponent } from '../pagine/dashboard/voti-live/voti-live.component';
import { IscrizioneComponent } from '../pagine/iscrizione/iscrizione.component';
import { UpgradeSquadraComponent } from '../pagine/dashboard/upgrade-squadra/upgrade-squadra.component';
import { AccoppiamentiComponent } from '../pagine/adminstrator/accoppiamenti/accoppiamenti.component';
import { NotificheComponent } from '../pagine/adminstrator/notifiche/notifiche.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'iscrizione',
    component: IscrizioneComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'calendario',
        component: CalendarioComponent
      },
      {
        path: 'classifica',
        component: ClassificaComponent
      },
      {
        path: 'squadre',
        component: SquadreComponent
      },
      {
        path: 'info-utente',
        component: InfoUtenteComponent
      },
      {
        path: 'schieramento',
        component: SchieramentoComponent
      },
      {
        path: 'comunicazioni',
        component: ComunicazioneComponent
      },
      {
        path: 'voti-live',
        component: VotiLiveComponent
      },
      {
        path: 'upgrade-squadra',
        component: UpgradeSquadraComponent
      }

    ]
  },
  {
    path: 'adminstrator',
    component: AdminstratorComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'utenti',
        component: UtentiComponent
      },
      {
        path: 'competizione',
        component: CompetizioneComponent
      },
      {
        path: 'date',
        component: AccoppiamentiComponent
      },
      {
        path: 'calciatori',
        component: CalciatoriComponent
      },
      {
        path: 'comunicazioni',
        component: NotificheComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
