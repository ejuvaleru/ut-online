import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Profesor } from 'src/app/shared/models/profesor.model';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  materias = [];
  grupos = [];
  profesorID: string = '';
  profesorReference: Profesor;

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      this.profesorID = res.uid;
      this.afs.collection('materias', ref =>ref.where('profesorId', '==', this.profesorID) ).valueChanges()
      .subscribe((res: any) => {
        console.log(res)
        res.forEach(e => {
          this.materias.push(e);
        });
      }
      );
    });
  }

  async getGruposDelProfesor(idDocument: string) {
    await this.afs.collection('grupos').doc(idDocument).valueChanges().subscribe(res => {
      this.grupos.push(res);
    });
  }

  async getMateriasDelProfesor(idDocument: string) {
    await this.afs.collection('materias').doc(idDocument).valueChanges().subscribe(res => {
      this.materias.push(res);
    });
  }


}
