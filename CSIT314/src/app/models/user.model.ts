// src/app/models/user.model.ts
import bcrypt from 'bcryptjs';  // Import bcrypt for password encryption
import mysql from 'mysql2/promise';  // Use mysql2/promise for promise-based API

// Async function to create a connection
async function createDbConnection(): Promise<mysql.Connection> {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'acc_db'
  });
}

export class User {
  constructor(
    public email: string,
    public password: string,
    public role: string,
    public name: string,
    public hp?: string,
    public address?: string
  ) {}

  // Method to get a user from the database
  async getUser(user: User): Promise<User | null> {
    let connection: mysql.Connection | null = null;
    try {
      // Create and open the connection
      connection = await createDbConnection();

      // Execute query and fetch results
      const [results] = await connection.execute(
        'SELECT * FROM user_acc WHERE email = ?',
        [user.email]
      );

      // If the user is found, validate the password
      if (results.length > 0) {
        const dbUser = results[0];

        // Compare the password from the database
        const isPasswordValid = await bcrypt.compare(user.password, dbUser.password);
        if (isPasswordValid) {
          // Return the user if valid
          const foundUser = new User(
            dbUser.email,
            dbUser.password,
            dbUser.role,
            dbUser.name,
            dbUser.phone_number,
            dbUser.address
          );
          return foundUser;
        } else {
          return null;  // Invalid password
        }
      } else {
        return null;  // User not found
      }
    } catch (err) {
      console.error('Error:', err);
      return null;  // Return null if an error occurs
    } finally {
      // Ensure to close the connection
      if (connection) {
        await connection.end();
      }
    }
  }
}
