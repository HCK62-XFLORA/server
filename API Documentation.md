# Explora API Documantion

# Endpoints:

List of available endpoint:

- `POST /register`
- `POST /login`
- `GET /users/:UserId`

Routes below need authentication:

- `GET /forums`
- `GET /forums/:forumId`
- `POST /plants`
- `GET /plants/:plantId`
- `POST /threads`
- `GET /threads`
- `GET /threads/:threadId`
- `POST /comments/:threadId `

Routes below need authentication & authorization:

- `PUT /users/:UserId`
- `POST /users/:UserId/plants`
- `GET /users/:userId/plants`
- `DELETE /users/:userId/plants/:plantId`
  &nbsp;

## Models :

_Users_

```
- username : string, required
- email : string, required, unique
- password : string, required
- birthday: string, required
- gender : string, required
- badge : enum, required
- points : integer
```

_MyPlants_

```
- PlantId: integer, required
- UserId : integer, required
- imgUrl : string, required
```

_Plants_

```
- name: string, required
- family : string, required
- imgUrl : string, required
- description:  string, required
```

_Threads_

```
- UserId: integer, required
- imgUrls : integer, required
- content : text, required
- forumId : integer, required

```

_Comments_

```
- UserId : integer, required
- ThreadId: integer, required
- comment: string, required
- isUseFul : boolean, required
```

_Forums_

```
name: string, required
imgUrl: string, required
```

_Reactions_

```
ThreadId : integer, required
UserId : integer, required
reaction : boolean, required
```

## 1. POST /register

Description:
Creates a new user account.

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "birthday": "date",
  "gender": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid input. Please provide valid data."
}
OR
{
  "message": "Email is already in use. Please choose another email."
}
OR
{
  "message": "Invalid email format. Please provide a valid email address."
}
OR
{
  "message": "All fields are required. Please fill in all the fields."
}
OR
{
  "message": "Invalid date format. Please provide a valid date."
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "Login successful.",
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 3. GET /users/:UserId

Description:

- Retrieves user information based on the provided user ID.

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "UserId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "username": "string",
  "email": "string",
  "birthday": "date",
  "gender": "string",
  "address": "string",
  "phone": "string"
}
```

_Response (404 - Not Found)_

```JSON
{
  "message": "User not found"
}

```

&nbsp;

## 4. PUT /users/:UserId

Description:

- Edit User Data

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "UserId": "integer (required)"
}
```

-Body:

```JSON
{
  "username": "string",
  "email": "string",
  "birthday": "string",
  "gender": "string"
}
```

_Response (200 - OK)_

```JSON
{
  "message": "User with id ${id} updated successfully"
}
```

_Response (404 - Not Found)_

```JSON
{
  "message": "Invalid input. Please provide valid data."
}
OR
{
  "message": "Email is already in use. Please choose another email."
}
OR
{
  "message": "Invalid email format. Please provide a valid email address."
}
OR
{
  "message": "Invalid date format. Please provide a valid date."
}
OR
{
  "message": "All fields are required. Please fill in all the fields."
}

```

## 5. POST /users/:UserId/plants

Description:

- Adds a new plant to the user's plant list.

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "UserId": "integer (required)"
}
```

_Response (201 - OK)_

```JSON
{
  "message": "Plant successfully added to the user's list."
}
```

_Response (400 - Bad Request)_

```JSON
{
  "message": "Invalid input. Please provide a valid PlantId."
}
```

## 6. GET /users/:userId/plants

Description:

- Get a new plant list.

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "UserId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "MyPlants": [
    {
      "MyPlantId": "integer",
      "MyPlant": {
        "Plants": {
            "name": "string",
            "family" : "string",
            "imgUrl" : "string",
            "description":  "string"
        },
        ...
        "UserId" : "integer",
        "imgUrl" : "string"
      },
      ...
    },
    ...
  ]
}
```

_Response (400 - Bad Request)_

```JSON
{
  "message": "User's plant list not found."
}
```

## 7. DELETE /users/:userId/plants/:plantId

Description:

- Removes a plant from the user's plant list based on the provided plant ID.

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "UserId": "integer (required)",
  "plantId": "integer (required)"
}
```

_Response (200 - OK)_

```JSON
{
  "message": "Plant successfully removed from the user's list."
}
```

_Response (400 - Bad Request)_

```JSON
{
  "message": "Plant not found in the user's list."
}
```

## 8. GET /forums

Description:

- Get a new forum list.

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
  [
      {
          "id": "integer",
          "name": "integer",
          "imgUrl": "integer"
      },
    ...
  ]
```


## 9. GET /forums/:forumId 
Description:

- Get a forum list by id.

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "name": "integer",
    "imgUrl": "integer"
}
```

_Response (400 - Bad Request)_

```JSON
{
    "message": "Not Found"
}
```

## 9. POST /plants

Description:

- Adds a new plant to the system.

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "family": "string",
  "imgUrl": "string",
  "description": "string"
}
```

_Response (201 - OK)_

```JSON
{
  "message": "Plant successfully added."
}
```

_Response (400 - Bad Request)_

```JSON
{
  "message": "Invalid input. Please provide valid data."
}
```

## 10. GET /plants/:plantId

Description:

- Retrieves information about a specific plant based on the provided plant ID.

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "plantId": "integer (required)"
}
```

_Response (200 - OK)_

```JSON
{
  "plantId": "integer",
  "name": "string",
  "family": "string",
  "imgUrl": "string",
  "description": "string"
}
```

_Response (400 - Bad Request)_

```JSON
{
  "message": "Plant not found."
}
```

## 11. GET /threads

Description:

- Get a thread in the system.

Request:

- Query:
  ```JSON
  {
    "nthThreads" : "integer (required)",
    "catgeoryForum" : "string (required)"
  }
  ```

_Response (200 - OK)_

```JSON
[
  {
    "UserId": "integer",
    "imgUrls" : "integer",
    "content" : "text",
    "forum" : {
      "name": "string",
      "imgUrl": "string"
    }
  },
  ...
]
```

_Response (400 - Bad Request)_

```JSON
{
  "message": "Thread not found."
}
```

## 12. GET /threads/:threadId

Description:

- Retrieves information about a specific thread based on the provided thread ID.

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "threadId": "integer (required)"
}
```

_Response (200 - OK)_

```JSON
{
  "User": {
    "username" : "string"
  },
  "imgUrls": "string",
  "content": "string",
  "forum": {
    "name": "string",
    "imgUrl": "string"
  }
}
```

_Response (400 - Bad Request)_

```JSON
{
  "message": "Thread not found."
}
```

## 13. POST /threads

Description:

- Creates a new thread in the system.

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "UserId": "integer",
  "imgUrls": "integer",
  "content": "text",
  "forumId": "integer"
}
```

_Response (201 - OK)_

```JSON
{
  "message": "Thread successfully created."
}
```

_Response (400 - Bad Request)_

```JSON
{
  "message": "Invalid input. Please provide valid data."
}
```

## 14. POST /comments/:threadId

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "comment": "string"
}
```

_Response (201 - OK)_

```JSON
{
  "message": "Comment successfully created."
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
