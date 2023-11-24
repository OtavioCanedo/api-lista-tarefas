import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './app.controller';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private tasks: CreateTaskDto[] = [
    {
      name: 'Trabalho aplicações TCP',
      description: 'Desenvolver 2 APIs utilizando NodeJS e Flask',
      priority: 'high',
      status: 'inProgress',
    },
  ];

  getTasks(): CreateTaskDto[] {
    return this.tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<CreateTaskDto[]> {
    const newTask: CreateTaskDto = {
      name: createTaskDto.name,
      description: createTaskDto.description,
      priority: createTaskDto.priority,
      status: createTaskDto.status,
    };

    this.tasks.push(newTask);
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 3000);
    });

    return this.tasks;
  }
}
