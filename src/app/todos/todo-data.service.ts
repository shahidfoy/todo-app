import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  lastId = 0;
  todos: Todo[] = [];

  constructor() { }

  // simulate POST /todos
  addTodo(todo: Todo): TodoDataService {
    if(!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos
    .filter(todo => todo.id !== id);
    return this;
  }

  // simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo | any {
    const todo = this.getTodoById(id);
    if(!todo) {
      return this;
    }
    Object.assign(todo, values);
    return todo;
  }

  // simulate GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // simulate GET /todos/:id
  getTodoById(id: number): Todo | any {
    return this.todos
      .filter(todo => todo.id == id)
      .pop();
  }

  // simulate GET /todos/:category
  getTodoByCategory(id: number): Todo[] {
    return this.todos
      .filter(todo => todo.category === id);
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo) {
    const updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}
