import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { AccoppiamentiComponent } from 'src/app/pagine/adminstrator/accoppiamenti/accoppiamenti.component';
import { AdminstratorComponent } from 'src/app/pagine/adminstrator/adminstrator.component';
import { CalciatoriComponent } from 'src/app/pagine/adminstrator/calciatori/calciatori.component';
import { CompetizioneComponent } from 'src/app/pagine/adminstrator/competizione/competizione.component';
import { NotificheComponent } from 'src/app/pagine/adminstrator/notifiche/notifiche.component';
import { UtentiComponent } from 'src/app/pagine/adminstrator/utenti/utenti.component';
import { CalendarioComponent } from 'src/app/pagine/dashboard/calendario/calendario.component';
import { ClassificaComponent } from 'src/app/pagine/dashboard/classifica/classifica.component';
import { ComunicazioneComponent } from 'src/app/pagine/dashboard/comunicazione/comunicazione.component';
import { DashboardComponent } from 'src/app/pagine/dashboard/dashboard.component';
import { HomeComponent } from 'src/app/pagine/dashboard/home/home.component';
import { InfoUtenteComponent } from 'src/app/pagine/dashboard/info-utente/info-utente.component';
import { SchieramentoComponent } from 'src/app/pagine/dashboard/schieramento/schieramento.component';
import { SquadreComponent } from 'src/app/pagine/dashboard/squadre/squadre.component';
import { VotiLiveComponent } from 'src/app/pagine/dashboard/voti-live/voti-live.component';
import { LoginComponent } from 'src/app/pagine/login/login.component';
import { MercatoComponent } from 'src/app/pagine/mercato/mercato.component';
import { PageNotFoundComponent } from 'src/app/pagine/page-not-found/page-not-found.component';
import { PAGE } from 'src/environments/costanti';
import { AuthService } from 'src/servizi/client/auth.service';



const AdminGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthService).isAdmin()
      ? true
      : inject(Router).navigate([PAGE.DEFAULT]);
  };

const PlayerGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthService).isPlayer()
      ? true
      : inject(Router).navigate([PAGE.DEFAULT]);
  };

const GhostGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthService).isGhost()
      ? true
      : inject(Router).navigate([PAGE.DEFAULT]);
  };

  const MercatoGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthService).isMercato()
      ? true
      : inject(Router).navigate([PAGE.DEFAULT]);
  };


  export const routes: Routes = [
  {
    path: PAGE.EMPTY,
    redirectTo: PAGE.DEFAULT,
    pathMatch: 'full'
  },
  {
    path: PAGE.LOGIN,
    component: LoginComponent
  },
  {
    path: PAGE.MERCATO,
    component: MercatoComponent,
    canActivate: [MercatoGuard],
  },
  {
    path: PAGE.DASHBOARD.PATH,
    component: DashboardComponent,
    canActivate: [PlayerGuard],
    children: [
      {
        path: PAGE.DASHBOARD.RELATIVE.HOME,
        component: HomeComponent
      },
      {
        path: PAGE.DASHBOARD.RELATIVE.CALENDARIO,
        component: CalendarioComponent
      },
      {
        path: PAGE.DASHBOARD.RELATIVE.CLASSIFICA,
        component: ClassificaComponent
      },
      {
        path: PAGE.DASHBOARD.RELATIVE.SQUADRE,
        component: SquadreComponent
      },
      {
        path: PAGE.DASHBOARD.RELATIVE.INFO_UTENTE,
        component: InfoUtenteComponent
      },
      {
        path: PAGE.DASHBOARD.RELATIVE.SCHIERAMENTO,
        component: SchieramentoComponent
      },
      {
        path: PAGE.DASHBOARD.RELATIVE.COMUNICAZIONI,
        component: ComunicazioneComponent
      },
      {
        path: PAGE.DASHBOARD.RELATIVE.VOTI_LIVE,
        component: VotiLiveComponent
      },
      {
        path: PAGE.EMPTY,
        redirectTo: PAGE.DASHBOARD.RELATIVE.HOME,
        pathMatch: 'prefix'
      }

    ]
  },
  {
    path: PAGE.ADMINISTRATOR.PATH,
    component: AdminstratorComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: PAGE.ADMINISTRATOR.RELATIVE.UTENTI,
        component: UtentiComponent
      },
      {
        path: PAGE.ADMINISTRATOR.RELATIVE.COMPETIZIONE,
        component: CompetizioneComponent
      },
      {
        path: PAGE.ADMINISTRATOR.RELATIVE.DATE,
        component: AccoppiamentiComponent
      },
      {
        path: PAGE.ADMINISTRATOR.RELATIVE.CALCIATORI,
        component: CalciatoriComponent
      },
      {
        path: PAGE.ADMINISTRATOR.RELATIVE.NOTIFICHE,
        component: NotificheComponent
      },
      {
        path: PAGE.EMPTY,
        redirectTo: PAGE.ADMINISTRATOR.RELATIVE.UTENTI,
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

