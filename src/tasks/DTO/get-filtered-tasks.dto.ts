import { TaskStatus } from '../task.model';

export class FilteredTasksDTO {
  status: TaskStatus;
  searchTerm: string;
}
