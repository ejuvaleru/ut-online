import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { Grupo } from "src/app/shared/models/grupo.model";
import { Location } from "@angular/common";
import { Alumno } from "src/app/shared/models/alumno.model";
import { Tarea } from "src/app/shared/models/tarea.model";

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
  alumnos2 = [];
  calTrabajos = [];
  promedio = 0;

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
      .collection("grupos")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.grupo = res;

        this.afs
          .collection("alumnos", (ref) => ref.where("grupoID", "==", this.id).orderBy("nombre", "desc"))
          .valueChanges()
          .subscribe((alumnos: Alumno[]) => {
            this.alumnos2 = alumnos;
            console.log(alumnos + "Todos los alumnos");
            alumnos.forEach((alumno: any) => {
              console.log(alumno.matricula + "este es el alumno");
              let alumnoId = alumno.id;
              let calFinal = [];

              this.grupo.materias.forEach((m: any) => {
                console.log(m + "materia");
                this.calTrabajos = [0, 0];

                this.afs
                  .collection("tareas", (ref) =>
                    ref.where("materiaID", "==", m)
                  )
                  .valueChanges()
                  .subscribe((t: any) => {
                    this.promedio = 0;
                    console.log(t, 'Estas son todas las tareas que deberían haber');

                
                      t.forEach((tarea) => {
                        this.afs
                          .collection("entregas", (ref) =>
                            ref
                              .where("tareaID", "==", tarea.id)
                              .where("alumnoId", "==", alumnoId)
                          )
                          .valueChanges()
                          .subscribe((entregas: any) => {
                            if(entregas) {
                              entregas.forEach((entrega) => {
                                console.log('Estas son todas las entregas' , entrega);
                                if (entrega) {
                                  console.log("Apenas estoy haciendo el push");
  
                                  if (entrega.calificacion) {
                                    console.log(entrega.calificacion, 'Entrega' )
                                    this.calTrabajos.push(
                                      parseInt(entrega.calificacion)
                                    );
                                  } else {
                                    this.calTrabajos.push(0);
                                  }
                                 
                                }
                              });
                            } else {
                              this.calTrabajos = [0,0];
                            }
                            console.log(this.calTrabajos);
                            this.promedio = this.calTrabajos.reduce((a, b) => a + b);
        
                            console.log(this.promedio, 'Promedio depués de reduce')
                            console.log((this.calTrabajos.length) , 'Numero entre')
                            this.promedio =this.promedio / (this.calTrabajos.length - 2);
                            
                           
                          });

                         
                      })
                     setTimeout(() => {
                      console.log('Promedio que paso');
                      calFinal.push(this.promedio);
                      this.promedio = 0;
                     }, 1000);
                    });
              });


              this.alumnos.push({ alumno, calFinal });
            });
          });
      });

    this.afs
      .collection("grupos")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        res.materias.forEach((m) => {
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
