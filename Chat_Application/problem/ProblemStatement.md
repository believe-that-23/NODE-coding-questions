## Title: 
User Registration, User Management, and Task Creation Web App

### Introduction + Scenario:
Your task is to create a web application that allows users to register as administrators and manage other users. Admin users can create, and get all users but normal users can't. All users, regardless of their role, can create and view tasks. The application's backend is built using Express.js and MongoDB.

### Objectives:

You have to implement the following functionalies in the application.

1. Middleware Functions:

- authenticateJWT: Middleware function that verifies the JWT token from the request headers. If the token is valid, it adds the user's information to cookies and the request object.
- isAdmin: Middleware function that checks if the user has an 'admin' role. If the user is an admin, it allows access; otherwise, it returns a 403 (Permission denied) response.

2. User Management:

- getAllUsers: Retrieves a list of all users from the database. It returns the List of users.
- deleteUser: Deletes a user by their userId. Only administrators can perform this operation.
- createTask: Allows users to create tasks with a name, description, and owner. This function creates a task in the database.It should output the Created Task.
- getAllTasks: Retrieves a list of all tasks from the database. This function also populates each task with the owner's username and role.

3. User Login:

- login: Authenticates a user by verifying their username and password. If successful, it generates a JWT token for the user's session.

4. User Authentication:

- authenticateUser: Checks the provided username and password against the database records. Returns the user if authenticated.


### Expected Output:


### Notes:

- The changes are being done in task.repository.js, user.repository.js and authMiddleware.js only. No need to change code written in any other files.