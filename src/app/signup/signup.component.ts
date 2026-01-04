import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, SignupPayload } from '../services/auth.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['user', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.signupForm.valid) {
      this.loading = true;

      const payload: SignupPayload = {
        username: this.signupForm.get('username')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
        role: [this.signupForm.get('role')?.value]
      };

      console.log('Submitting with UUID:', payload);

      this.authService.signup(payload).subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Signup successful:', response);
          alert('Account created successfully!');
          this.signupForm.reset();
          this.submitted = false;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error?.error?.message || 'Signup failed. Please try again.';
          console.error('Signup error:', error);
        }
      });
    }
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get role() {
    return this.signupForm.get('role');
  }
}
