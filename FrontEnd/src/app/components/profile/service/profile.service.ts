import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EditUserDTO } from 'src/app/DTO/editUser.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://localhost:7000/Account';

  constructor(private http: HttpClient) {}

  editUserInformations(user: EditUserDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updateUserInformation`, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error updating user information:', error);
          return throwError(() => error);
        })
      );
  }

  uploadProfilePicture(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}/uploadProfilePicture/${userId}`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error uploading profile picture:', error);
          return throwError(() => error);
        })
      );
  }

  getProfilePictureUrl(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profilePictureUrl/${userId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching profile picture URL:', error);
          return throwError(() => error);
        })
      );
  }
}
