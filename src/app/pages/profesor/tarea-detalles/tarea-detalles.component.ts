import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { Tarea } from "src/app/shared/models/tarea.model";
import { DomSanitizer } from "@angular/platform-browser";
import { Entrega } from "src/app/shared/models/entrega.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-tarea-detalles",
  templateUrl: "./tarea-detalles.component.html",
  styleUrls: ["./tarea-detalles.component.scss"],
})
export class TareaDetallesComponent implements OnInit {
  public id: string;
  public tarea: Tarea = {} as Tarea;
  public entregas: Entrega[] = [];
  public coleccion: string = "tareas";
  

  public modal = false;
  formTarea: FormGroup;

  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer,
    private _location: Location,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    const fechaHoy = new Date().toISOString().slice(0, 16);
    console.log(fechaHoy+ "aqui estoy");
    this.setUpFormTarea();
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.afs
      .collection("tareas")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.tarea = res;
        this.formTarea.patchValue({
          nombre: this.tarea.nombre,
          instrucciones: this.tarea.instrucciones,
          fechaEntrega: new Date(res.fechaEntrega.toDate()).toISOString().slice(0, 16)
        });
        console.log(res.fechaEntrega.toDate());
        console.log(new Date(res.fechaEntrega.toDate()).toISOString());
      });

    this.afs
      .collection("entregas", (ref) => ref.where("tareaID", "==", this.id))
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.entregas = [];
        res.forEach((e: Entrega) => {
          this.entregas.push(e);
        });
      });
  }

  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let hora = ''+ d.getHours();
    let minutos= '' + d.getMinutes();
  //  let time = d.get
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hora.length < 2) hora = '0' + hora;
    if (minutos.length < 2) minutos = '0' + minutos;
    return [year, month, day, hora, minutos].join('-');
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

  toggleModal() {
    this.modal = !this.modal;
  }

  onSubmitTarea() {
    var fechaEntrega: Date;
    fechaEntrega = new Date(this.formTarea.value.fechaEntrega);

    console.log(this.formTarea.value.fechaEntrega)
    console.log(fechaEntrega);
    this.afs.collection("tareas").doc(this.id).update({
      nombre: this.formTarea.value.nombre,
      instrucciones: this.formTarea.value.instrucciones,
      fechaEntrega: fechaEntrega,
    }).then(res => {
      this.toast.success("Eliminación exitosa", "Mensaje", {
        positionClass: "toast-bottom-center",
        timeOut: 3000,
      });
    });
    this.toggleModal();
  }


  backClicked() {
    this._location.back();
  }
}
