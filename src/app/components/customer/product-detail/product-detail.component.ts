import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public products: any = [];
  public param: any;
  public product: any;
  public url: string = this.productService.url;
  quanlityCart: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService
  ) {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');
      this.productService.getProduct(productId).subscribe(data => {
        this.product = data;
      })
    })
  }

  ngOnInit(): void {

  }

  onDelete(productId) {
    this.productService.deleteProduct(productId).subscribe((data) => {
      this.router.navigateByUrl('./products');
    });
  }

  onOrder(product) {
    this.cartService.addToCart(product);
    this.getQuanlityCart();
    this.onNotifyBuy();
  }
  getQuanlityCart() {
    this.quanlityCart = this.cartService.getItems().quanlity - 0;
  }

  onNotifyBuy() {
    var x = document.getElementById("notify-buyed");
    x.className = "show";
    setTimeout(() => {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

}
