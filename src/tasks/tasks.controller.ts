import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './DTO/create-task-dto';
import { UpdateClassDTO } from './DTO/update-task-dto';
import { FilteredTasksDTO } from './DTO/get-filtered-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filteredDTO: FilteredTasksDTO): Task[] {
    if (Object.keys(filteredDTO).length) {
      return this.taskService.getFilteredTasks(filteredDTO);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() updateTask: UpdateClassDTO) {
    return this.taskService.updateTask(id, updateTask);
  }
}
