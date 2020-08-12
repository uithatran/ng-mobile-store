import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  url: string = this.productService.url;
  quanlityCart: number = 0;

  constructor(
    public productService: ProductsService,
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getQuanlityCart();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.productService.listproducts = data;
        return data;
      },
      (err) => {
        console.log(err);
      }
    )
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
    }, 1000);
  }

}
