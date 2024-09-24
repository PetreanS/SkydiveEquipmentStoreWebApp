import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register/register.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword = false;
  loginForm: FormGroup;
  logInMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  logIn() {
    const userData = this.loginForm.value;
  
    this.registerService.logInAccount(userData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.setUser(response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.logInMessage = 'The password you entered is incorrect. Please try again.';
      },
    });
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
