import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { AuthService } from 'src/app/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-order-history-modal',
  templateUrl: './user-order-history-modal.component.html',
  styleUrls: ['./user-order-history-modal.component.css'],
})
export class UserOrderHistoryModalComponent implements OnInit {
  orders: any[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<UserOrderHistoryModalComponent>
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    this.productService.getUserPurchaseHistory(currentUser.id).subscribe({
      next: (data: any[]) => {
        this.orders = data;
        console.log('User Order History:', this.orders);
      },
      error: (error) => {
        console.error('Error fetching user order history:', error);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
