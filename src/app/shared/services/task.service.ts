import { Injectable } from '@angular/core';
import { Task } from '../interfaces/tasks.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor() {}

  public getAllTasks() {
    return JSON.parse(localStorage.getItem('tasks')!);
  }

  public getTask(id: number) {
    let tasks = JSON.parse(localStorage.getItem('tasks')!);
    return tasks.filter((item: Task) => item.id === id);
  }

  public addTask(data: Task) {
    let tasks;

    tasks =
      JSON.parse(localStorage.getItem('tasks')!) !== null
        ? JSON.parse(localStorage.getItem('tasks')!)
        : [];
    data.id = tasks.length + 1;
    tasks.push(data);
    return localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public editTask(id: number, value: string) {
    let tasks = JSON.parse(localStorage.getItem('tasks')!);
    tasks = tasks.map((item: Task) => (item.id === id ? value : item));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
