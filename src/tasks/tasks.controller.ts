import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/interface/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
constructor(private taskService: TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    // Una forma
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        console.log('body', createTaskDto);  
    }
    // Otra Forma
    /* @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string,
    ): Task {
        return this.taskService.createTask(title, description);  
    } */


}
