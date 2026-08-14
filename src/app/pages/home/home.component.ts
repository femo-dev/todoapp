import { Component, computed, signal, effect, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }

    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }

    return tasks;
  });

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required/*,
      Validators.minLength(3)*/
    ]
  });

  inhector = inject(Injector);

  ngOnInit() {
    const storage = localStorage.getItem('tasks');

    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }

    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.inhector });
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const title = input.value;
    this.addTask(title);
    input.value = '';
  }

  keydownHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
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

  clearCompleted() {
    this.tasks.update((currentTasks) => currentTasks.filter(task => !task.completed));
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

  editTask(index: number) {
    this.tasks.update((currentTasks) => {
      return currentTasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      });
    });
  }

  saveTask(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const title = input.value.trim();

    if (title) {
      this.tasks.update((currentTasks) => {
        return currentTasks.map((task, position) => {
          if (position === index) {
            return {
              ...task,
              editing: false,
              title
            }
          }
          return task;
        });
      });
    }
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}