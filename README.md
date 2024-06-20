# Authentication Service

This repository contains the code implementation for an authentication service in JavaScript.

## Overview

The authentication service is designed to handle user authentication and authorization for a web application. It provides secure user registration, login, and logout functionalities.

## Features

- User registration: Allows users to create an account by providing their email and password.
- User login: Allows registered users to log in using their credentials.
- User logout: Allows logged-in users to log out of their account.
- Password encryption: Ensures that user passwords are securely stored using encryption algorithms.
- Session management: Manages user sessions to maintain authentication state.

## Installation

1. Clone the repository: `git clone https://github.com/Igomigo/Authentication_service.git`
2. Navigate to the project directory: `cd authentication-service`
3. Install dependencies: `npm install`

## Usage

1. Start the authentication service: `npm start` or `npm run devstart`
2. Access the service endpoints using a web browser or API client.

## API Endpoints

- `POST auth/register`: Creates a new user account.
- `POST auth/login`: Logs in a user and returns an authentication token.
- `POST auth/logout`: Logs out the currently logged-in user.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
