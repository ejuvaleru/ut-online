import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  subjectsCollectionLive = [
    {
      id: 'matematicas', name: 'Matemáticas', image: 'https://randallschool.com/wp-content/uploads/2017/04/shutterstock_172115969.jpg',
      teacher: 'Laison', date: '20/03/2020', video: '/assets/videos/Fernando_Herrera.mp4',
      abstract: 'Resolviendo preguntas de matemáticas'
    },
    {
      id: 'programacion', name: 'Programación Estructurada',
      image: 'https://www.ed2go.com/binaries/content/gallery/ed2go/products/16308.jpg',
      teacher: 'Mayra F.', date: '20/03/2020', video: '/assets/videos/Fernando_Herrera.mp4',
      abstract: 'Resolviendo preguntas de Programación estructurada'
    },
    {
      id: 'calidad', name: 'Sistemas de calidad en TI',
      // tslint:disable-next-line:max-line-length
      image: 'https://lh4.googleusercontent.com/proxy/f9OpUJ1i3oeRwo7tONvJoqJGy19JRm8K1L2ry0tSb6i3DW1XG2T2KL0eTAPX3ZEEsBGFZo6IKy-qqS29FOWvHZOWkAIJ-EV4cvWBFBbdjl1-1SoWRJK1kJUYvg',
      teacher: 'Luis C.', date: '20/03/2020', video: '/assets/videos/Fernando_Herrera.mp4',
      abstract: 'Resolviendo preguntas de Sistemas de calidad en TI'
    },
    {
      id: 'pot', name: 'POT', image: 'https://neetwork.com/wp-content/uploads/2018/07/administraci%C3%B3n-del-tiempo.png',
      teacher: 'Preza', date: '20/03/2020', video: '/assets/videos/Fernando_Herrera.mp4',
      abstract: 'Resolviendo preguntas de POT'
    },
    {
      id: 'ingles', name: 'Inglés',
      image: 'https://commongroundinternational.com/wp-content/uploads/2019/05/Simple-Continuous-and-Perfect-Tenses-in-English.jpg',
      teacher: 'Neil M.', date: '20/03/2020', video: '/assets/videos/Fernando_Herrera.mp4',
      abstract: 'Resolviendo preguntas de Inglés'
    }
  ];

  subjectsCollectionNext = [
    {
      id: 'administracion', name: 'Administración de proyectos',
      image: 'https://fundacioncarlosslim.org/wp-content/uploads/2018/04/project.jpg',
      teacher: 'Gabriel', date: '24/03/2020', hora: '07:00'
    },
    {
      id: 'poo', name: 'P.O.O.', image: 'https://i.udemycdn.com/course/750x422/965162_d7a5_2.jpg',
      teacher: 'Mayra F.', date: '21/03/2020', hora: '13:00'
    },
    {
      id: 'ciberseguridad', name: 'Cyberseguridad',
      image: 'https://d1p2xdir0176pq.cloudfront.net/wp-content/uploads/cybersecurity-750x450.jpg',
      teacher: 'Luis V.', date: '25/03/2020', hora: '09:00'
    },
    {
      id: 'ofimatica', name: 'Ofimática', image: 'https://www.softzone.es/app/uploads/2016/10/Logo-OnlyOffice.png',
      teacher: 'Lili', date: '22/03/2020', hora: '18:00'
    },
    {
      id: 'android', name: 'Android',
      // tslint:disable-next-line:max-line-length
      image: 'https://gestion.pe/resizer/OL8B8rU7xZHM6fBq18-ndIG7O0Q=/980x528/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/BF3R45U2RRCGFHPK4O3LKCJXVA.jpg',
      teacher: 'Rafael V.', date: '23/03/2020', hora: '20:00'
    }
  ];

  cursos = [
    {
      id: 'matematicas', temas: [{ nombre: 'Suma de Fracciones', video: '/assets/videos/julioProfe.mp4' },
      { nombre: 'Calculo diferencial I', video: '' },
      { nombre: 'Calculo Integral I', video: '' }],
    },
    {
      id: 'programacion', temas: [{ nombre: 'Logíca', video: '' },
      { nombre: 'Programación Orientada a objetos', video: '' },
      { nombre: 'CRUD', video: '' }],
    },
    {
      id: 'calidad', temas: [{ nombre: 'Logíca', video: '' },
      { nombre: 'Programación Orientada a objetos', video: '' },
      { nombre: 'CRUD', video: '' }],
    },
    {
      id: 'pot', temas: [{ nombre: 'Logíca', video: '' },
      { nombre: 'Programación Orientada a objetos', video: '' },
      { nombre: 'CRUD', video: '' }],
    },
    {
      id: 'ingles', temas: [{ nombre: 'Logíca', video: '' },
      { nombre: 'Programación Orientada a objetos', video: '' },
      { nombre: 'CRUD', video: '' }],
    },
  ];

  constructor() { }

  getSubjectsLive(): Array<any> {
    return this.subjectsCollectionLive;
  }

  getSubjectsNext(): Array<any> {
    return this.subjectsCollectionNext;
  }

  getSubjectByID(id) {
    return this.subjectsCollectionLive.find(s => s.id === id);
  }

  getCursos(): Array<any> {
    return this.cursos;
  }

  getCursoById(id) {
    return this.cursos.find(s => s.id === id);
  }
}
