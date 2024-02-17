import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
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
import { InfoUtenteComponent } from '../pagine/dashboard/info-utente/info-utente.component';
import { SchieramentoComponent } from '../pagine/dashboard/schieramento/schieramento.component';
import { ComunicazioneComponent } from '../pagine/dashboard/comunicazione/comunicazione.component';
import { VotiLiveComponent } from '../pagine/dashboard/voti-live/voti-live.component';
import { IscrizioneComponent } from '../pagine/iscrizione/iscrizione.component';
import { AccoppiamentiComponent } from '../pagine/adminstrator/accoppiamenti/accoppiamenti.component';
import { NotificheComponent } from '../pagine/adminstrator/notifiche/notifiche.component';

import { AuthService } from '../servizi/auth.service';
import { PageNotFoundComponent } from '../pagine/page-not-found/page-not-found.component';


const AdminGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthService).isAdmin()
      ? true
      : inject(Router).navigate(['/login']);
  };

const PlayerGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthService).isPlayer()
      ? true
      : inject(Router).navigate(['/login']);
  };

const GhostGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthService).isGhost()
      ? true
      : inject(Router).navigate(['/login']);
  };

  const MercatoGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthService).isMercato()
      ? true
      : inject(Router).navigate(['/login']);
  };


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
    canActivate: [MercatoGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PlayerGuard],
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
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix'
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
      },
      {
        path: '',
        redirectTo: 'utenti',
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
