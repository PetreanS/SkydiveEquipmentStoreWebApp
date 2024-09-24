import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/components/profile/service/product.service';

@Component({
  selector: 'app-add-suit-modal',
  templateUrl: './add-suit-modal.component.html',
  styleUrls: ['./add-suit-modal.component.css'],
})
export class AddSuitModalComponent {
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSizes: string[] = [];
  productName: string = '';
  productPrice: number | null = null;
  productDescription: string = '';
  productCategory: string = 'suit';

  constructor(
    private dialogRef: MatDialogRef<AddSuitModalComponent>,
    private productService: ProductService
  ) {}

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

  openFileInput() {
    const fileInput = document.getElementById('suitFileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  toggleSize(size: string) {
    const index = this.selectedSizes.indexOf(size);
    if (index > -1) {
      this.selectedSizes.splice(index, 1);
    } else {
      this.selectedSizes.push(size);
    }
  }

  cancel() {
    this.selectedFile = null;
    this.selectedFileUrl = null;
    this.selectedSizes = [];
    this.productName = '';
    this.productPrice = null;
    this.productDescription = '';
    this.dialogRef.close();
  }

  saveProduct() {
    if (
      !this.selectedFile ||
      !this.productName ||
      !this.productPrice ||
      !this.productDescription ||
      this.selectedSizes.length === 0
    ) {
      console.error('Missing required data.');
      return;
    }
    const sizesData = this.selectedSizes.map(size => ({ productId: 0, value: size }));
  
    const productData = {
      name: this.productName,
      price: this.productPrice.toString(),
      description: this.productDescription,
      colors: null, 
      sizes: sizesData,
      category: this.productCategory,
    };
  
    this.productService.createProduct(productData).subscribe({
      next: (res) => {
        console.log('Product created successfully with ID:', res.productId);
        this.productService.assignPhotoToProduct(res.productId, this.selectedFile!).subscribe({
          next: (response) => {
            if (response.status === 200) {
              this.dialogRef.close();
            } else {
              console.error('Unexpected response status:', response.status);
            }
          },
          error: (err) => {
            console.error('Error assigning photo to product:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error creating product:', err);
      },
    });
  }
}
