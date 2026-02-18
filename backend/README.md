# Task Scheduler API Documentation

Base URL: `http://localhost:8000` (default)

## User Routes

### 1. Sign Up
Create a new user account.

- **Endpoint:** `/api/user/signup`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": "user with email: john@example.com added succesfully!"
  }
  ```
- **Error Response (400):**
  ```json
  {
    "error": "User with email: john@example.com already exists."
  }
  ```

### 2. Login
Authenticate an existing user.

- **Endpoint:** `/api/user/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "message": "Welcome back John Doe!"
  }
  ```
- **Error Response (400/404):**
  ```json
  {
    "error": "Wrong Password!"
  }
  ```

### 3. Get User Info
Retrieve details for a specific user.

- **Endpoint:** `/api/user/:id`
- **Method:** `GET`
- **Params:** `id` (UUID of the user)
- **Success Response (200):**
  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "name": "John Doe",
    "email": "john@example.com",
    "project": null
  }
  ```
- **Error Response (404):**
  ```json
  {
    "error": "User with id: ... doesn't exists."
  }
  ```

---

## Project Routes

### 1. Add New Project
Create a new project.

- **Endpoint:** `/api/project/`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "Website Redesign",
    "description": "Overhaul the company website with modern UI.",
    "startDate": "2023-10-27T10:00:00.000Z" 
  }
  ```
  *(Note: `startDate` is optional; defaults to current time if omitted.)*

- **Success Response (201):**
  ```json
  {
    "success": "Project Website Redesign is added succesfully!",
    "projectId": "123e4567-e89b-12d3-a456-426614174000"
  }
  ```
- **Error Response (400):**
  ```json
  {
    "error": "Project with title: Website Redesign already exists."
  }
  ```

### 2. Get All Projects
Retrieve a list of all existing projects.

- **Endpoint:** `/api/project/all`
- **Method:** `GET`
- **Success Response (200):**
  ```json
  [
    {
      "projectId": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Website Redesign",
      "description": "Overhaul the company website with modern UI."
    },
    {
      "projectId": "987fcdeb-51a2-43c1-z987-1234567890ab",
      "title": "Mobile App",
      "description": "Develop iOS and Android application."
    }
  ]
  ```
- **Error Response (404):**
  ```json
  {
    "message": "No Projects exists!"
  }
  ```

### 3. Get Project by ID
Retrieve details for a specific project.

- **Endpoint:** `/api/project/:id`
- **Method:** `GET`
- **Params:** `id` (UUID of the project)
- **Success Response (200):**
  ```json
  [
    {
      "projectId": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Website Redesign",
      "description": "Overhaul the company website with modern UI."
    }
  ]
  ```
- **Error Response (404):**
  ```json
  {
    "message": "Project with id: ... doesn't exists."
  }
  ```

---

## Project Developer Routes (Junction)

### 1. Add Developer to Project
Assign a user to a project.

- **Endpoint:** `/api/project-developers`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "projectId": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": "Developer added to project successfully."
  }
  ```
- **Error Response (400/404):**
  ```json
  {
    "error": "Developer is already assigned to this project." 
    // OR "User or Project not found."
  }
  ```

### 2. Remove Developer from Project
Remove a user from a project.

- **Endpoint:** `/api/project-developers`
- **Method:** `DELETE`
- **Request Body:**
  ```json
  {
    "projectId": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "success": "Developer removed from project successfully."
  }
  ```
- **Error Response (404):**
  ```json
  {
    "error": "Developer assignment not found."
  }
  ```

### 3. Get Project Developers
List all users assigned to a specific project.

- **Endpoint:** `/api/project-developers/project/:projectId`
- **Method:** `GET`
- **Success Response (200):**
  ```json
  [
    {
      "userId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
  ```
- **Error Response (404):**
  ```json
  {
    "error": "Project not found."
  }
  ```

### 4. Get User Projects
List all projects assigned to a specific user.

- **Endpoint:** `/api/project-developers/user/:userId`
- **Method:** `GET`
- **Success Response (200):**
  ```json
  [
    {
      "projectId": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Website Redesign",
      "description": "Overhaul the company website with modern UI.",
      "startDate": "2023-10-27T10:00:00.000Z",
      "status": "active"
    }
  ]
  ```
- **Error Response (404):**
  ```json
  {
    "error": "User not found."
  }
  ```

---

## Database Models (Reference)

### Users Table
- `userId` (UUID, PK)
- `name` (String)
- `email` (String, Unique)
- `password` (Hashed)
- `salt` (String)
- `project` (UUID, FK -> Projects)

### Projects Table
- `projectId` (UUID, PK)
- `title` (String, Unique)
- `description` (Text)
- `startDate` (String)
- `endDate` (String, Optional)
- `status` (Enum: 'active', 'closed', 'in-future')
- `createdAt` (Timestamp)

### Project Developers Table (Junction)
- `projectId` (UUID, FK)
- `userId` (UUID, FK)