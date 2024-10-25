// src/app/controllers/login.controller.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginController {
  constructor(private authService: AuthService) {}

  // Method to authenticate the user
  authenticateUser(user: User): User | null {
    const authenticatedUser = this.authService.login(user);

    if (authenticatedUser) {
      // Here, you might want to implement logic based on user role
      console.log('Login successful for:', authenticatedUser.name, authenticatedUser.role);
      return authenticatedUser;
    }

    console.log('Login failed for:', user.email);
    return null;
  }
}
