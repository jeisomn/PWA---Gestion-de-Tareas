import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GestionTareas';

  paginas = [
    { enlace: 'Inicio', path: 'pages/inicio' , imagen: 'https://img.freepik.com/fotos-premium/representacion-3d-ilustracion-3d-gestion-tareas-portapapeles-lista-verificacion-tareas-pendientes-sobre-fondo-blanco-concepto-icono-documentos_640106-445.jpg' },
    { enlace: 'Listado', path: 'pages/listado' , imagen: 'https://media.istockphoto.com/id/1384700413/es/vector/lista-de-tareas-con-el-portapapeles.jpg?s=612x612&w=0&k=20&c=vJUIUFD0R69a-azcNfFxyuNUtmllQzz48Ky2Um7OC9c='}
  ];
  
}
