# Explora API Documantion

# Endpoints:

List of available endpoint:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /users`
- `POST /plants`
- `GET /plants/:plantId`
- `POST /notifications`
- `GET /notifications/:notificationId`
- `POST /threads`
- `GET /threads/:threadId`
- `POST /threads/:threadId/comments`
- `GET /threads/:threadId/comments/:commentId`

Routes below need authentication & authorization:
- `GET /users/:UserId`
- `PUT /users/:UserId`
- `POST /users/:UserId/plants`
- `GET /users/:userId/plants`
- `DELETE /users/:userId/plants/:plantId`
&nbsp;

## Models :

_User_
```
- username : string, required
- email : string, required, unique
- password : string, required
- birthday: string, required
- gender : string, required
```

_MyPlant_
```
- PlantId: integer, required
- UserId : integer, required
```

_Plant_
```
name: string, required
family : string, required
```

_Notification_
```
UserId : integer, required
commentId : integer, required
whatHappend: string, required
```

_Thread_
```
- UserId: integer, required
- likes : integer, required
- dislike : integer, required
- content : text, required
- imageUrl : string, required
```

_Comment_
```
- ThreadId: integer, required
- comment: string, required
```
## Relation :
1. User :

One-to-Many relationship with MyPlant 
One-to-Many relationship with Notification 
One-to-Many relationship with Thread 

2. MyPlant:

Many-to-One relationship with User 

3. Plant:

No direct relationships defined in the provided models.

4. Notification:

Many-to-One relationship with User 

5. Thread:

Many-to-One relationship with User 
One-to-Many relationship with Comment 

6. Comment:

Many-to-One relationship with Thread 


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

_Response (200 - OK)_

```json
{
  "userPlants": [
    {
      "userPlantId": "integer",
      "PlantId": "integer",
      "plantName": "string",
      "family": "string"
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

## 8. POST /plants

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
  "family": "string"
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

## 9. GET /plants/:plantId
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
  "createdAt": "string"
}
```

_Response (400 - Bad Request)_
```JSON
{
  "message": "Plant not found."
}
```

## 10. POST /notifications
Description:
- Creates a new notification for a user.

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
  "commentId": "integer",
  "whatHappened": "string"
}
```

_Response (201 - OK)_
```JSON
{
  "message": "Notification successfully created."
}
```
_Response (400 - Bad Request)_
```JSON
{
  "message": "Invalid input. Please provide valid data."
}
```

## 11. GET /notifications/:notificationId
Description:
- Retrieves information about a specific notification based on the provided notification ID.
- headers:
```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "notificationId": "integer (required)"
}
```

_Response (200 - OK)_
```JSON
{
  "notificationId": "integer",
  "UserId": "integer",
  "commentId": "integer",
  "whatHappened": "string",
  "createdAt": "string"
}
```
_Response (400 - Bad Request)_
```JSON
{
  "message": "Notification not found."
}
```

## 12. POST /threads
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
  "likes": "integer",
  "dislikes": "integer",
  "content": "text",
  "imageUrl": "string"
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

## 13. GET /threads/:threadId
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
  "notificationId": "integer",
  "UserId": "integer",
  "commentId": "integer",
  "whatHappened": "string",
  "createdAt": "string"
}
```

_Response (400 - Bad Request)_
```JSON
{
  "message": "Notification not found."
}
```

## 14. POST /threads/:threadId/comments

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

## 15. GET /threads/:threadId/comments/:commentId

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
  "threadId": "integer (required)",
  "commentId": "integer (required)"
}
```

_Response (200 - OK)_
```JSON
{
  "commentId": "integer",
  "ThreadId": "integer",
  "comment": "string",
  "createdAt": "string"
}
```

_Response (400 - Bad Request)_
```JSON
{
  "message": "Notification not found."
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