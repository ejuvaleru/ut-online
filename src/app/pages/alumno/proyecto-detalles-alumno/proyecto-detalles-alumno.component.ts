import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Proyecto } from 'src/app/shared/models/proyecto.model';
import { FormGroup, FormControl } from '@angular/forms';
import { EntregaProyecto } from 'src/app/shared/models/entregaProyecto.model';
import { Alumno } from 'src/app/shared/models/alumno.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-proyecto-detalles-alumno',
  templateUrl: './proyecto-detalles-alumno.component.html',
  styleUrls: ['./proyecto-detalles-alumno.component.scss']
})
export class ProyectoDetallesAlumnoComponent implements OnInit {

  public proyecto: Proyecto = {} as Proyecto;
  public id: string;
  formProyecto: FormGroup;
  public coleccion = {
    nombre: "entregasProyecto",
  };
  entrega = {} as EntregaProyecto;
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
      .collection("proyectos")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.proyecto = res;
      });

    this.afAuth.authState.subscribe((res) => {
      this.idAlumno = res.uid;

      this.afs
        .collection("alumnos")
        .doc(this.idAlumno)
        .valueChanges()
        .subscribe((res) => {
          this.alumno = res as Alumno;
          console.log(this.alumno + "Alumno");
          console.log(this.idAlumno);
        });

      this.afs
        .collection("entregasProyecto", (ref) =>
          ref
            .where("proyectoID", "==", this.id)
            .where("alumno.id", "==", this.idAlumno)
        )
        .valueChanges()
        .subscribe((res: any) => {
          console.log(res);

          if(!res.value) {
            this.entrega.id = this.afs.createId();
            this.afs.collection("entregasProyecto").doc(this.entrega.id).set({
              id: this.entrega.id,
            });
            console.log("Estoy entrando al IF");
          } else {
            res.forEach((element) => {
              this.entregas.push(element as EntregaProyecto);
            });
            this.entrega = this.entregas[0];
            this.formProyecto.patchValue({
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
    this.formProyecto = new FormGroup({
      comentarios: new FormControl(null, {
        updateOn: "change",
      }),
    });
  }

  onSubmitProyecto() {
    this.afs
      .collection("entregasProyecto")
      .doc(this.entrega.id)
      .update({
        alumno: this.alumno,
        tareaID: this.id,
        comentarios: this.formProyecto.value.comentarios,
      })
      .then((res) => {
        this.toast.success("Regitro con éxito", "Mensaje", {
          positionClass: "toast-bottom-center",
          timeOut: 3000,
        });
      });
  }

}
