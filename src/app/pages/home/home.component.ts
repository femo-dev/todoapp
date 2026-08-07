import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar Angular CLI',
      completed: false
    },
    {
      id: Date.now() + 1,
      title: 'Crear un proyecto Angular',
      completed: false
    },
    {
      id: Date.now() + 2,
      title: 'Crear un componente',
      completed: false
    },
    {
      id: Date.now() + 3,
      title: 'Crear un servicio',
      completed: false
    },
    {
      id: Date.now() + 4,
      title: 'Crear un modelo',
      completed: false
    }
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const title = input.value;
    this.addTask(title);
    input.value = '';
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }

    this.tasks.update((currentTasks) => [...currentTasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((currentTasks) => currentTasks.filter((_, position) => position !== index));
  }

  updateTask(index: number) {
    this.tasks.update((currentTasks) => {
      return currentTasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      });
    });
  }
}