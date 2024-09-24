import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { JerseyComponent } from './components/jersey/jersey.component';
import { SuitsComponent } from './components/suits/suits.component';
import { HelmetsComponent } from './components/helmets/helmets.component';
import { ContactComponent } from './components/contact/contact.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { FinishOrderComponent } from './components/finish-order/finish-order/finish-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'suits', component: SuitsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'jersey', component: JerseyComponent },
  { path: 'helmets', component: HelmetsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'finish-order', component: FinishOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
