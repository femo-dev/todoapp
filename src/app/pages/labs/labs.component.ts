import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido!';
  tasks: string[] = ['Instalar Angular CLI',
    'Crear un proyecto Angular',
    'Crear un componente',
    'Crear un servicio',
    'Crear un modelo',
  ];

  name = signal('Fabián');

  person = {
    name: 'Dummy',
    lastName: 'Fake',
    age: 30
  };

  colorCtrl = new FormControl();
  withCtrl = new FormControl();

  changeHandler(event: Event) {
    console.log("Event: ", event);
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}