import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = 'http://localhost/CSIT314/backend/user.php'; // Change this to your backend URL

  constructor(private http: HttpClient) {}

  getUser(email: string, password: string): Observable<any> {
    const body = { action: 'getUser', email, password };
    return this.http.post(this.apiUrl, body);
  }

  addUser(user: { email: string; password: string; role: string; name: string; hp?: string; address?: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  modifyUser(user: { email: string; role: string; name: string; hp?: string; address?: string }): Observable<any> {
    return this.http.put(this.apiUrl, user);
  }

  deleteUser(email: string): Observable<any> {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      body: { email },
    };
    return this.http.delete(this.apiUrl, options);
  }
}
