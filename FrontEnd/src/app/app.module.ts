import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JerseyComponent } from './components/jersey/jersey.component';
import { SuitsComponent } from './components/suits/suits.component';
import { HelmetsComponent } from './components/helmets/helmets.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './components/profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddSuitModalComponent } from './components/modals/add-product-modal/add-suit-modal/add-suit-modal.component';
import { AddJerseyModalComponent } from './components/modals/add-product-modal/add-jersey-modal/add-jersey-modal.component';
import { AddHelmetModalComponent } from './components/modals/add-product-modal/add-helmet-modal/add-helmet-modal.component';
import { ProductsComponent } from './components/products/products.component';
import { SuitModalComponent } from './components/suits/modal/suit-modal/suit-modal.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { JerseyModalComponent } from './components/jersey/modal/jersey-modal/jersey-modal.component';
import { HelmetModalComponent } from './components/helmets/modal/helmet-modal/helmet-modal.component';
import { FinishOrderComponent } from './components/finish-order/finish-order/finish-order.component';
import { ContactModalComponent } from './components/contact/modal/contact-modal/contact-modal.component';
import { EditProductModalComponent } from './components/modals/edit-product-modal/edit-product-modal/edit-product-modal.component';
import { EditInformationsModalComponent } from './components/profile/modals/edit-informations-modal/edit-informations-modal.component';
import { UserOrderHistoryModalComponent } from './components/profile/modals/user-order-history-modal/user-order-history-modal.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JerseyComponent,
    SuitsComponent,
    HelmetsComponent,
    ContactComponent,
    FooterComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductsComponent,
    AddSuitModalComponent,
    AddJerseyModalComponent,
    AddHelmetModalComponent,
    SuitModalComponent,
    CartComponent,
    JerseyModalComponent,
    HelmetModalComponent,
    FinishOrderComponent,
    ContactModalComponent,
    EditProductModalComponent,
    EditInformationsModalComponent,
    UserOrderHistoryModalComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
