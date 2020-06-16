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
import { SubirClaseComponent } from './pages/profesor/subir-clase/subir-clase.component';


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
    SubirClaseComponent
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
