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

  onLogin() {
    const user = new User(this.email, this.password, 'agent', ''); // Default role
    const authenticatedUser = this.loginController.authenticateUser(user);

    if (authenticatedUser) {
      this.loginError = '';
      console.log('Login successful for:', authenticatedUser.name);
      // You can now access authenticatedUser.role and authenticatedUser.name
      // Here you might want to navigate to the respective dashboard
    } else {
      this.loginError = 'Invalid email or password';
    }
  }
}
