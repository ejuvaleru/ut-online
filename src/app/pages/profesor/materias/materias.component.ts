import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  materias = [];
  grupos = [];
  profesorID: string = '';
  profesorReference: ProfesorI;

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      this.profesorID = res.uid;
      this.afs.collection('usuarios').doc(this.profesorID).valueChanges().subscribe((res: any) => {
        res.grupoID.forEach(e => {
          this.getGruposDelProfesor(e);
          console.log(this.grupos);
        });
        res.materiaID.forEach(e => {
          this.getMateriasDelProfesor(e);
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

export class ProfesorI {
  materiaID: [];
  grupoID: [];
  userName: string;
}