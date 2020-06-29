import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClasesEnVivoComponent } from './pages/clases-en-vivo/clases-en-vivo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { StreamComponent } from './pages/stream/stream.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { ClasesProgramadasComponent } from './pages/clases-programadas/clases-programadas.component';
import { VideoGrabadoComponent } from './pages/video-grabado/video-grabado.component';
import { LandingComponent } from './pages/landing/landing.component';

// Firebase
import {AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";

import { environment } from 'src/environments/environment';
import { MateriasComponent } from './pages/profesor/materias/materias.component';
import { MateriaDetallesComponent } from './pages/profesor/materia-detalles/materia-detalles.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { SubirClaseComponent } from './pages/profesor/subir-clase/subir-clase.component';
import { TareaDetallesComponent } from './pages/profesor/tarea-detalles/tarea-detalles.component';
import { ProyectoDetallesComponent } from './pages/profesor/proyecto-detalles/proyecto-detalles.component';
import { CalificarComponent } from './pages/profesor/calificar/calificar.component';
import { IniciarStreamComponent } from './pages/profesor/iniciar-stream/iniciar-stream.component';
import { MateriasAlumnoComponent } from './pages/alumno/materias-alumno/materias-alumno.component';
import { MateriasAlumnoDetallesComponent } from './pages/alumno/materias-alumno-detalles/materias-alumno-detalles.component';
import { TareaDetallesAlumnoComponent } from './pages/alumno/tarea-detalles-alumno/tarea-detalles-alumno.component';
import { ProyectoDetallesAlumnoComponent } from './pages/alumno/proyecto-detalles-alumno/proyecto-detalles-alumno.component';
import { GruposComponent } from './pages/admin/grupos/grupos.component';
import { AlumnosComponent } from './pages/admin/alumnos/alumnos.component';
import { ProfesoresComponent } from './pages/admin/profesores/profesores.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClasesEnVivoComponent,
    NavbarComponent,
    LoginComponent,
    StreamComponent,
    FaqsComponent,
    ClasesProgramadasComponent,
    VideoGrabadoComponent,
    LandingComponent,
    MateriasComponent,
    MateriaDetallesComponent,
    FileUploadComponent,
    SubirClaseComponent,
    TareaDetallesComponent,
    ProyectoDetallesComponent,
    CalificarComponent,
    IniciarStreamComponent,
    MateriasAlumnoComponent,
    MateriasAlumnoDetallesComponent,
    TareaDetallesAlumnoComponent,
    ProyectoDetallesAlumnoComponent,
    GruposComponent,
    AlumnosComponent,
    ProfesoresComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
