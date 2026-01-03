import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SignupPayload {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/users'; // Update with your API URL

  constructor(private http: HttpClient) { }

  signup(payload: SignupPayload): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/saveUser`, payload);
  }
}