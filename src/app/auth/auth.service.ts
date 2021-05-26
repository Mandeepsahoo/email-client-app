import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  usernameAvailable(username) {
    return this.http.post('https://api.angular-email.com/auth/username', {
      username: username,
    });
  }
}
