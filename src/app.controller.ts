import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

export class CreateTaskDto {
  name: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  status?: 'todo' | 'inProgress' | 'done';
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('createTasks')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<CreateTaskDto[]> {
    return await this.appService.createTask(createTaskDto);
  }
}
