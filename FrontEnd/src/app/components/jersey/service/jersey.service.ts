import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from 'src/app/DTO/product.dto';

@Injectable({
  providedIn: 'root',
})

export class JerseyService {
    private apiUrl = 'https://localhost:7000/Product'; 

    constructor(private http: HttpClient){}

    getJerseys(): Observable<ProductDTO[]>{
        return this.http.get<ProductDTO[]>(`${this.apiUrl}/getJerseyProducts`);
    }

}
