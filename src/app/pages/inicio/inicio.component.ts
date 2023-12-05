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

    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      console.log(params)
      this.tareas = params['tarea']

    }
    }
  
    //Metodo para agregar tareas
    agregarTarea() {    

        // Validar si la tarea ya tiene un UID asignado, lo que indica que es una tarea existente
  if (this.tareas.uid) {
    alert('Esta tarea ya tiene un UID asignado. Utiliza el método de actualización en lugar de agregar.');
    return false;
  }
    // Guardar la receta en Firebase
   else if (!this.tareas.etiqueta || !this.tareas.nombreEst || !this.tareas.nombreTar || !this.tareas.descripcion || !this.tareas.fecha) {
      alert('Por favor, completa todos los campos antes de agregar la tarea.');
      return false;
    }else{
    // Guardar la tarea en Firebase
    alert('Tarea guardada exitosamente');
    this.router.navigate(['pages/listado']);
    this.firebaseTareas.save(this.tareas)
      .then(() => {
        this.tareasService.addRecetas(this.tareas)
        this.tareas = new Tareas(); // Limpiar el modelo después de guardar en Firebase
        console.log('Tareas locales', this.tareasService.getTareas());
      })
      .catch(error => {
        console.error('Error al guardar en Firebase', error);
      });}
    
    return false;
    };

    //Metodo para actualizar las tareas
    actualizar() {
      // Validación de campos después de asignar los parámetros
      if (!this.tareas.uid) {
        alert('La tarea no tiene un UID, no se puede actualizar.');
        // Puedes redirigir al usuario a una página de error o hacer cualquier otra acción
      } else if (
        this.tareas.etiqueta === "" || this.tareas.nombreEst === "" || this.tareas.nombreTar === "" || this.tareas.descripcion === "" || this.tareas.descripcion === "" || this.tareas.fecha === null
      ) {
        alert('Por favor, completa todos los campos antes de actualizar la tarea.');
        // Puedes redirigir al usuario a una página de error o hacer cualquier otra acción
      } else {
        // Llama al método de actualización con la tarea actual
        alert('Tarea actualizada exitosamente.');
        this.firebaseTareas.update(this.tareas)
          .then(() => {
            this.router.navigate(['pages/listado']);
            // Aquí puedes realizar otras acciones después de la actualización
          })
          .catch((error) => {
            console.error('Error al actualizar la tarea:', error);
          });
      }
    }
  

}

