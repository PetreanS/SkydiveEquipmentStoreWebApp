import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/components/profile/service/product.service';

@Component({
  selector: 'app-add-helmet-modal',
  templateUrl: './add-helmet-modal.component.html',
  styleUrls: ['./add-helmet-modal.component.css']
})
export class AddHelmetModalComponent {
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;
  colors: string[] = ['red', 'blue', 'yellow', 'black', 'white', 'green'];
  selectedColors: string[] = [];
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSizes: string[] = [];
  productName: string = '';
  productPrice: number | null = null;
  productDescription: string = '';
  productCategory: string = 'helmet';

  constructor(
    private dialogRef: MatDialogRef<AddHelmetModalComponent>,
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

  toggleColor(color: string) {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
    console.log(this.selectedColors);
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
    this.selectedColors = [];
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
      this.selectedColors.length === 0 ||
      this.selectedSizes.length === 0
    ) {
      console.error('Missing required data.');
      return;
    }
    const colorsData = this.selectedColors.map(color => ({ productId: 0, value: color }));
    const sizesData = this.selectedSizes.map(size => ({ productId: 0, value: size }));
  
    const productData = {
      name: this.productName,
      price: this.productPrice.toString(),
      description: this.productDescription,
      colors: colorsData,
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
