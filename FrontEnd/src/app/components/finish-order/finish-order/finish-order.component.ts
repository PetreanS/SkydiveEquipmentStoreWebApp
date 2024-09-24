import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/app/DTO/product.dto';
import { FinishOrderService } from './service/finish-order.service';
import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import { StripeService } from '../../stripe-service/stripe.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.css'],
})
export class FinishOrderComponent implements OnInit {
  cart: ProductDTO[] = [];
  addressForm!: FormGroup;
  paymentForm!: FormGroup;
  stripe!: Stripe | null;
  elements!: any;
  card!: StripeCardElement;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private finishOrderService: FinishOrderService,
    private stripeService: StripeService,
    private dialog: MatDialog
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { cart: ProductDTO[] };
    if (state) {
      this.cart = state.cart;
    }

    this.addressForm = this.formBuilder.group({
      fullName: [''],
      phoneNumber: [''],
      address: [''],
      city: [''],
      zipCode: [''],
      countryRegion: [''],
    });

    this.paymentForm = this.formBuilder.group({
      cardholderName: [''],
      billingAddress: [''],
    });

    this.stripeService.getStripe().then((stripe) => {
      this.stripe = stripe;
      if (this.stripe) {
        this.elements = this.stripe.elements();
        this.card = this.elements.create('card');
        this.card.mount('#card-element');
      }
    });
  }

  ngOnInit(): void {}

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const product of this.cart) {
      totalPrice += product.price;
    }
    return totalPrice;
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submitted = true;

    const fixedAmount = 1 * 100;

    this.finishOrderService.createPaymentIntent(fixedAmount).subscribe({
      next: async (paymentIntent: any) => {
        if (this.stripe && this.card) {
          const { error, paymentIntent: confirmedPaymentIntent } =
            await this.stripe.confirmCardPayment(paymentIntent.client_secret, {
              payment_method: {
                card: this.card,
                billing_details: {
                  name: this.paymentForm.value.cardholderName,
                  address: {
                    line1: this.paymentForm.value.billingAddress,
                  },
                },
              },
            });

          if (error) {
            console.error('Payment error:', error);
          } else {
            if (confirmedPaymentIntent.status === 'succeeded') {
              console.log('Payment successful:', confirmedPaymentIntent);
              this.dialog.open(ConfirmationComponent);
            }
          }
        }
      },
      error: (error) => {
        console.error('Error creating payment intent:', error);
      },
    });
  }
}
