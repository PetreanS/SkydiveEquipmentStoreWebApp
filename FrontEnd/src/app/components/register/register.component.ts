import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RegisterService } from './register.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showAdminInput = false;
  showPassword = false;
  showAdminPassword = false;
  registerForm: FormGroup;
  registrationMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordCriteriaValidator,
        ],
      ],
      phoneNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      adminPassword: [''],
    });
  }

  passwordCriteriaValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (!password) {
      return null; 
    }

    const criteriaErrors: any = {};

    if (!/[A-Z]/.test(password)) {
      criteriaErrors.missingUppercase = 'at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      criteriaErrors.missingLowercase = 'at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      criteriaErrors.missingNumber = 'at least one number';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      criteriaErrors.missingSpecial = 'at least one special character';
    }
    if (password.length < 8) {
      criteriaErrors.minLength = 'at least 8 characters';
    }

    return Object.keys(criteriaErrors).length ? criteriaErrors : null;
  }

  register() {
    if (this.registerForm.invalid) {
      this.registrationMessage = this.getPasswordErrorMessage();
      return;
    }

    const userData = this.registerForm.value;

    this.registerService.addRegistration(userData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.registrationMessage = 'Account created successfully.';
      },
      error: (error) => {
        console.error('Registration failed:', error);

        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);

          if (error.error instanceof SyntaxError) {
            console.error('Error message:', error.error.message);

            this.registrationMessage = 'Error: Unable to process the response.';
          } else {
            console.error('Error message:', error.error);

            if (error.error === 'AdminPassword is incorrect.') {
              this.registrationMessage = 'Admin password is incorrect.';
            } else {
              this.registrationMessage =
                error.error.message || 'Unknown error occurred.';
            }
            if (error.error === 'User already exists.') {
              this.registrationMessage = 'User already exists.';
            } else {
              this.registrationMessage =
                error.error.message || 'Unknown error occurred.';
            }
          }
        }
      },
    });
  }

  getPasswordErrorMessage(): string {
    const errors = this.registerForm.get('password')?.errors;
    const messages = [];
  
    if (errors?.['missingUppercase']) {
      messages.push(errors['missingUppercase']);
    }
    if (errors?.['missingLowercase']) {
      messages.push(errors['missingLowercase']);
    }
    if (errors?.['missingNumber']) {
      messages.push(errors['missingNumber']);
    }
    if (errors?.['missingSpecial']) {
      messages.push(errors['missingSpecial']);
    }
    if (errors?.['minLength']) {
      messages.push(errors['minLength']);
    }
  
    return `You need to add ${messages.join(', ')}.`;
  }
  

  toggleAdminInput() {
    this.showAdminInput = !this.showAdminInput;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleAdminPasswordVisibility() {
    this.showAdminPassword = !this.showAdminPassword;
  }
}
