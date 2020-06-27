import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-iniciar-stream',
  templateUrl: './iniciar-stream.component.html',
  styleUrls: ['./iniciar-stream.component.scss']
})
export class IniciarStreamComponent implements OnInit {
  materias = [];
  grupos = [];
  profesorID: string = '';

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(res => {
      this.profesorID = res.uid;
      this.afs.collection('materias', ref =>ref.where('profesorId', '==', this.profesorID) ).valueChanges()
      .subscribe((res: any) => {
        this.materias = [];
        console.log(res)
        res.forEach(e => {
          this.materias.push(e);
        });
      }
      );
    });
  }

}
