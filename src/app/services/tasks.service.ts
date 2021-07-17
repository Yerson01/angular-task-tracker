import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../models/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private listUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  private getDetailUrl(task: Task): string {
    return `${this.listUrl}/${task.id}`;
  }

  getTasks(): Observable<Task[]> {
    const tasks = this.http.get<Task[]>(this.listUrl);
    return tasks;
  }

  deleteTask(task: Task): Observable<Task> {
    const url = this.getDetailUrl(task);
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = this.getDetailUrl(task);
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.listUrl, task, httpOptions);
  }
}
