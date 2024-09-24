import { Component, OnInit } from '@angular/core';
import { SuitService } from './service/suits.service';
import { ProductDTO } from 'src/app/DTO/product.dto';
import { AuthService } from 'src/app/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SuitModalComponent } from './modal/suit-modal/suit-modal.component';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal/edit-product-modal.component';

@Component({
  selector: 'app-suits',
  templateUrl: './suits.component.html',
  styleUrls: ['./suits.component.css'],
})
export class SuitsComponent implements OnInit {
  user = this.authService.getUser();
  suitProducts: ProductDTO[] = [];
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private suitService: SuitService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.suitService.getSuits().subscribe((data) => {
      this.suitProducts = data;
      console.log(this.suitProducts);
    });
  }

  viewSuit(product: ProductDTO){
    this.dialog.open(SuitModalComponent, {
      data: {product: product}
    });
  }

  editRecord(product: ProductDTO){
    this.dialog.open(EditProductModalComponent, {
      data: {product: product}
    });
  }
}
