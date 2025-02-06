# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:

This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Required Data:

- `fullName.firstName` (string): The first name of the user. Must be at least 3 characters long.
- `fullName.lastName` (string): The last name of the user. Must be at least 3 characters long.
- `email` (string): The email address of the user. Must be a valid email format.
- `password` (string): The password for the user account. Must be at least 6 characters long.

### Example Request Body:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success (201):

- **Description**: User successfully registered.
- **Example Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60c72b2f9b1e8b001c8e4d5a",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Error (400):

- **Description**: One or more fields are invalid.
- **Example Response**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Firstname must be atleast 3 characters long",
        "param": "fullName.firstName",
        "location": "body"
      },
      {
        "msg": "Password must be atleast 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Missing Fields (400):

- **Description**: Required fields are missing.
- **Example Response**:
  ```json
  {
    "errors": [
      {
        "msg": "All the fields are required"
      }
    ]
  }
  ```

# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: POST

### Description:

This endpoint is used to log in an existing user. It requires the user's email and password.

### Required Data:

- `email` (string): The email address of the user. Must be a valid email format.
- `password` (string): The password for the user account. Must be at least 6 characters long.

### Example Request Body:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success (201):

- **Description**: User successfully logged in.
- **Example Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60c72b2f9b1e8b001c8e4d5a",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Error (400):

- **Description**: One or more fields are invalid.
- **Example Response**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be atleast 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Incorrect Credentials (401):

- **Description**: The email or password is incorrect.
- **Example Response**:
  ```json
  {
    "message": "Incorrect email or password"
  }
  ```

# User Profile Endpoint Documentation

## Endpoint: `/users/profile`

### Method: GET

### Description:

This endpoint is used to get the profile of the logged-in user. It requires the user to be authenticated.

### Responses:

#### Success (200):

- **Description**: User profile retrieved successfully.
- **Example Response**:
  ```json
  {
    "user": {
      "_id": "60c72b2f9b1e8b001c8e4d5a",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Unauthorized (401):

- **Description**: User is not authenticated.
- **Example Response**:
  ```json
  {
    "message": "Unauthorized Access, please login"
  }
  ```

# User Logout Endpoint Documentation

## Endpoint: `/users/logout`

### Method: GET

### Description:

This endpoint is used to log out the authenticated user. It requires the user to be authenticated.

### Responses:

#### Success (200):

- **Description**: User successfully logged out.
- **Example Response**:
  ```json
  {
    "message": "User logout successfully"
  }
  ```

#### Unauthorized (401):

- **Description**: User is not authenticated.
- **Example Response**:
  ```json
  {
    "message": "Unauthorized Access, please login"
  }
  ```
