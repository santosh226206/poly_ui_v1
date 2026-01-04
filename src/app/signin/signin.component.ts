import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, SigninPayload } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
    ,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.valid) {
      this.loading = true;

      const payload: SigninPayload = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.signin(payload).subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Signin successful:', response);
          if (response?.token) {
            this.authService.storeToken(response.token);
            this.loginForm.reset();
            this.submitted = false;
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'No token received from server.';
          }
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error?.error?.message || 'Signin failed. Please try again.';
          console.error('Signin error:', error);
        }
      });
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
