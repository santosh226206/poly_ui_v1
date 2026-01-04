import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  role: any;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface SigninPayload {
  username: string;
  password: string;
}

export interface SigninResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  signup(payload: SignupPayload): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`/users/saveUser`, payload);
  }

  signin(payload: SigninPayload): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(`/auth/login`, payload);
  }

  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
