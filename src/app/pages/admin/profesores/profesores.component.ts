import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {
  profesores = [];

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {

    this.afs
    .collection("profesores")
    .valueChanges()
    .subscribe((profesores) => {
      this.profesores = [];
      profesores.forEach((element) => {
        this.profesores.push(element);
      });
    });
  }

}
