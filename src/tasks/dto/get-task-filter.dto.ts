import { TaskStatus } from '../../interface/task.interface';
export class GetTaskFilterDto {
    status: TaskStatus;
    search: string;
}