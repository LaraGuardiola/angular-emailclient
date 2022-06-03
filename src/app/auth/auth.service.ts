import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usernameAvailableResponse } from './interfaces/username-available';
import { SignupCredentials } from './interfaces/signup-credentials';
import { SignupResponse } from './interfaces/signup-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'https://api.angular-email.com/auth/'

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http
    //generic is deconstructing the response using the interface
      .post<{available: usernameAvailableResponse}>(`${this.baseURL}username`, {
        username: username
      })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      `${this.baseURL}signup`, 
      credentials
    )
  }
}
