import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { Tarea } from "src/app/shared/models/tarea.model";
import { DomSanitizer } from '@angular/platform-browser';
import { Entrega } from 'src/app/shared/models/entrega.model';

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
  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.afs
      .collection("tareas")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.tarea = res;
        console.log(this.tarea);
      });


      this.afs.collection('entregas', ref =>ref.where('tareaID', '==', this.id) ).valueChanges()
      .subscribe((res: any) => {
        console.log(res)
        this.entregas = [];
        res.forEach((e: Entrega) => {
          this.entregas.push(e);
        });
      }
      );
  }


  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
