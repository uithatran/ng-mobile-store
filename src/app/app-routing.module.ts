import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/customer/product-list/product-list.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProductAddComponent } from './components/admin/product-add/product-add.component';

import { ProductDetailComponent } from './components/customer/product-detail/product-detail.component';
import { CartComponent } from './components/customer/cart/cart.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  // { path: '', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/cart', component: CartComponent },
  { path: 'products/:productId', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/product/create', component: ProductAddComponent, canActivate: [AuthGuardGuard], },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

