import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ContactService {
    private apiUrl = 'https://localhost:7000/Contact';

    constructor(private http: HttpClient) {}

    processContactRequest(contact: Contact): Observable<HttpResponse<string>> {
      return this.http.post(`${this.apiUrl}/processContactRequest`, contact, { observe: 'response', responseType: 'text' });
    }
}
