# W09D05# W09D05
# Social Media front-end
**Demo** (https://social-media-front-mern.herokuapp.com/)
## Description
A social Media app with login and registration  system, comment and communicate with others posts with user authentication and authorization using Mongoo, Express, React, node js and Redux.

## User Stories

**USER**
- Register: In this app user need to register so that I can start read, write, update and delete post.
- Log in: to add a new post, comment other posts and like it, I need to log in to the app using email and password
- Also there is choice to login with google account.
-  Explore: user can see posts of other user which called explore.
- Home: which display user post only.
- Add a post: user can add a new post.
- Update a post: user can edit his post[ title and discription].
- Delete a post: user can delete any of his posts.
- Add a comment: user can add a new comment to any other user posts.
- See comments: user can show any of the comments in posts.
- Delete Comment: user can delete his own comment.
- Like a post: user can like any post.

**ADMIN:**
- Admin can delete any user with posts and comment relative to that user
- Admin can show all users

---

# Client / Frontend

## React Router Routes (React App)

| Path         |      Component      |                                                       Behavior |
| :----------- | :-----------------: | -------------------------------------------------------------: |
| /            |     Timeline        |                                                      Home page |
| /register    |     Register        | Signup input, link to login, navigate to homepage after signup |
| /login       |     Login           |  Login input, link to signup, navigate to homepage after login |
| /profile     |     Profile         |                user page, account info, posts, comments, likes |
| /dashboard   |     Dashboard       |                         Admin page, all users, delete any user |
|/resetpassword|     ResetPassword   |                                            Reset password page |
| /posts       |     Userposts       |                                                      Post page |
| /comment     |     Comment         |                       display comments and edit and delete them|
| /editPost    |     EditPost        |                                                       edit post|
## Components

- Register
- VerifyEmail
- Login
- Timeline
- Profile
- Dashboard
- Post
- Comment


---

# UML Diagram

## ![uml](https://github.com/Suha-AlHumaid/W09D05/blob/main/uml.jpg)

# Server / Backend
# Social Media Apis With Auths
It's social media backend project with authentication and authorization. It's includes signin and register system useing bcrybt and jwt. Give only permission for admin to delete or see users information and create custom role.

ّIndex:
* [Instructions](#Instructions)
* [Technologies](#technologies)
* [Schemas](#Schemas)
* [Routers](#Routers)

## Instructions for useing this project:
```
npm i  
 ```
create .env file and set your own values:
```
PORT=your own port
DB_URI= url on mongodb
SALT=salt value
secert_key=any secrt value
```

## Technologies:
* Mongoose
* Mongo DB
* express
* node js
* bcrybt
* jwt


## Entity Relationship Diagram
![entity relationship diagram](https://github.com/Suha-AlHumaid/W08D04/blob/main/img/digram.jpg)

## UML Diagram
![URM ](https://github.com/Suha-AlHumaid/W08D03/blob/main/img/uml.jpg)

## Schemas:
 * Role schema
    <br>  contains this information: role and permessions
 * user schema
   <br>  contains this information: email , password and role
 * post schema
    <br> contains this information: disciption , avatar, title, comments
* like schema
    <br> contains this information: like and user and post relative 

 ## Routers:
### Role Routers

 * Create role api
      <br> To create new user role like: admin and user.
      only admin can create a role
      
 * Get all role api
      <br> List all roles in the DB like: Admin and user.
      only admin can see rools

        
 ### User Routers
   * Register api
   * Login api
   * Delete user api
   * Soft delete user api
   * Get all users api

          
          
 ### Posts Routers 
   * Create new post api.
   * Update post api.
   * Delete post api.
   * Get all posts api.
   * Get post by id api.

 ### Comments Routers
   * Get all comments api
   * Get comment by id api
   * Add new comment api
   * Delete comment by id api 
   * Update comment by id api 
   * Delete any comment or post api  (for Admin only)
   * Delete any comment on user's post api (can delete others comments on his post)

          
          
 ### like Router 
   * Toggele like api.

