import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { DomSanitizer } from "@angular/platform-browser";
import { Location } from "@angular/common";
import { Tarea } from "src/app/shared/models/tarea.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Entrega } from "src/app/shared/models/entrega.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { Alumno } from "src/app/shared/models/alumno.model";
import * as firebase from 'firebase';
@Component({
  selector: "app-tarea-detalles-alumno",
  templateUrl: "./tarea-detalles-alumno.component.html",
  styleUrls: ["./tarea-detalles-alumno.component.scss"],
})
export class TareaDetallesAlumnoComponent implements OnInit {
  public tarea: Tarea = {} as Tarea;
  public id: string;
  formTarea: FormGroup;
  public coleccion = {
    nombre: "entregas",
  };
  entrega = {} as Entrega;
  idAlumno = "";
  alumno = {} as Alumno;

  entregas = [];

  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer,
    private _location: Location,
    private toast: ToastrService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.setUpFormTarea();
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.afs
      .collection("tareas")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.tarea = res;
      });

    this.afAuth.authState.subscribe((res) => {
      this.idAlumno = res.uid;

      this.afs
        .collection("alumnos")
        .doc(this.idAlumno)
        .valueChanges()
        .subscribe((res) => {
          this.alumno = res as Alumno;
          console.log(this.id + "TareaId");
          console.log(this.idAlumno);
        });
      this.afs
        .collection("entregas", (ref) =>
          ref
            .where("tareaID", "==", this.id)
            .where("alumnoId", "==", this.idAlumno)
        )
        .valueChanges()
        .subscribe((res: any) => {
          console.log(res , 'Esta es la entrega');

          if(res.legth < 1) {
            this.entrega.id = this.afs.createId();
            this.afs.collection("entregas").doc(this.entrega.id).set({
              id: this.entrega.id,
            });
            console.log("Estoy entrando al IF");
          } else {
            res.forEach((element) => {
              this.entregas.push(element as Entrega);
            });
            this.entrega = this.entregas[0];
            this.formTarea.patchValue({
              comentarios: this.entrega.comentarios,
            });
          }
         
        

        });
    });
  }

  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  backClicked() {
    this._location.back();
  }

  setUpFormTarea() {
    this.formTarea = new FormGroup({
      comentarios: new FormControl(null, {
        updateOn: "change",
      }),
    });
  }

  onSubmitTarea() {
    this.afs
      .collection("entregas")
      .doc(this.entrega.id)
      .update({
        alumno: this.alumno,
        tareaID: this.id,
        comentarios: this.formTarea.value.comentarios,
        calificacion: '',
        alumnoId: this.alumno.id
      })
      .then((res) => {
        this.afs.collection('alumnos').doc(this.alumno.id).update({
          entregas: firebase.firestore.FieldValue.arrayRemove(this.entrega.id)
        })
        this.toast.success("Registro con éxito", "Mensaje", {
          positionClass: "toast-bottom-center",
          timeOut: 3000,
        });
      });
  }
}
