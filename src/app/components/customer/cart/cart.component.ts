import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartItems = { items: [], quanlity: 0 };
  public grandTotal: number = 0;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.getGrandTotal();
  }

  onRemoveItem(id) {
    this.cartService.removeItem(id);
    this.getGrandTotal();
  }

  onRemoveAll() {
    this.cartService.removeItems();
    this.cartItems = this.cartService.getItems();
    this.getGrandTotal();
  }

  getGrandTotal() {
    this.grandTotal = this.cartItems.items.reduce((total, item) => total - 0 + (item.quanlityItem * item.unitPrice), 0);
  }

}
