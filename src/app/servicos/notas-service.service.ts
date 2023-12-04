import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tareas } from '../pages/models/tarea';

@Injectable({
  providedIn: 'root'
})
export class NotasServiceService {

  tareas: Tareas[] = [];

  constructor(private router: Router) {
  }

  addRecetas(tareas: Tareas){
    this.tareas.push(tareas)
  };

  getTareas(){
    return this.tareas;
  };


  eliminarReceta(tareas: Tareas) {
    this.tareas = this.tareas.filter(r => r !== tareas);
  }
}
