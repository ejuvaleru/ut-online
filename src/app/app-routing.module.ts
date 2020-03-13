import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasesEnVivoComponent } from './pages/clases-en-vivo/clases-en-vivo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { StreamComponent } from './pages/stream/stream.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
