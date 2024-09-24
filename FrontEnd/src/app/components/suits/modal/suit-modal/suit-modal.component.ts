import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColorDto, ProductDTO } from 'src/app/DTO/product.dto';
import { CartService } from 'src/app/components/cart/cart/service/cart.service';

@Component({
  selector: 'app-suit-modal',
  templateUrl: './suit-modal.component.html',
  styleUrls: ['./suit-modal.component.css'],
})
export class SuitModalComponent {
  product: ProductDTO;
  selectedSize: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SuitModalComponent>,
    private cartService: CartService
  ) {
    this.product = data.product;
  }

  selectSize(size: string) {
    this.selectedSize = this.selectedSize === size ? null : size;
  }

  cancel() {
    this.selectedSize = null;
    this.dialogRef.close();
  }

  addToCart() {
    if (this.selectedSize) {
      const productWithColorAndSize: ProductDTO = {
        ...this.product,
        size: this.selectedSize,
      };
      this.cartService.addToCart(productWithColorAndSize);
      this.dialogRef.close();
    } else {
      console.error('Please select both color and size!');
    }
  }
}
