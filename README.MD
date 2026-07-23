# API Endpoints

## User Routes

### Create User
***http method:*** `POST`  
**Endpoint:** `/api/users`

**Description:** Creates a new user.

**Request Body:**
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response Body:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "isAdmin": "boolean"
}
```

**Error Responses:**
- **400 Bad Request:** If any required field is missing or invalid.
  ```json
  {
    "message": "All fields are required!"
  }
  ```
- **400 Bad Request:** If the user already exists.
  ```json
  {
    "message": "User already exists"
  }
  ```
- **400 Bad Request:** If the user data is invalid.
  ```json
  {
    "message": "Invalid user data"
  }
  ```

---

### Login User
***http method:*** `POST`  
**Endpoint:** `/api/users/logIn`

**Description:** Logs in an existing user.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response Body:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "isAdmin": "boolean"
}
```

**Error Responses:**
- **401 Unauthorized:** If the user is not found.
  ```json
  {
    "message": "User not found"
  }
  ```
- **401 Unauthorized:** If the password is invalid.
  ```json
  {
    "message": "Invalid password"
  }
  ```

---

### Logout User

***http method:*** `POST`  
**Endpoint:** `/api/users/logout`

**Description:** Logs out the currently logged-in user by clearing the authentication token.

**Response Body:**
```json
{
  "message": "User logout successfully"
}
```

---

### Get User Profile
***http method:*** `GET`  
**Endpoint:** `/api/users/profile`

**Description:** Retrieves the profile of the currently logged-in user.

**Headers:**
- **Authorization:** Bearer token (required)

**Response Body:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string"
}
```

**Error Responses:**
- **404 Not Found:** If the user is not found.
  ```json
  {
    "message": "User not found!"
  }
  ```

---

### Update User Profile
***http method:*** `PUT`  
**Endpoint:** `/api/users/profile`

**Description:** Updates the profile of the currently logged-in user.

**Headers:**
- **Authorization:** Bearer token (required)

**Request Body:**
```json
{
  "username": "string (optional)",
  "email": "string (optional)"
}
```

**Response Body:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "isAdmin": "boolean"
}
```

**Error Responses:**
- **404 Not Found:** If the user is not found.
  ```json
  {
    "message": "User not found"
  }
  ```

---

# Admin Routes

### Get All Users (Admin Only)
***http method:*** `GET`  
**Endpoint:** `/api/users`

**Description:** Retrieves a list of all users. Only accessible by admin users.

**Headers:**
- **Authorization:** Bearer token (required)

**Response Body:**
```json
[
  {
    "_id": "string",
    "username": "string",
    "email": "string",
    "isAdmin": "boolean"
  }
]
```

---

### Get User by ID (Admin Only)
***http method:*** `GET`  
**Endpoint:** `/api/users/:id`

**Description:** Retrieves a specific user by their ID. Only accessible by admin users.

**Headers:**
- **Authorization:** Bearer token (required)

**Response Body:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "isAdmin": "boolean"
}
```

**Error Responses:**
- **404 Not Found:** If the user is not found.
  ```json
  {
    "message": "User not found"
  }
  ```

---

### Delete User by ID (Admin Only)
***http method:*** `DELETE`  
**Endpoint:** `/api/users/:id`

**Description:** Deletes a specific user by their ID. Only accessible by admin users.

**Headers:**
- **Authorization:** Bearer token (required)

**Response Body:**
```json
{
  "message": "User deleted 👍"
}
```

**Error Responses:**
- **400 Bad Request:** If attempting to delete an admin user.
  ```json
  {
    "message": "Can't delete admin user"
  }
  ```
- **404 Not Found:** If the user is not found.
  ```json
  {
    "message": "User not found"
  }
  ```

### Update User by ID (Admin Only)
***http Method:*** `PUT`  
**Endpoint:** `/api/users/:id`

**Description:** Updates a specific user's details by their ID. Only accessible by admin users.

**Headers:**
- **Authorization:** Bearer token (required)

**Request Body:**
```json
{
  "username": "string (optional)",
  "email": "string (optional)",
  "isAdmin": "boolean (optional)"
}
```

**Response Body:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "isAdmin": "boolean"
}
```

