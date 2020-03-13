import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClasesEnVivoComponent } from './pages/clases-en-vivo/clases-en-vivo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { StreamComponent } from './pages/stream/stream.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClasesEnVivoComponent,
    NavbarComponent,
    LoginComponent,
    StreamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
