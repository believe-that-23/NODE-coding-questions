import readline from 'readline';
import fs from 'fs';
import {
    showMenu,
    listTasks,
    tasks,
    saveTasksToFile,
    deleteTask
} from './index';

const mockQuestion = jest.fn();
const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { });

const createInterfaceSpy = jest.spyOn(readline, 'createInterface');
const consoleSpy = jest.spyOn(console, 'log');

describe('Task Manager Functions', () => {
    beforeEach(() => {
        // Clear tasks before each test
        tasks.length = 0;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should display the menu', () => {
        createInterfaceSpy.mockReturnValue({
            question: jest.fn(),
            close: jest.fn(),
        });

        showMenu();

        expect(consoleSpy).toHaveBeenCalledTimes(5);
        expect(consoleSpy).toHaveBeenCalledWith('1. Add Task');
        expect(consoleSpy).toHaveBeenCalledWith('2. List Tasks');
        // Add similar expectations for other menu items
    });

    it('should add a task', () => {
        // Reset tasks file
        let task = {
            id: 0,
            description: "need to be done",
            completed: false,
        }
        fs.writeFileSync('tasks.txt', JSON.stringify([]));

        tasks.push(task);
        saveTasksToFile();

        // Read the tasks file and parse its contents
        const fileContents = fs.readFileSync('tasks.txt', 'utf8');
        const parsedTasks = JSON.parse(fileContents);

        expect(parsedTasks).toHaveLength(1);
        expect(parsedTasks[0].description).toBe('need to be done');
        expect(parsedTasks[0].completed).toBe(false);
    });

    it('should list tasks', () => {
        tasks.push({ id: 1, description: 'Task 1', completed: false });
        tasks.push({ id: 2, description: 'Task 2', completed: true });

        createInterfaceSpy.mockReturnValue({
            question: jest.fn(),
            close: jest.fn(),
        });

        listTasks();

        expect(consoleSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Tasks:'));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[ ] Task 1'));
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[x] Task 2'));
    });

    it('should delete a task', () => {
        const mockCallback = jest.fn();

        mockQuestion.mockImplementationOnce((question, callback) => {
            callback('1'); // Simulate user input: delete task with ID 1
        });

        deleteTask(mockCallback);

        // Check that the task with ID 1 is deleted
        expect(tasks.find((task) => task.id === 1)).toBeUndefined();

        // Ensure that the callback function is called
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

});
