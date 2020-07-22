import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id:12, username: 'Test user' };
const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn(),
});



describe('TasksService', () => {
    let tasksService;
    let taskRepository;

    beforeEach( async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository },
           ],
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from the repositorory', async () => {
            taskRepository.getTasks.mockResolvedValue('some value');


            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            
            const filters: GetTaskFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' };
            // call tasksService.getTasks
            const result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('some value');
        });
    });

    describe('getTaskById', () => {
        it('calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
            const mockTask = { title: 'Test task', description: 'Test desc' };
            taskRepository.findOne.mockResolvedValue({ title: 'Test task', description: 'Test desc' });

            const result = await tasksService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask);

            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 1,
                    userId: mockUser.id
                }
            })
        });

        it('throws an error as task is not found', () => {
            taskRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById(1, mockUser)).rejects.not.toThrow(NotFoundException);
        });

    })

    describe('createTask', () => {
        it('calls taksRepository.create() and return the result', async () => {
            taskRepository.createTask.mockResolvedValue('some task');
            expect(taskRepository.createTask).not.toHaveBeenCalled();
            const createTaskDto = { title: 'Test Task', description: 'Test desc' };
            const result = await tasksService.createTask(createTaskDto, mockUser);
            expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto, mockUser);
            expect(result).toEqual('some task');
        });
    });

    describe('deletingTask', () => {
        it('calls taksRepository.deleteTask() to delete a task', async () => {
            taskRepository.deleteTask.mockResolvedValue({affected:1});
            expect(taskRepository.deleteTask).not.toHaveBeenCalled();
            await tasksService.deleteTask(1, mockUser);
            expect(taskRepository.delete).toHaveBeenCalledWith({id:1, userId: mockUser.id});
        });

        it('throws an error as task could not be found', () => {
            taskRepository.delete.mockResolvedValue({ affected: 1 });
            expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException)
        })
    });

    describe('updateTaskStatus', () => {
        it('update a task status', async () => {
            const save = jest.fn().mockResolvedValue(true);

            tasksService.getTaskById = jest.fn().mockResolvedValue({
                status: TaskStatus.OPEN,
                save,
            });

            expect(tasksService.getTaskById).not.toHaveBeenCalled();
            expect(save).not.toHaveBeenCalled();
            const result = await tasksService.updateTaskStatus(1, TaskStatus.DONE, mockUser);
            expect(tasksService.getTaskById).toHaveBeenCalled();
            expect(save).toHaveBeenCalled();
            expect(result.status).toEqual(TaskStatus.DONE);
        });
    });
});