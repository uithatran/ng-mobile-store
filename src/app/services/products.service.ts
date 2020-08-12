import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = 'http://localhost:3000/';
  baseUrl: string = 'http://localhost:3000/api';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  public listproducts: any = [];

  constructor(
    private httpClient: HttpClient,
  ) {
    this.getProducts();
  }

  // Get all Users
  getProducts() {
    let url = `${this.baseUrl}/products`;
    return this.httpClient.get(url);
  }

  getProduct(productId) {
    let url = `${this.baseUrl}/products/` + productId;
    return this.httpClient.get(url);
  }

  deleteProduct(productId) {
    let url = 'http://localhost:3000/api/admin/product/' + productId;
    return this.httpClient.delete(url);
  }

  postProduct(productInfo): Observable<any> {
    let url = 'http://localhost:3000/api/admin/product-add';
    return this.httpClient.post(url, productInfo);
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
