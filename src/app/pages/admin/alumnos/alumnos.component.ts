import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { Grupo } from "src/app/shared/models/grupo.model";
import { Location } from "@angular/common";

@Component({
  selector: "app-alumnos",
  templateUrl: "./alumnos.component.html",
  styleUrls: ["./alumnos.component.scss"],
})
export class AlumnosComponent implements OnInit {
  public id: string;
  grupo = {} as Grupo;
  materias = [];
  alumnos = [];

  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer,
    private _location: Location,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.afs
      .collection("alumnos", (ref) => ref.where("grupoID", "==", this.id))
      .valueChanges()
      .subscribe((alumnos) => {
        console.log(alumnos);
        alumnos.forEach((element) => {
          this.alumnos.push(element);
        });
      });

    this.afs
      .collection("grupos")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.grupo = res;

        this.grupo.materias.forEach((m) => {
          this.afs
            .collection("materias")
            .doc(m)
            .valueChanges()
            .subscribe((res) => {
              this.materias.push(res);
            });
        });
      });
  }
}
