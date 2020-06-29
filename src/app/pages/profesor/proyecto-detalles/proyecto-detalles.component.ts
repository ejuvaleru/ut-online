import { Component, OnInit } from "@angular/core";
import { EntregaProyecto } from "src/app/shared/models/entregaProyecto.model";
import { Proyecto } from "src/app/shared/models/proyecto.model";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { DomSanitizer } from "@angular/platform-browser";
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-proyecto-detalles",
  templateUrl: "./proyecto-detalles.component.html",
  styleUrls: ["./proyecto-detalles.component.scss"],
})
export class ProyectoDetallesComponent implements OnInit {
  public id: string;
  public proyecto: Proyecto = {} as Proyecto;
  public entregas: EntregaProyecto[] = [];
  public coleccion: string = "proyectos";
  formProyecto: FormGroup;
  modal = false; 

  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.setUpFormProyecto();
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.afs
      .collection("proyectos")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        this.proyecto = res;

        this.formProyecto.patchValue({
          nombre: res.nombre,
          instrucciones: res.instrucciones,
          fechaEntrega: new Date(res.fechaEntrega),
        });
     //   console.log(this.proyecto + "AVVVEEEEERRRR");
      });

    this.afs
      .collection("entregasProyecto", (ref) =>
        ref.where("proyectoID", "==", this.id)
      )
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.entregas = [];
        res.forEach((e) => {
          this.entregas.push(e);
        });
      });
  }

  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  backClicked() {
    this._location.back();
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

  toggleModalProyectos() {
    this.modal = !this.modal;
  }

  onSubmitProyecto() {
    var fechaEntrega: Date;

    fechaEntrega = new Date(this.formProyecto.value.fechaEntrega);
    this.afs.collection("proyectos").doc(this.id).update({
      nombre: this.formProyecto.value.nombre,
      instrucciones: this.formProyecto.value.instrucciones,
      fechaEntrega: fechaEntrega,
    });
    this.toggleModalProyectos();
  }
}
