# User Authentication - Node.js

Project Overview:
This Node.js Express application provides a simple user authentication system using MongoDB as the database. It includes routes for user signup, login, and retrieving user details.

Routes:
Signup Route:

Endpoint: /signup
Description: Allows users to create a new account by providing necessary details such as username, email, and password.
Method: POST
Parameters:
username: User's desired username.
email: User's email address.
password: User's chosen password.
Login Route:

Endpoint: /login
Description: Allows registered users to log in by providing their credentials.
Method: POST
Parameters:
email: User's email address.
password: User's password.
Response: Upon successful login, returns a JSON web token (JWT) for authentication in subsequent requests.
Get User Details Route:

Endpoint: /userdetails
Description: Retrieves details of the currently logged-in user.
Method: GET
Authentication: Requires a valid JWT token obtained after login.
Response: Returns user details such as username and email.
Dependencies:
Express: Web application framework for Node.js.
MongoDB: Document database for storing user information.
bcrypt: Hashing library for securely storing passwords.
jsonwebtoken: Library for generating and verifying JSON web tokens for user authentication.
Setup:
Clone the repository.
Install dependencies using npm install.
Set up MongoDB and configure connection settings in config.js.
Run the application using npm start.
Usage:
Use /signup to create a new user account.
Use /login to authenticate and obtain a JWT token.
Use the token to access protected routes like /userdetails.
