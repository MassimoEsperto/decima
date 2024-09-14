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
    console.log("no autttttt")
    return next(req);
  }

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(
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