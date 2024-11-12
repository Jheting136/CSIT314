import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'; // Import the HttpClientModule
import { LoginController } from '../../controllers/login.controller';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],  // Add HttpClientModule here
  providers: [LoginController] // Ensure LoginController is provided if necessary
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(private loginController: LoginController) {}

  ngOnInit(): void {
      console.log('LoginComponent initialized');
    }

  ngOnChanges(changes: SimpleChanges): void {
      console.log('ngOnChanges called', changes);
    }

  onLogin() {
    this.loginController.getUser(this.email, this.password)
      .then((response) => {
        // Handle successful login response
        console.log('Login successful', response);
      })
      .catch((error) => {
        // Handle error response
        this.loginError = 'Invalid email or password';
        console.error('Login failed', error);
      });
  }
}
