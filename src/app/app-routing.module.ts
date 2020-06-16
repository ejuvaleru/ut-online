import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasesEnVivoComponent } from './pages/clases-en-vivo/clases-en-vivo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { StreamComponent } from './pages/stream/stream.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { ClasesProgramadasComponent } from './pages/clases-programadas/clases-programadas.component';
import { VideoGrabadoComponent } from './pages/video-grabado/video-grabado.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MateriasComponent } from './pages/profesor/materias/materias.component';
import { MateriaDetallesComponent } from './pages/profesor/materia-detalles/materia-detalles.component';
import { SubirClaseComponent } from './pages/profesor/subir-clase/subir-clase.component';
import { TareaDetallesComponent } from './pages/profesor/tarea-detalles/tarea-detalles.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'clases-en-vivo', children: [
      { path: '', component: ClasesEnVivoComponent },
      { path: ':id', component: StreamComponent }
    ]
  },
  { path: 'materias', children: [
      {path: '', component: MateriasComponent},
      {path: ':id', component: MateriaDetallesComponent}
    ]
  },
  {
    path: 'tarea/:id', component: TareaDetallesComponent
  },
  { path: 'subir-clase', component: SubirClaseComponent },
  { path: 'educacion_a_distancia', component: LoginComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'calendario', component: DashboardComponent },
  {
    path: 'clases-grabadas', children: [
      { path: '', component: ClasesProgramadasComponent },
      { path: ':id', component: VideoGrabadoComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
