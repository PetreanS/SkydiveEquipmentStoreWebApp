import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/components/profile/service/product.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css'],
})
export class EditProductModalComponent {
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;
  product: any;
  selectedColors: string[] = [];
  sizeOptions = ['XS', 'S', 'M', 'L', 'XL'].map((size) => ({ value: size }));
  colorOptions = ['red', 'blue', 'yellow', 'black', 'white', 'green'].map(
    (color) => ({ value: color })
  );

  constructor(
    private dialogRef: MatDialogRef<EditProductModalComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { product: any }
  ) {
    this.product = { ...this.data.product };
    this.initializeSelectedColors();
  }

  initializeSelectedColors() {
    if (this.product && this.product.colors) {
      this.selectedColors = this.colorOptions
        .filter((color) =>
          this.product.colors.find((c: any) => c.value === color.value)
        )
        .map((color) => color.value);
    }
  }

  toggleColor(color: string) {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
  }

  isColorSelected(color: string) {
    return this.selectedColors.includes(color);
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleSize(size: string) {
    const index = this.product.sizes.findIndex(
      (s: { value: string }) => s.value === size
    );
    if (index > -1) {
      this.product.sizes.splice(index, 1);
    } else {
      this.product.sizes.push({ id: null, value: size });
    }
  }

  isSizeSelected(size: string) {
    return this.product.sizes.some((s: { value: string }) => s.value === size);
  }

  cancel() {
    this.dialogRef.close();
  }

  saveProduct() {
    console.log('Saving product:', this.product);
    this.product.colors = this.selectedColors.map((color) => ({
      value: color,
    }));
    var productToBeEdited = this.product;
    this.productService.editProduct(productToBeEdited).subscribe({
      next: (response) => {
        console.log('Edit product response:', response);
        this.dialogRef.close();
        window.location.reload();
      },
      error: (error) => {
        console.error('Error editing product:', error);
      },
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (error) => {
        if (error.status === 200) {
          console.log('Product deleted successfully');
          this.dialogRef.close();
          window.location.reload();
        } else {
          console.error('Error deleting product:', error);
        }
      },
    });
  }
}
