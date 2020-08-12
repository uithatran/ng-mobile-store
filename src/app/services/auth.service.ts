import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUsers() {
    let url = `${this.baseUrl}/admin/users`;
    return this.http.get(url);
  }

  loginPost(data): Observable<any> {
    let url = `${this.baseUrl}/auth/login`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  public logout():void {
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
