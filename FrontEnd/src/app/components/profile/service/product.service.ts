import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
    private apiUrl = 'https://localhost:7000/Product'; 

    private orderApiUrl = 'https://localhost:7000/Order'

  constructor(private http: HttpClient) {}

  getUserPurchaseHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderApiUrl}/getUserOrderHistory/${userId}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createProduct`, productData);
  }

  deleteProduct(productId: number) {
    return this.http.delete<any>(`${this.apiUrl}/deleteProduct?productId=${productId}`);
  }  

  editProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/editProduct`, productData);
  }

  assignPhotoToProduct(productId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/assignPhotoToProduct/${productId}`, formData, {
      observe: 'response' 
    });
  }
  
  
}
