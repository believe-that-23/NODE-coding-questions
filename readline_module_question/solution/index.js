import readline from 'readline';

const tasks = [];
let taskIdCounter = 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUserChoice() {
  console.log('Task Manager');
  showMenu();
  rl.question('Enter your choice (1/2/3/4/5): ', (choice) => {
    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        listTasks();
        break;
      case '3':
        markTaskAsCompleted();
        break;
      case '4':
        deleteTask();
        break;
      case '5':
        quit();
        break;
      default:
        console.log('Invalid choice. Please enter a valid option.');
        promptUserChoice();
        break;
    }
  });
}

function showMenu() {
  console.log('1. Add Task');
  console.log('2. List Tasks');
  console.log('3. Mark Task as Completed');
  console.log('4. Delete Task');
  console.log('5. Quit');
}

function addTask() {
  rl.question('Enter task description: ', (description) => {
    const task = {
      id: taskIdCounter++,
      description,
      completed: false,
    };
    tasks.push(task);
    console.log('Task added successfully.');
    promptUserChoice();
  });
}

function listTasks() {
  if (tasks.length === 0) {
    console.log('No tasks to display.');
  } else {
    console.log('Tasks:');
    tasks.forEach((task) => {
      const status = task.completed ? '[x]' : '[ ]';
      console.log(`${task.id}. ${status} ${task.description}`);
    });
  }
  promptUserChoice();
}

function markTaskAsCompleted() {
  rl.question('Enter the task ID to mark as completed: ', (taskId) => {
    const id = parseInt(taskId, 10);
    if (isNaN(id) || id < 1 || id > taskIdCounter - 1) {
      console.log('Invalid task ID. Please enter a valid task ID.');
      markTaskAsCompleted();
      return;
    }
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed; 
      console.log('Task marked as completed.');
    } else {
      console.log('Task not found.');
    }
    promptUserChoice();
  });
}


function deleteTask() {
  rl.question('Enter the task ID to delete: ', (taskId) => {
    const id = parseInt(taskId, 10);
    if (isNaN(id) || id < 1 || id > taskIdCounter - 1) {
      console.log('Invalid task ID. Please enter a valid task ID.');
      deleteTask();
      return;
    }
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      console.log('Task deleted successfully.');
    } else {
      console.log('Task not found.');
    }
    promptUserChoice();
  });
}

function quit() {
  console.log('Goodbye!');
  rl.close();
}

promptUserChoice();
