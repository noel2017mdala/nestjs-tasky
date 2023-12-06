import { TaskStatus } from '../task.model';

export class UpdateClassDTO {
  title: string;
  description: string;
  status: TaskStatus;
}
