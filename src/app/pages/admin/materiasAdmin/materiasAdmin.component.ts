import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from "@angular/common";
import swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { Materia } from 'src/app/shared/models/materia.model';

@Component({
  selector: 'app-materiasAdmin',
  templateUrl: './materiasAdmin.component.html',
  styleUrls: ['./materiasAdmin.component.scss']
})
export class MateriasAdminComponent implements OnInit {


  materiaID= '';

  isAdding = false;
  isEditing = false;

  formMateria: FormGroup;

  materias = [];
  profesores=[];
  grupos = [];

  constructor(private afs: AngularFirestore,     private toast: ToastrService) { }

  ngOnInit(): void {
    this.setUpForm();
    this.afs
      .collection("materias")
      .valueChanges()
      .subscribe((materias) => {
        this.materias = [];
        materias.forEach((element) => {
          this.materias.push(element);
        });
        console.log('materias');
      });

      this.afs
      .collection("profesores")
      .valueChanges()
      .subscribe((profesores) => {
        this.profesores = [];
        profesores.forEach((element) => {
          this.profesores.push(element);
        });
      });

      this.afs
      .collection("grupos")
      .valueChanges()
      .subscribe((grupos) => {
        this.grupos = [];
        grupos.forEach((element) => {
          this.grupos.push(element);
        });
      });
  }

  // Setting up the form
  setUpForm() {
    this.formMateria = new FormGroup({
      nombre: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      profesorId: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    let materia = {} as  Materia;
    materia.nombre = this.formMateria.value.nombre;
    materia.profesorId = this.formMateria.value.profesorId;
    materia.envivo = false; 
    materia.archivo = ''; 
  

    this.afs.collection("materias").add(materia).then(res => {
      this.afs.collection("materias").doc(res.id).set({ id: res.id }, { merge: true });
    }).then(() => {
      this.formMateria.reset();
      this.isAddingMateria();
      this.toast.success("Registro exitoso", "Mensaje", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    });
  }

  onUpdate() {
    let nombre = this.formMateria.value.nombre;
    let profesorId = this.formMateria.value.profesorId;

    if (this.materiaID) {
      this.afs.collection("materias").doc(this.materiaID).update({ nombre, profesorId }).then(() => {
        this.isEditingMateria();
        this.materiaID = null;
        this.formMateria.reset();
        this.toast.success("Actualizado correctamente", "Mensaje", {
          positionClass: "toast-bottom-center",
          timeOut: 3000,
        });
      });
    }
  }

  onEditar(materia) {

    this.materiaID = materia.id;
    this.isEditingMateria();
    this.formMateria = new FormGroup({
      nombre: new FormControl(materia.nombre, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      profesorId: new FormControl(materia.profesorId, {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }


  openAlert() {
    return swal.fire({
      title: "¿Estás seguro? ",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
  }

  deleteMateria(id) {
    this.openAlert().then((res) => {
      if (res.value) {
        this.afs
          .collection("materias")
          .doc(id)
          .delete()
          .then((res) => {
            this.toast.success("Eliminación exitosa", "Mensaje", {
              positionClass: "toast-bottom-center",
              timeOut: 3000,
            });
          })
          .catch((e) => {
            this.toast.error(e, "Algo salió mal", {
              positionClass: "toast-bottom-center",
              timeOut: 3000,
            });
          });
      }
    });
  }


  // Métodos de apoyo
  isAddingMateria() {
    if (this.isEditing) {
      this.isEditingMateria();
      this.setUpForm();
      this.isAdding = !this.isAdding;
    } else {
      this.isAdding = !this.isAdding;
    }
  }

  isEditingMateria() {
    if(this.isEditing){
      this.setUpForm();
    }
    this.isEditing = !this.isEditing;
  }

}
