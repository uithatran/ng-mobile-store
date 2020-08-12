import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return next.handle(request);
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   console.log("Interception In Progress"); //SECTION 1
  //   const token: string = localStorage.getItem('token');
  //   req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  //   req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
  //   req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

  //   return next.handle(req)
  //       .pipe(
  //          catchError((error: HttpErrorResponse) => {
  //               //401 UNAUTHORIZED - SECTION 2
  //               if (error && error.status === 401) {
  //                   console.log("ERROR 401 UNAUTHORIZED")
  //               }
  //               const err = error.error.message || error.statusText;
  //               return throwError(error);                    
  //          })
  //       );
  // } 
}
