import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDTO } from 'src/app/DTO/product.dto';
import { JerseyService } from './service/jersey.service';
import { AuthService } from 'src/app/auth.service';
import { JerseyModalComponent } from './modal/jersey-modal/jersey-modal.component';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal/edit-product-modal.component';

@Component({
  selector: 'app-jersey',
  templateUrl: './jersey.component.html',
  styleUrls: ['./jersey.component.css']
})
export class JerseyComponent implements OnInit{
  user = this.authService.getUser();
  jerseyProducts: ProductDTO[] = [];
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private jerseyService: JerseyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(){
    this.user = this.authService.getUser();
    this.jerseyService.getJerseys().subscribe((data) => {
      this.jerseyProducts = data;
      console.log(this.jerseyProducts)
    })
  }

  viewJersey(product: ProductDTO){
    this.dialog.open(JerseyModalComponent, {
      data: {product: product}
    })
  }

  editRecord(product: ProductDTO){
    this.dialog.open(EditProductModalComponent, {
      data: {product: product}
    });
  }

}
