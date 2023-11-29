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

  @Get('apiPython')
  async testPythonCall(): Promise<any> {
    const url = 'http://127.0.0.1:5000/getTasks';
    try {
      const tasks = await this.appService.getTasksPython(url);
      return { success: true, tasks };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
