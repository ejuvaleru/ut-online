import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-subir-clase",
  templateUrl: "./subir-clase.component.html",
  styleUrls: ["./subir-clase.component.scss"],
})
export class SubirClaseComponent implements OnInit {
  clasesGrabadas = [];
  materiasParaElForm = [];
  formSubirClase: FormGroup;
  materia: any;

  isAdding = false;
  isEditing = false;

  idVideo = '';

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.setUpForm();
    this.getVideosGrabados();
    this.getMaterias();
  }

  setUpForm() {
    this.formSubirClase = new FormGroup({
      titulo: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      enlace: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      materia: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    let titulo = this.formSubirClase.value.titulo;
    let enlace = this.formSubirClase.value.enlace;
    let idMateria = this.formSubirClase.value.materia;
    console.log(titulo, enlace);
    this.afs.collection("clases-grabadas").add({ titulo, enlace, idMateria }).then(res => {
      this.afs.collection("clases-grabadas").doc(res.id).set({ id: res.id }, { merge: true });
    }).then(() => {
      this.formSubirClase.reset();
      this.agregarVideo();
    });
  }

  onUpdate() {
    let titulo = this.formSubirClase.value.titulo;
    let enlace = this.formSubirClase.value.enlace;
    let idMateria = this.formSubirClase.value.materia;

    if (this.idVideo) {
      this.afs.collection("clases-grabadas").doc(this.idVideo).update({ titulo, enlace, idMateria }).then(() => {
        this.editarVideo();
        this.idVideo = null;
        this.formSubirClase.reset();
      });
    }
  }

  onEditar(objeto) {

    this.idVideo = objeto.video.id;
    this.editarVideo();
    this.formSubirClase = new FormGroup({
      titulo: new FormControl(objeto.video.titulo, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      enlace: new FormControl(objeto.video.enlace, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      materia: new FormControl(objeto.materia.nombre, {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  eliminarVideo(id) {
    this.afs.collection("clases-grabadas").doc(id).delete();
  }

  getVideosGrabados() {
    this.afs
      .collection("clases-grabadas")
      .valueChanges()
      .subscribe((res: any) => {
        this.clasesGrabadas = [];
        res.forEach((video: any) => {
          this.afs
            .collection("materias")
            .doc(video.idMateria)
            .valueChanges()
            .subscribe((materia: any) => {
              console.log(res);
              this.clasesGrabadas.push({ video, materia } as Object);
            });
        });
      });
  }

  getMaterias() {
    this.afs
      .collection("materias")
      .valueChanges()
      .subscribe((res: any) => {
        this.materiasParaElForm = res;
      });
  }

  getMateria(id) {
    this.afs
      .collection("materias")
      .doc(id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.materia = res.nombre;
        //return res;
      });
  }

  // Métodos de apoyo
  agregarVideo() {
    if(this.isEditing){
      this.editarVideo();
      this.setUpForm();
      this.isAdding = !this.isAdding;
    } else {
      this.isAdding = !this.isAdding;
    }
  }

  editarVideo() {
    this.isEditing = !this.isEditing;
  }
}
