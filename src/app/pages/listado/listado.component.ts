import { ChangeDetectorRef, Component } from '@angular/core';
import { Tareas } from '../models/tarea';
import { NavigationExtras, Router } from '@angular/router';
import { NotasServiceService } from 'src/app/servicos/notas-service.service';
import { FirebaseTareasService } from 'src/app/servicos/firebase-tareas.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  
  tarea!: NotasServiceService;

  tareas: Tareas[ ] = [ ];

  listaTarea: any

  categorias: Record<string, Tareas[]> = {};

  constructor(private firebaseTareas: FirebaseTareasService, 
    private router: Router, 
    private tareasService: NotasServiceService, private cdr: ChangeDetectorRef) {
      
    this.tareas = tareasService.getTareas();

    this.listaTarea= this.firebaseTareas.getAll();

    
  }

  ngOnInit(): void {
    this.firebaseTareas.getAll().subscribe((tareas: Tareas[]) => {
      this.categorias = this.groupTareasByEtiqueta(tareas);
    });
  }

  //Metodo para actualizar las categorias
  goEditar(tarea: Tareas){
    console.log("editando", tarea);
  
    let params: NavigationExtras = {
      queryParams: {
        tarea: tarea
      }
    }
  
    this.router.navigate(['/pages/inicio'], params)
  };
  
  //Metdodo para eliminar las tareas
  async eliminarTareaFire(uid: string | undefined) {
    try {
      if (uid !== undefined) {
        // Mostrar confirmación antes de eliminar
        const confirmacion = window.confirm('¿Estás seguro que quieres eliminar esta tarea?');
        
        if (confirmacion) {
          // Si el usuario confirma, proceder con la eliminación
          await this.firebaseTareas.eliminartarea(uid);
          console.log('Tarea eliminada correctamente de Firebase');
  
          // Actualizar la lista de tareas después de eliminar
          this.firebaseTareas.getAll().subscribe((tareas: Tareas[]) => {
            this.categorias = this.groupTareasByEtiqueta(tareas);
          });
        } else {
          console.log('Operación de eliminación cancelada por el usuario.');
        }
      } else {
        console.error('El uid de la tarea es undefined.');
      }
    } catch (error) {
      console.error('Error al eliminar la tarea de Firebase', error);
    }
  }
  
//Metodo para grupar las tareas por categorias
  groupTareasByEtiqueta(tareas: Tareas[]): Record<string, Tareas[]> {
    return tareas.reduce((result: Record<string, Tareas[]>, tarea: Tareas) => {
      // Utiliza una etiqueta predeterminada si la etiqueta es undefined o null
      const etiqueta = tarea.etiqueta || 'Sin Etiqueta';
  
      // Verifica si la etiqueta ya existe en el resultado antes de acceder a ella
      if (!result.hasOwnProperty(etiqueta)) {
        result[etiqueta] = [];
      }
  
      result[etiqueta].push(tarea);
      return result;
    }, {});
  }

}
