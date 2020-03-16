import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

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
  ];

  constructor() { }

  getSubjects(): Array<any> {
    return this.subjectsCollection;
  }

  getSubjectByID(id) {
    return this.subjectsCollection.find(s => s.id === id);
  }
}
