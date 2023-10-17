## Title: 

Task Manager Application
### Introduction + Scenario:

Your task is to implement a command-line-based Task Manager application in JavaScript. The application allows users to manage their tasks, including adding, listing, marking as completed, and deleting tasks. Users can interact with the application through a simple command-line interface.

### Objectives:

1. Ensure the ability to interact with the application through a command line interface using the readline module, which provides the necessary functions for accepting user input and displaying information in the console.

2. The application should allow users to perform the following operations:

- Add a task.
- List all tasks.
- Mark a task as completed.
- Delete a task.
- Quit the application.

3. The tasks should be stored in a file named tasks.txt.

4. Functions to Implement:
You are provided with several functions that implement the core functionalities of the application. 

- showMenu: Displays the main menu with options to manage tasks.
- listTasks: Lists all tasks with their IDs, descriptions, and completion status.
- saveTasksToFile: Saves the list of tasks to a file (tasks.txt) in JSON format.
- addTask: Allows users to add tasks by entering a description. The new task is stored in the tasks list.

5. Optional Features:

- deleteTask:Allows users to delete a task by specifying its ID.
- markTaskAsCompleted: This function allows users to mark a task as completed. Users are prompted to enter the task ID they want to mark as completed.
- quit: This function serves a crucial role in the application by providing users with a clean and user-friendly way to exit the application.



### Notes:

1. When saving tasks to a file (tasks.txt), it's important to present the data in a readable and well-organized format. To achieve this, use JSON.stringify(tasks, null, 2) for formatting in the write operations on tasks.txt.

