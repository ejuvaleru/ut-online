import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

<<<<<<< HEAD
  subjectsCollectionLive = [
    { id: 'matematicas', name: 'Matemáticas', image: 'https://randallschool.com/wp-content/uploads/2017/04/shutterstock_172115969.jpg', teacher: 'Laison', date: '20/03/2020' },
    { id: 'programacion', name: 'Programación Estructurada', image: 'https://www.ed2go.com/binaries/content/gallery/ed2go/products/16308.jpg', teacher: 'Mayra F.', date: '20/03/2020' },
    { id: 'calidad', name: 'Sistema de calidad en TI', image: 'https://lh4.googleusercontent.com/proxy/f9OpUJ1i3oeRwo7tONvJoqJGy19JRm8K1L2ry0tSb6i3DW1XG2T2KL0eTAPX3ZEEsBGFZo6IKy-qqS29FOWvHZOWkAIJ-EV4cvWBFBbdjl1-1SoWRJK1kJUYvg', teacher: 'Luis C.', date: '20/03/2020' },
    { id: 'pot', name: 'POT', image: 'https://neetwork.com/wp-content/uploads/2018/07/administraci%C3%B3n-del-tiempo.png', teacher: 'Preza', date: '20/03/2020' },
    { id: 'ingles', name: 'Inglés', image: 'https://commongroundinternational.com/wp-content/uploads/2019/05/Simple-Continuous-and-Perfect-Tenses-in-English.jpg', teacher: 'Neil M.', date: '20/03/2020' }
=======
  subjectsCollection = [
    { id: 'matematicas', name: 'Matemáticas',
     image: 'https://randallschool.com/wp-content/uploads/2017/04/shutterstock_172115969.jpg',
     teacher: 'Laison', date: '20/03/2020' },
    { id: 'programacion', name: 'Programación Estructurada',
     image: 'https://www.ed2go.com/binaries/content/gallery/ed2go/products/16308.jpg',
     teacher: 'Mayra F.', date: '20/03/2020' },
    { id: 'calidad', name: 'Sistema de calidad en TI',
    // tslint:disable-next-line:max-line-length
    image: 'https://lh4.googleusercontent.com/proxy/f9OpUJ1i3oeRwo7tONvJoqJGy19JRm8K1L2ry0tSb6i3DW1XG2T2KL0eTAPX3ZEEsBGFZo6IKy-qqS29FOWvHZOWkAIJ-EV4cvWBFBbdjl1-1SoWRJK1kJUYvg',
    teacher: 'Luis C.', date: '20/03/2020' },
    { id: 'pot', name: 'POT',
    image: 'https://neetwork.com/wp-content/uploads/2018/07/administraci%C3%B3n-del-tiempo.png',
    teacher: 'Preza', date: '20/03/2020' },
    { id: 'ingles', name: 'Inglés',
    image: 'https://commongroundinternational.com/wp-content/uploads/2019/05/Simple-Continuous-and-Perfect-Tenses-in-English.jpg',
    teacher: 'Neil M.', date: '20/03/2020' }
>>>>>>> 80d2eeeb16dc64e5dc3cb80338dad85be8f28227
  ];

  subjectsCollectionNext = [
    { id: 'administracion', name: 'Administración de proyectos', image: 'https://fundacioncarlosslim.org/wp-content/uploads/2018/04/project.jpg', teacher: 'Gabriel', date: '24/03/2020' },
    { id: 'poo', name: 'P.O.O.', image: 'https://i.udemycdn.com/course/750x422/965162_d7a5_2.jpg', teacher: 'Mayra F.', date: '21/03/2020' },
    { id: 'ciberseguridad', name: 'Cyberseguridad', image: 'https://d1p2xdir0176pq.cloudfront.net/wp-content/uploads/cybersecurity-750x450.jpg', teacher: 'Luis V.', date: '25/03/2020' },
    { id: 'ofimatica', name: 'Ofimática', image: 'https://www.softzone.es/app/uploads/2016/10/Logo-OnlyOffice.png', teacher: 'Lili', date: '22/03/2020' },
    { id: 'android', name: 'Android', image: 'https://gestion.pe/resizer/OL8B8rU7xZHM6fBq18-ndIG7O0Q=/980x528/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/BF3R45U2RRCGFHPK4O3LKCJXVA.jpg', teacher: 'Rafael V.', date: '23/03/2020' }
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
}
