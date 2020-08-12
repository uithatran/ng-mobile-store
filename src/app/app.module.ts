import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { HTTP_INTERCEPTORS ,HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/customer/product-list/product-list.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProductDetailComponent } from './components/customer/product-detail/product-detail.component';
import { CartComponent } from './components/customer/cart/cart.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductAddComponent } from './components/admin/product-add/product-add.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductListComponent,
    AuthComponent,
    ProductDetailComponent,
    LoginComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
