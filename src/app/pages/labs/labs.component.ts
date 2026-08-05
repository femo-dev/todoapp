import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
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

  person = {
    name: 123,
    age: 30
  };  

  changeHandler(event: Event) {
    console.log("Event: ", event);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
