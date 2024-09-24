import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/app/DTO/product.dto';
import { Observable } from 'rxjs';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart$: Observable<ProductDTO[]> | undefined;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart();
    console.log(this.cart$)
  }

  removeFromCart(product: ProductDTO) {
    this.cartService.removeFromCart(product);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart$ = this.cartService.getCart();
  }

  finishOrder() {
    if (this.cart$) {
      this.cart$.subscribe(cart => {
        this.router.navigate(['/finish-order'], { state: { cart } });
      });
    }
  } 
}
