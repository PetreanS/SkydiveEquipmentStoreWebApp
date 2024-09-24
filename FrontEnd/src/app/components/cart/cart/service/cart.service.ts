import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDTO } from 'src/app/DTO/product.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<ProductDTO[]>;
  public cart$: Observable<ProductDTO[]>;

  constructor() {
    const storedCart = localStorage.getItem('cart');
    this.cartSubject = new BehaviorSubject<ProductDTO[]>(storedCart ? JSON.parse(storedCart) : []);
    this.cart$ = this.cartSubject.asObservable();
  }

  getCart(): Observable<ProductDTO[]> {
    return this.cart$;
  }

  addToCart(product: ProductDTO) {
    const currentCart = this.cartSubject.value;
    const updatedCart = [...currentCart, product];
    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  }
  
  removeFromCart(product: ProductDTO) {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item !== product);
    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  }

  clearCart() {
    this.cartSubject.next([]);
    localStorage.removeItem('cart'); 
  }
}
