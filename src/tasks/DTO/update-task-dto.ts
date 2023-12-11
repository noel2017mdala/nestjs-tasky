import { TaskStatus } from '../task.model';

export class UpdateClassDTO {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
