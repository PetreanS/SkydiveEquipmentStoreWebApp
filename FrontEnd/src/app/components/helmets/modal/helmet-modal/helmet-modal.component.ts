import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDTO } from 'src/app/DTO/product.dto';
import { CartService } from 'src/app/components/cart/cart/service/cart.service';

@Component({
  selector: 'app-helmet-modal',
  templateUrl: './helmet-modal.component.html',
  styleUrls: ['./helmet-modal.component.css']
})
export class HelmetModalComponent {
  product: ProductDTO;
  selectedColor: string | null = null;
  selectedSize: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<HelmetModalComponent>,
    private cartService: CartService
  ) {
    this.product = data.product;
  }

  
  selectSize(size: string) {
    this.selectedSize = this.selectedSize === size ? null : size;
  }

  selectColor(color: string){
    this.selectedColor = this.selectedColor === color ? null: color;
  }

  cancel() {
    this.selectedSize = null;
    this.selectedColor = null;
    this.dialogRef.close();
  }

  addToCart() {
    if (this.selectedSize) {
      const productWithColorAndSize: ProductDTO = {
        ...this.product,
        color: this.selectedColor,
        size: this.selectedSize,
      };
      this.cartService.addToCart(productWithColorAndSize);
      this.dialogRef.close();
    } else {
      console.error('Please select a size!');
    }
  }
}
