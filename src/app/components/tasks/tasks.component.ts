import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/Task';
import { TasksService } from 'src/app/services/tasks.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  showAddTask: boolean;
  subscription: Subscription;

  constructor(
    private tasksService: TasksService,
    private toggleService: ToggleService
  ) {
    this.subscription = this.toggleService.onToggle().subscribe((value) => {
      this.showAddTask = value;
    });
  }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task): void {
    this.tasksService.deleteTask(task).subscribe((tasks) => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  toggleReminder(task: Task): void {
    const toggledTask: Task = { ...task, reminder: !task.reminder };
    this.tasksService
      .updateTaskReminder(toggledTask)
      .subscribe((updatedTask) => {
        task.reminder = updatedTask.reminder;
      });
  }

  addTask(task: Task): void {
    this.tasksService.addTask(task).subscribe((task) => {
      this.tasks.push(task);
    });
  }
}
