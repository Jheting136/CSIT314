// src/app/controllers/login.controller.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginController {

  // Method to authenticate a user by calling the getUser method from the User model
  authenticateUser(user: User): Promise<User | null> {
    // Call the getUser method, passing the user object (email, password)
    return user.getUser(user); // This now returns a Promise
  }
}
