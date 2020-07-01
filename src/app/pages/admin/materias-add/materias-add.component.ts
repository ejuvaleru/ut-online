import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { Grupo } from "src/app/shared/models/grupo.model";
import { Location } from "@angular/common";
import { Materia } from "src/app/shared/models/materia.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as firebase from "firebase";

@Component({
  selector: "app-materias-add",
  templateUrl: "./materias-add.component.html",
  styleUrls: ["./materias-add.component.scss"],
})
export class MateriasAddComponent implements OnInit {
  public id: string;
  grupo = {} as Grupo;
  materias = [];
  materiasSelect = [];
  formMateria: FormGroup;

  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer,
    private _location: Location,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.setUpForm();
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.afs
      .collection("grupos")
      .doc(this.id)
      .valueChanges()
      .subscribe((res) => {
        this.grupo = res as Grupo;
        this.materias = [];
        this.grupo.materias.forEach((m) => {
          this.afs
            .collection("materias")
            .doc(m)
            .valueChanges()
            .subscribe((materia: Materia) => {
              this.materias.push(materia);
            });
          console.log(this.materias);
        });
      });

    this.afs
      .collection("materias")
      .valueChanges()
      .subscribe((res: Materia[]) => {
        this.materiasSelect = res;
      });
  }

  setUpForm() {
    this.formMateria = new FormGroup({
      materiaId: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      dia1: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      hora1: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      dia2: new FormControl(null, {
        updateOn: "change",
      }),
      hora2: new FormControl(null, {
        updateOn: "change",
      }),
      dia3: new FormControl(null, {
        updateOn: "change",
      }),
      hora3: new FormControl(null, {
        updateOn: "change",
      }),
    });
  }

  onSubmit() {
    this.afs
      .collection("grupos")
      .doc(this.id)
      .update({
        materias: firebase.firestore.FieldValue.arrayUnion(
          this.formMateria.value.materiaId
        ),
      });

    const horario1 = {
      dia: this.formMateria.value.dia1,
      grupo: this.grupo.nombre,
      hora: this.formMateria.value.hora1,
    };

    const horario2 = {
      dia: this.formMateria.value.dia2,
      grupo: this.grupo.nombre,
      hora: this.formMateria.value.hora2,
    };

    const horario3 = {
      dia: this.formMateria.value.dia3,
      grupo: this.grupo.nombre,
      hora: this.formMateria.value.hora3,
    };

    this.afs
      .collection("materias")
      .doc(this.formMateria.value.materiaId)
      .update({
        horario: firebase.firestore.FieldValue.arrayUnion(horario1),
      });

    this.afs
      .collection("materias")
      .doc(this.formMateria.value.materiaId)
      .update({
        horario: firebase.firestore.FieldValue.arrayUnion(horario2),
      });

    this.afs
      .collection("materias")
      .doc(this.formMateria.value.materiaId)
      .update({
        horario: firebase.firestore.FieldValue.arrayUnion(horario3),
      });

    this.formMateria.reset();

    this.toast.success("Registro exitoso", "Mensaje", {
      positionClass: "toast-bottom-center",
      timeOut: 3000,
    });
  }

  deleteMateria(id) {
    this.afs
      .collection("grupos")
      .doc(this.id)
      .update({
        materias: firebase.firestore.FieldValue.arrayRemove(id),
      })
      .then(() => {
        this.toast.success("Eliminación exitosa", "Mensaje", {
          positionClass: "toast-bottom-center",
          timeOut: 3000,
        });
      });

    this.afs
      .collection("materias")
      .doc(id)
      .valueChanges()
      .subscribe((m: any) => {
        let horario = {};

        m.horario.forEach((h: any) => {
          if (h.grupo == this.grupo.nombre) {
            horario = h;
            this.afs
              .collection("materias")
              .doc(id)
              .update({
                horario: firebase.firestore.FieldValue.arrayRemove(horario),
              });
          }
        });
      });
  }
}
