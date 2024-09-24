import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'https://localhost:7000/Account';

  constructor(private http: HttpClient) {}

  addRegistration(user: any): Observable<any> {
    console.log(user)
    return this.http.post(`${this.apiUrl}/createAccount`, user);
  }

  logInAccount(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/logInAccount`, user);
  }
}
