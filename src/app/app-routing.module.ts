import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasesEnVivoComponent } from './pages/clases-en-vivo/clases-en-vivo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { StreamComponent } from './pages/stream/stream.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { ClasesProgramadasComponent } from './pages/clases-programadas/clases-programadas.component';
import { VideoGrabadoComponent } from './pages/video-grabado/video-grabado.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'clases-en-vivo', children: [
      { path: '', component: ClasesEnVivoComponent },
      { path: ':id', component: StreamComponent }
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'faqs', component: FaqsComponent },
  {
    path: 'clases-grabadas', children: [
      { path: '', component: ClasesProgramadasComponent},
      {path: ':id', component: VideoGrabadoComponent}
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
