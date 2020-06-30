import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  profesorID = '';

  isAdding = false;
  isEditing = false;

  formProfesor: FormGroup;

  profesores = [];

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.setUpForm();
    this.afs
      .collection("profesores")
      .valueChanges()
      .subscribe((profesores) => {
        this.profesores = [];
        profesores.forEach((element) => {
          this.profesores.push(element);
        });
      });
  }

  // Setting up the form
  setUpForm() {
    this.formProfesor = new FormGroup({
      nombre: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      matricula: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    let nombre = this.formProfesor.value.nombre;
    let matricula = this.formProfesor.value.matricula;

    this.afs.collection("profesores").add({ nombre, matricula }).then(res => {
      this.afs.collection("profesores").doc(res.id).set({ id: res.id }, { merge: true });
    }).then(() => {
      this.formProfesor.reset();
      this.isAddingTeacher();
    });
  }

  onUpdate() {
    let nombre = this.formProfesor.value.nombre;
    let matricula = this.formProfesor.value.matricula;

    if (this.profesorID) {
      this.afs.collection("profesores").doc(this.profesorID).update({ nombre, matricula }).then(() => {
        this.isEditingTeacher();
        this.profesorID = null;
        this.formProfesor.reset();
      });
    }
  }

  onEditar(profesor) {

    this.profesorID = profesor.id;
    this.isEditingTeacher();
    this.formProfesor = new FormGroup({
      nombre: new FormControl(profesor.nombre, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      matricula: new FormControl(profesor.matricula, {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  eliminarProfesor(id) {
    this.afs.collection("profesores").doc(id).delete();
  }

  // Métodos de apoyo
  isAddingTeacher() {
    if (this.isEditing) {
      this.isEditingTeacher();
      this.setUpForm();
      this.isAdding = !this.isAdding;
    } else {
      this.isAdding = !this.isAdding;
    }
  }

  isEditingTeacher() {
    if(this.isEditing){
      this.setUpForm();
    }
    this.isEditing = !this.isEditing;
  }

}
