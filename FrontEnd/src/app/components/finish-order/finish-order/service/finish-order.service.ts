import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth.service'; 
import { ProductDTO } from 'src/app/DTO/product.dto'; 

@Injectable({
  providedIn: 'root',
})
export class FinishOrderService {
  private apiUrl = 'https://localhost:7000/Order'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  processOrder(
    addressData: any,
    paymentData: any,
    cartData: ProductDTO[], 
    totalPrice: number
  ) {
    const currentUser = this.authService.getUser();

    const orderData = {
      UserDetails: {
        UserId: currentUser.id,
        UserFirstName: currentUser.firstName,
        UserLastName: currentUser.lastName,
      },
      Address: {
        StreetAddress: addressData.address,
        City: addressData.city,
        ZipCode: addressData.zipCode,
        CountryRegion: addressData.countryRegion,
        FullName: addressData.fullName,
        PhoneNumber: addressData.phoneNumber,
      },
      Payment: {
        BillingAddress: paymentData.billingAddress,
        CardNumber: paymentData.cardNumber,
        CardholderName: paymentData.cardholderName,
        CVV: paymentData.cvv,
        ExpiryDate: paymentData.expiryDate,
      },
      Cart: cartData.map((item) => ({
        Category: item.category,
        Description: item.description,
        Id: item.id,
        ImageUrl: item.imageUrl,
        Name: item.name,
        Price: item.price,
        Size: item.size,
        Colors: item.colors?.map((color) => ({
          Id: color.id,
          Value: color.value,
        })) || [],
        Sizes: item.sizes.map((size) => ({
          Id: size.id,
          Value: size.value,
        })),
      })),
      TotalPrice: totalPrice,
    };

    return this.http.post<any>(`${this.apiUrl}/processOrder`, orderData);
  }

  createPaymentIntent(amount: number) {
    return this.http.post<any>(`${this.apiUrl}/createPaymentIntent`, { amount });
  }
}
