import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginController {

  constructor(private user: User) {}

  // Change the method name to getUser and accept email and password as parameters
  getUser(email: string, password: string): Promise<User | null> {
    // Call the getUser method on the User instance and return the result
    return this.user.getUser(email, password).toPromise();
  }
}
