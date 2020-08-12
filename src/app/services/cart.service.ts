import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = {
    items: [],
    quanlity: 0
  }

  constructor() { }

  addToCart(item) {
    for (let i = 0; i < this.cartItems.quanlity; i++) {
      if (this.cartItems.items[i]._id === item._id) {
        this.cartItems.items[i].quanlityItem++;
        return;
      }
    }
    item['quanlityItem'] = 1;
    this.cartItems.items.push(item);
    this.cartItems.quanlity ++;
  }

  getItems() {
    return this.cartItems;
  }

  removeItem(id) {
    let index = this.cartItems.items.findIndex(item => item._id === id);
    this.cartItems.items.splice(index, 1);
    this.cartItems.quanlity --;
  }

  removeItems() {
    this.cartItems = {
      items: [],
      quanlity: 0
    }
  }
}
