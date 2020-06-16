import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-subir-clase',
  templateUrl: './subir-clase.component.html',
  styleUrls: ['./subir-clase.component.scss']
})
export class SubirClaseComponent implements OnInit {

  clasesGrabadas = [];
  materiasParaElForm = [];
  formSubirClase: FormGroup;
  materia: any;

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.setUpForm();
    this.getVideosGrabados();
    this.getMaterias();
  }

  setUpForm() {
    this.formSubirClase = new FormGroup({
      titulo: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      enlace: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      materia: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
    });
  }

  onSubmit() {
    let titulo = this.formSubirClase.value.titulo;
    let enlace = this.formSubirClase.value.enlace;
    let idMateria = this.formSubirClase.value.materia;
    console.log(titulo, enlace);
    this.afs.collection('clases-grabadas').add({ titulo, enlace, idMateria });
  }

  getVideosGrabados() {
    this.afs.collection('clases-grabadas').valueChanges().subscribe((res: any) => {
      this.clasesGrabadas = res;
      console.log(res);
    });
  }

  getMaterias() {
    this.afs.collection('materias').valueChanges().subscribe((res: any) => {
      this.materiasParaElForm = res;
    });
  }

  getMateria(id) {
    this.afs.collection('materias').doc(id).valueChanges().subscribe((res: any) => {
      console.log(res);
      this.materia = res.nombre;
    });
  }


}
