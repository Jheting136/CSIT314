// src/app/models/user.model.ts

export type UserRole = 'admin' | 'seller' | 'agent';

export class User {
  constructor(
    public email: string,
    public password: string,
    public role: UserRole,
    public name: string,
    public phoneNumber?: string, // Optional fields
    public address?: string      // Optional fields
  ) {}

  // Method to check if the user has a specific role
  hasRole(role: UserRole): boolean {
    return this.role === role;
  }
}
