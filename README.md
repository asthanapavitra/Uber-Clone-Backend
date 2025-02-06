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
