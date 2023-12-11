import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './DTO/create-task-dto';
import { UpdateClassDTO } from './DTO/update-task-dto';
import { FilteredTasksDTO } from './DTO/get-filtered-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(filteredTasks: FilteredTasksDTO): Task[] {
    const { searchTerm, status } = filteredTasks;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (searchTerm) {
      tasks = tasks.filter(
        (tasks) =>
          tasks.title.includes(searchTerm) ||
          tasks.description.includes(searchTerm),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    if (id !== '') {
      let arr = this.tasks.find((arr) => arr.id === id);
      if (arr) return arr;
    }
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid(),
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string) {
    let deletedTaks = this.getTaskById(id);

    if (deletedTaks) {
      this.tasks = this.tasks.filter((res) => res.id !== id);
      return deletedTaks;
    }
  }

  updateTask(id: string, updateTask: UpdateClassDTO) {
    try {
      let getTask = this.getTaskById(id);

      const { title, description, status } = updateTask;

      if (getTask) {
        let updatedTaskIndex = this.tasks.findIndex((obj) => obj.id === id);

        if (updatedTaskIndex !== -1) {
          this.tasks[updatedTaskIndex] = {
            id,
            description,
            status: status,
            title,
          };

          return this.tasks[updatedTaskIndex];
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
