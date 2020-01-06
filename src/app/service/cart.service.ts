import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiConfig } from './environments/api.config';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private apiService: ApiService
  ) { }

  items = [];

  addToCart(product){
    this.items.push(product);
  }

  getItems(){
    return this.items;
  }

  clearCart(){
    this.items=[];
    return this.items;
  }

  getShippingPrices() {
    return this.apiService.get();
  }
}