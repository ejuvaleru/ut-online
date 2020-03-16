import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users = [
    { userName: 'Luis Enrique', password: '123456', schoolId: 17391074, group: 'ITIC82' },
    { userName: 'Valeria Alejandra', password: '123456', schoolId: 17391012, group: 'ITIC82' },
  ];

  isLogged = new BehaviorSubject<boolean>(this.hasToken());

  constructor() { }

  onLogin() {
    this.isLogged.next(true);
  }

  onLogout() {
    this.isLogged.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('isLogin');
  }

  logIn(id, pass) {
    console.log(id, pass);
    let loggedUser = this.users.find(u => u.password === pass && u.schoolId == id);
    console.log(loggedUser);
    if (loggedUser) {
      localStorage.setItem('estudiante', JSON.stringify(loggedUser));
      return { loggedUser, message: 'Inicio de sesión exitoso.', code: 200 };
    } else {
      return { loggedUser, message: 'Usuario o contraseña incorrectos.', code: 400 }
    }
  }
}
