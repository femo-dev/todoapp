import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal([
    'Instalar Angular CLI',
    'Crear un proyecto Angular',
    'Crear un componente',
    'Crear un servicio',
    'Crear un modelo',
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((currentTasks) => [...currentTasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((currentTasks) => currentTasks.filter((_, position) => position !== index));
  }
}