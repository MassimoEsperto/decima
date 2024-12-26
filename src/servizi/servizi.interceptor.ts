import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Utente } from 'src/app/classi/utente';
import { TOKEN_STORAGE } from 'src/environments/env';

export const serviziInterceptor: HttpInterceptorFn = (req, next) => {

  let storage = localStorage.getItem(TOKEN_STORAGE)
  let parse = storage ? JSON.parse(storage) : ""
  let utente: Utente = new Utente(parse)
  let token = utente.token
  //console.log("req.headers",req)
  if (req.headers.get('No-Auth') == 'True') {
    console.log("no auth")
    return next(req);
  }

  // Clone the request and add the authorization header
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors         
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      let message = err.error ? err.error.message : err
      return throwError(() => message);
    })
  );;
};


/**

import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from './alert.service'; // Importa il tuo AlertService

export const serviziInterceptor: HttpInterceptorFn = (req, next) => {
  // Inietta i servizi necessari
  const router = inject(Router);
  const alertService = inject(AlertService); // Inietta AlertService

  // Recupera il token dal localStorage
  const token = localStorage.getItem('authToken');

  // Aggiungi il token all'header, se presente
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Gestisci la richiesta e la risposta
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      // Se la risposta è di tipo HttpResponse e contiene un corpo con la proprietà 'data'
      if (event instanceof HttpResponse && event.body && event.body.data) {
        return event.body.data; // Restituisce solo la proprietà 'data'
      }
      return event.body; // Se non c'è 'data', restituisce l'intero corpo
    }),
    catchError((error) => {
      // Gestione degli errori, per esempio 401 (Token scaduto)
      if (error.status === 401) {
        console.error('Token scaduto o non valido. Redirigendo al login...');
        localStorage.removeItem('authToken');
        router.navigate(['/login']);
      } else if (error.status >= 400 && error.status < 500) {
        // Errore del client (400-499)
        alertService.showError('Errore client: ' + error.message);
      } else if (error.status >= 500) {
        // Errore del server (500-599)
        alertService.showError('Errore server: ' + error.message);
      }
      // Rilancia l'errore per permettere al chiamante di gestirlo
      return throwError(error);
    })
  );
};



 */