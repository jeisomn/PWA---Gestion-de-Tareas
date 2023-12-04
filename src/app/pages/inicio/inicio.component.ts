import { Component } from '@angular/core';
import { Tareas } from '../models/tarea';
import { Router } from '@angular/router';
import { NotasServiceService } from 'src/app/servicos/notas-service.service';
import { FirebaseTareasService } from 'src/app/servicos/firebase-tareas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  tareas: Tareas = new Tareas();

  constructor(private router: Router, 
    private tareasService: NotasServiceService, 
    private firebaseTareas: FirebaseTareasService){ 

    // this.router.navigate(['inicio']);

    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      console.log(params)
      this.tareas = params['tarea']

    }
    }
  
    //Metodo para agregar tareas
    agregarTarea() {    
    // Guardar la receta en Firebase
    if (!this.tareas.etiqueta || !this.tareas.nombreEst || !this.tareas.nombreTar || !this.tareas.descripcion || !this.tareas.fecha) {
      alert('Por favor, completa todos los campos antes de agregar la tarea.');
      return false;
    }else{

    // Guardar la tarea en Firebase
    this.firebaseTareas.save(this.tareas)
      .then(() => {
        alert('Tarea guardada exitosamente');
        this.router.navigate(['pages/listado']);
        this.tareasService.addRecetas(this.tareas)
        this.tareas = new Tareas(); // Limpiar el modelo después de guardar en Firebase
        console.log('Tareas locales', this.tareasService.getTareas());
      })
      .catch(error => {
        console.error('Error al guardar en Firebase', error);
      });}
      
      alert('Tarea guardada exitosamente');
      this.router.navigate(['pages/listado']);
    return false;
    };

    //Metodo para actualizar las tareas
    actualizar() {
      // Asegúrate de que la tarea tenga un UID antes de intentar actualizar
      if (this.tareas.uid) {
        // Llama al método de actualización con la tarea actual
        this.firebaseTareas.update(this.tareas)
          .then(() => {
            alert('Tarea actualizada exitosamente.');
            this.router.navigate(['pages/listado']);
            // Aquí puedes realizar otras acciones después de la actualización
          })
      } else {
        alert('La tarea no tiene un UID, no se puede actualizar.');
        // Puedes mostrar un mensaje de error en tu interfaz de usuario si lo deseas
      }
      
    }

}

