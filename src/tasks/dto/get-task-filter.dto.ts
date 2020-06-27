import { TaskStatus } from '../../interface/task.interface';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
export class GetTaskFilterDto {

    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}