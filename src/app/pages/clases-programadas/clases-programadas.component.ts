import { Component, OnInit } from "@angular/core";
import { SubjectService } from "src/app/shared/subject.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Alumno } from "src/app/shared/models/alumno.model";
import { Materia } from "src/app/shared/models/materia.model";

@Component({
  selector: "app-clases-programadas",
  templateUrl: "./clases-programadas.component.html",
  styleUrls: ["./clases-programadas.component.scss"],
})
export class ClasesProgramadasComponent implements OnInit {
  subjectsLive = [];
  subjectsNext = [];
  alumnoID: string = "";
  alumno: Alumno = {} as Alumno;
  materias = [];

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((res) => {
      this.alumnoID = res.uid;
      this.afs
        .collection("alumnos")
        .doc(res.uid)
        .valueChanges()
        .subscribe((res: Alumno) => {
          res.materias.forEach((materia: Materia) => {
            console.log(materia);

            this.afs
              .collection("materias")
              .doc(materia.id)
              .valueChanges()
              .subscribe((materia: Materia) => {
                this.materias.push(materia);
                console.log(this.materias + " MATERIAS");
              });
          });
        });
    });
  }
}
