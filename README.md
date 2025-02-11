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

# Captain Registration Endpoint Documentation

## Endpoint: `/captains/register`

### Method: POST

### Description:

This endpoint is used to register a new captain. It requires the captain's personal details and vehicle information.

### Required Data:

- `fullName.firstName` (string): The first name of the captain. Must be at least 3 characters long.
- `fullName.lastName` (string): The last name of the captain (optional).
- `email` (string): The email address of the captain. Must be a valid email format.
- `password` (string): The password for the captain account. Must be at least 6 characters long.
- `vehicle.color` (string): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string): The license plate number. Must be at least 3 characters long.
- `vehicle.capacity` (number): The passenger capacity including driver. Must be at least 2.
- `vehicle.vehicleType` (string): The type of vehicle. Must be one of: "car", "motorcycle", "auto".

### Example Request Body:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses:

#### Success (201):

- **Description**: Captain successfully registered.
- **Example Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60c72b2f9b1e8b001c8e4d5a",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
        "msg": "Color must be atleast 3 characters long",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "Plate number must be atleast 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "Capacity must be atleast 2 including driver",
        "param": "vehicle.capacity",
        "location": "body"
      },
      {
        "msg": "Invalid vehicle Type",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

#### Email Already Exists (401):

- **Description**: Captain with this email already exists.
- **Example Response**:
  ```json
  {
    "error": "Email or password incorrect"
  }
  ```

#### Missing Fields (401):

- **Description**: Required fields are missing.
- **Example Response**:
  ```json
  {
    "error": "All the fields are required"
  }
  ```

# Captain Login Endpoint Documentation

## Endpoint: `/captains/login`

### Method: POST

### Description:

This endpoint is used to log in an existing captain. It requires the captain's email and password.

### Required Data:

- `email` (string): The email address of the captain. Must be a valid email format.
- `password` (string): The password for the captain account. Must be at least 6 characters long.

### Example Request Body:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success (201):

- **Description**: Captain successfully logged in.
- **Example Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60c72b2f9b1e8b001c8e4d5a",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
    "error": "Email or password incorrect"
  }
  ```

# Captain Profile Endpoint Documentation

## Endpoint: `/captains/getProfile`

### Method: GET

### Description:

This endpoint is used to get the profile of the logged-in captain. It requires authentication via token.

### Authentication:

Requires a valid JWT token in either:

- Cookie named "token"
- Authorization header as "Bearer <token>"

### Responses:

#### Success (200):

- **Description**: Captain profile retrieved successfully.
- **Example Response**:
  ```json
  {
    "captain": {
      "_id": "60c72b2f9b1e8b001c8e4d5a",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

#### Unauthorized (401):

- **Description**: Captain is not authenticated.
- **Example Response**:
  ```json
  {
    "error": "Please login to access this resource"
  }
  ```

# Captain Logout Endpoint Documentation

## Endpoint: `/captains/logout`

### Method: GET

### Description:

This endpoint is used to log out the authenticated captain. It requires authentication and blacklists the current token.

### Authentication:

Requires a valid JWT token in either:

- Cookie named "token"
- Authorization header as "Bearer <token>"

### Responses:

#### Success (200):

- **Description**: Captain successfully logged out.
- **Example Response**:
  ```json
  {
    "message": "Captain logout successfully"
  }
  ```

#### Unauthorized (401):

- **Description**: Captain is not authenticated.
- **Example Response**:
  ```json
  {
    "error": "Please login to access this resource"
  }
  ```
