import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  { path: '', redirectTo: 'pages/inicio', pathMatch: 'full' }, // Redirige al componente Inicio por defecto
  { path: 'pages/inicio', component: InicioComponent },
  { path: 'pages/listado', component: ListadoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
