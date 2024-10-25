// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Mock database of users
  //TODO implement proper db connection and data retrieval
  private mockUserDatabase: User[] = [
    new User('admin@example.com', 'adminPass', 'admin', 'Admin User'),
    new User('seller@example.com', 'sellerPass', 'seller', 'Seller User'),
    new User('agent@example.com', 'agentPass', 'agent', 'Agent User')
  ];

  login(user: User): User | null {
    const foundUser = this.mockUserDatabase.find(
      (mockUser) => mockUser.email === user.email && mockUser.password === user.password
    );

    return foundUser || null; // Return the user object or null if not found
  }
}
