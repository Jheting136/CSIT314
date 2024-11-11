// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { LoginController } from '../../controllers/login.controller';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loginError = '';

  constructor(private loginController: LoginController) {}

  // Modify the onLogin method to handle async user authentication
  async onLogin() {
    const user = new User(this.email, this.password, 'agent', ''); // Default role

    try {
      const authenticatedUser = await this.loginController.authenticateUser(user);
      if (authenticatedUser) {
        this.loginError = ''; // Clear error message if login is successful
        console.log('Login successful for:', authenticatedUser.name);
        // Optionally, store user data in session/localStorage and navigate to the dashboard
      } else {
        this.loginError = 'Invalid email or password';
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.loginError = 'An error occurred during login';
    }
  }
}
