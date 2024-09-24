import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise = loadStripe(
    'pk_live_51PkX5kRsDbobUlQPfuZlW0mEHYkZ3Ekhu4wiOj0SY1mqTaOmvdaIcMCnW02TSYT1S3vNarlItiQjebwK2Uxn9ZHO00TDlrWg2q'
  );

  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}
