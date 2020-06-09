import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users = [
    {
      userName: 'Luis Enrique', password: '123456', schoolId: '17391074', group: 'ITIC92',
      carrera: 'Ingeniería en Tecnologías de la Información y Comunicación',
      edificio: 'H-H120', cuatrimestre: 'Noveno cuatrimestre', tutor: 'Neil Miller',
      isAdmin: false,
      isStudent: true,
      isTeacher: false,
      profilePic:'https://i.dlpng.com/static/png/6646535_preview.png'
    },
    {
      userName: 'Valeria Alejandra', password: '123456', schoolId: '17391012', group: 'ITIC92',
      carrera: 'Ingeniería en Tecnologías de la Información y Comunicación',
      edificio: 'H-H120', cuatrimestre: 'Noveno cuatrimestre', tutor: 'Neil Miller',
      isAdmin: false,
      isStudent: true,
      isTeacher: false,
      profilePic:'https://ps.w.org/ultimate-member/assets/icon-256x256.png?rev=2143339'
    },
    {
      userName: 'Andrea', password: '123456', schoolId: '17391000', group: 'ITIC92',
      carrera: 'Ingeniería en Tecnologías de la Información y Comunicación',
      edificio: 'H-H120', cuatrimestre: 'Noveno cuatrimestre', tutor: 'Neil Miller',
      isAdmin: false,
      isStudent: true,
      isTeacher: false,
      profilePic:'https://ps.w.org/ultimate-member/assets/icon-256x256.png?rev=2143339'
    },
    {
      userName: 'Luis Chavez', password: '123456', schoolId: '55554444',
      area: 'Ingeniería en Tecnologías de la Información y Comunicación',
      edificio: 'H',
      profesorType: 'PA',
      isAdmin: false,
      isStudent: false,
      isTeacher: true,
      profilePic:'https://www.shareicon.net/data/512x512/2016/08/18/813864_people_512x512.png'
    },
    {
      userName: 'Erendira', password: '123456', schoolId: 'ABC12345',
      area: 'Ingeniería en Tecnologías de la Información y Comunicación',
      edificio: 'H',
      isAdmin: true,
      isStudent: false,
      isTeacher: false,
      profilePic:'https://www.netclipart.com/pp/m/162-1622905_hd-admin-user-icon-free-human-icon-png.png'
    },
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
    // console.log(id, pass);
    const loggedUser = this.users.find(u => u.password == pass && u.schoolId == id);
    console.log(loggedUser);
    if (loggedUser) {
      localStorage.setItem('usuario', JSON.stringify(loggedUser));
      return { loggedUser, message: 'Inicio de sesión exitoso.', code: 200 };
    } else {
      return { loggedUser, message: 'Usuario o contraseña incorrectos.', code: 400 };
    }
  }

  getTypeOfUser(id: String, pass) : String {
    if (id.includes('1739')) {
      this.users.find(u => u.password == pass && u.schoolId == id);
      console.log('STUDENT');
      return 'isStudent';
    } else if (id.includes('5555')) {
      this.users.find(u => u.password == pass && u.schoolId == id);
      console.log('TEACHER');
      return 'isTeacher';
    } else if (id.includes('ABC')) {
      this.users.find(u => u.password == pass && u.schoolId == id);
      console.log('ADMIN');
      return 'isAdmin';
    }
  }

}
