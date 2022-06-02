import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface usernameAvailableResponse {
  available: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http
    //generic is deconstructing the response using the interface
      .post<{available: usernameAvailableResponse}>('https://api.angular-email.com/auth/username', {
        username: username
      })
  }
}
