import { Component, OnInit } from "@angular/core";
import { Materia } from "src/app/shared/models/materia.model";
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from "@angular/common";

@Component({
  selector: "app-materias-alumno-detalles",
  templateUrl: "./materias-alumno-detalles.component.html",
  styleUrls: ["./materias-alumno-detalles.component.scss"],
})
export class MateriasAlumnoDetallesComponent implements OnInit {
  public id: string;
  public materia: Materia = {} as Materia;

  public tareas: any[];
  public proyectos: any[];

  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer,
    private _location: Location,
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.afs
      .collection("materias")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.materia = res;
        console.log(this.materia);
      });


      this.afs
      .collection("proyectos", (ref) => ref.where("materiaID", "==", this.id))
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.proyectos = [];
        res.forEach((t) => {
          this.proyectos.push(t);
        });
      });

    this.afs
      .collection("tareas", (ref) => ref.where("materiaID", "==", this.id))
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.tareas = [];
        res.forEach((t) => {
          this.tareas.push(t);
        });
      });
  }



  backClicked() {
    this._location.back();
  }
}