**Error Responses:**
- **404 Not Found:** If the user is not found.
  ```json
  {
    "message": "User not found"
  }
  ```

---
## Category Routes

### Create Category (Admin Only)
***http Method:*** `POST`  
**Endpoint:** `/api/category`  
**Headers:**  
- **Authorization:** Bearer token (required, admin only)

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response Body:**
```json
{
  "_id": "string",
  "name": "string"
}
```

---

### Update Category (Admin Only)
***http Method:*** `PUT`  
**Endpoint:** `/api/category/:categoryId`  
**Headers:**  
- **Authorization:** Bearer token (required, admin only)

**Request Body:**
```json
{
  "name": "string (required)"
}
```

**Response Body:**
```json
{
  "_id": "string",
  "name": "string"
}
```

---

### Delete Category (Admin Only)
***http Method:*** `DELETE`  
**Endpoint:** `/api/category/:categoryId`  
**Headers:**  
- **Authorization:** Bearer token (required, admin only)

**Response Body:**
```json
{
  "message": "Category deleted sucessfully ✅"
}
```

---

### List All Categories
***http Method:*** `GET`  
**Endpoint:** `/api/category/categories`

**Response Body:**
```json
[
  {
    "_id": "string",
    "name": "string"
  }
]
```

---

### Get Category by ID
***http Method:*** `GET`  
**Endpoint:** `/api/category/:id`

**Response Body:**
```json
{
  "_id": "string",
  "name": "string"
}
```

---
## Product Routes

### Fetch Products (paginated / search)
***http method:*** `GET`  
**Endpoint:** `/api/products`  
**Query (optional):**
- `keyword` — search term

**Response Body:**
```json
{
  "products": [{ "...product fields..." }],
  "page": 1,
  "pages": 10,
  "hasMore": false
}
```

---

### Create Product (Admin Only)
***http method:*** `POST`  
**Endpoint:** `/api/products`  
**Headers:**  
- **Authorization:** Bearer token (required, admin only)  
**Content-Type:** multipart/form-data (use ExpressFormidable)

**Request (form-data):**
- `name` (string, required)
- `brand` (string, required)
- `quantity` (number, required)
- `category` (categoryId, required)
- `description` (string, required)
- `price` (number, required)
- `image` (file, required)

**Response Body:** created product object

---

### Fetch All Products (no pagination)
***http method:*** `GET`  
**Endpoint:** `/api/products/allproducts`

**Response Body:** array of product objects (may include populated category)

---

### Top Products
***http method:*** `GET`  
**Endpoint:** `/api/products/top`

**Response Body:** array of top-rated product objects

---

### New Products
***http method:*** `GET`  
**Endpoint:** `/api/products/new`

**Response Body:** array of recently added product objects

---

### Add Product Review
***http method:*** `POST`  
**Endpoint:** `/api/products/:id/reviews`  
**Headers:**  
- **Authorization:** Bearer token (required)

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Great product"
}
```

**Response Body:**
```json
{
  "message": "Reviews added"
}
```

---

### Get Product by ID
***http method:*** `GET`  
**Endpoint:** `/api/products/:id`

**Response Body:** product object

---

### Update Product (Admin Only)
***http method:*** `PUT`  
**Endpoint:** `/api/products/:id`  
**Headers:**  
- **Authorization:** Bearer token (required, admin only)  
**Content-Type:** multipart/form-data (use ExpressFormidable)

**Request (form-data):** same fields as Create Product

**Response Body:** updated product object

---

### Delete Product (Admin Only)
***http method:*** `DELETE`  
**Endpoint:** `/api/products/:id`  
**Headers:**  
- **Authorization:** Bearer token (required, admin only)

**Response Body:** deleted product object or
```json
{ "message": "Product deleted sucessfully ✅" }
```