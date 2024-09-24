import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HelmetService } from './service/helmet.service';
import { ProductDTO } from 'src/app/DTO/product.dto';
import { MatDialog } from '@angular/material/dialog';
import { HelmetModalComponent } from './modal/helmet-modal/helmet-modal.component';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal/edit-product-modal.component';

@Component({
  selector: 'app-helmets',
  templateUrl: './helmets.component.html',
  styleUrls: ['./helmets.component.css']
})
export class HelmetsComponent implements OnInit{
  user = this.authService.getUser();
  helmetProducts: ProductDTO[] = [];
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private helmetService: HelmetService,
    private dialog: MatDialog
  ) {}

  ngOnInit(){
    this.user = this.authService.getUser();
    this.helmetService.getHelmets().subscribe((data) => {
      this.helmetProducts = data;
    })
  }

  viewHelmet(product: ProductDTO){
    this.dialog.open(HelmetModalComponent, {
      data: {product: product}
    })
  }

  editRecord(product: ProductDTO){
    console.log(product)
    this.dialog.open(EditProductModalComponent, {
      data: {product: product}
    });
  }
}
