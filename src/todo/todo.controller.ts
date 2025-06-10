import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '@prisma/client';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Promise<Todo | null> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  createTodo(@Body() newTodo: Todo): Promise<Todo> {
    if (!newTodo.title) {
      throw new Error('Title is required to create a todo');
    }
    if (!newTodo.content) {
      throw new Error('Content is required to create a todo');
    }
    return this.todoService.createTodo({
      title: newTodo.title,
      content: newTodo.content,
      done: newTodo.done,
    });
  }

  @Put(':id')
  updateTodo(@Body() updateTodo: Todo, @Param('id') id): Promise<Todo> {
    if (!updateTodo.title) {
      throw new Error('Title is required to update a todo');
    }
    if (!updateTodo.content) {
      throw new Error('Content is required to update a todo');
    }
    return this.todoService.updateTodo({
      where: { id: Number(id) },
      data: {
        title: updateTodo.title,
        content: updateTodo.content,
        done: updateTodo.done,
      },
    });
  }

  @Delete(':id')
  deleteTodo(@Param('id') id): Promise<Todo> {
    return this.todoService.deleteTodo({
      id: Number(id),
    });
  }
}
