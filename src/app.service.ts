import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './app.controller';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

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

  constructor(private readonly httpService: HttpService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<CreateTaskDto[]> {
    const newTask: CreateTaskDto = {
      name: createTaskDto.name,
      description: createTaskDto.description,
      priority: createTaskDto.priority,
      status: createTaskDto.status,
    };

    this.tasks.push(newTask);
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });

    return this.tasks;
  }

  async getTasksPython(apiUrl: string): Promise<CreateTaskDto[]> {
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });

      const response = await lastValueFrom(this.httpService.get(apiUrl));
      this.tasks = response.data;

      console.log('Lista de tarefas Python:', this.tasks);
    } catch (error) {
      console.error('Erro ao chamar a API Python:', error.message);
      throw error;
    }

    return this.tasks;
  }
}
