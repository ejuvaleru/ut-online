import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { Materia } from "src/app/shared/models/materia.model";
import { DomSanitizer } from "@angular/platform-browser";
import { Tarea } from "src/app/shared/models/tarea.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";

@Component({
  selector: "app-materia-detalles",
  templateUrl: "./materia-detalles.component.html",
  styleUrls: ["./materia-detalles.component.scss"],
})
export class MateriaDetallesComponent implements OnInit {
  public modal = false;
  public modalProyectos = false;
  public id: string;
  public materia: Materia = {} as Materia;
  public tareas: any[];
  public proyectos: any[];
  public coleccion = {
    nombre: "materias",
  };
  public active = true;
  formTarea: FormGroup;
  formProyecto: FormGroup;

  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.setUpFormTarea();
    this.setUpFormProyecto();

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

  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleModal() {
    this.modal = !this.modal;
  }

  toggleModalProyectos() {
    this.modalProyectos = !this.modalProyectos;
  }

  toggleTabs() {
    this.active = !this.active;
  }

  setUpFormTarea() {
    this.formTarea = new FormGroup({
      nombre: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      instrucciones: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      fechaEntrega: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  setUpFormProyecto() {
    this.formProyecto = new FormGroup({
      nombre: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      instrucciones: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      fechaEntrega: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  onSubmitTarea() {
    var fechaEntrega: Date;
    let nombre = this.formTarea.value.nombre;
    let instrucciones = this.formTarea.value.instrucciones;
    let materiaID = this.id;
    let id = this.afs.createId();
    fechaEntrega = new Date(this.formTarea.value.fechaEntrega);
    console.log(nombre, instrucciones, materiaID, fechaEntrega);
    this.afs
      .collection("tareas")
      .doc(id)
      .set({ id, nombre, instrucciones, materiaID, fechaEntrega });
    this.toggleModal();
  }

  onSubmitProyecto() {
    var fechaEntrega: Date;
    let nombre = this.formProyecto.value.nombre;
    let instrucciones = this.formProyecto.value.instrucciones;
    let materiaID = this.id;
    let id = this.afs.createId();
    fechaEntrega = new Date(this.formProyecto.value.fechaEntrega);
    console.log(nombre, instrucciones, materiaID, fechaEntrega);
    this.afs
      .collection("proyectos")
      .doc(id)
      .set({ id, nombre, instrucciones, materiaID, fechaEntrega });
    this.toggleModalProyectos();
  }
}
