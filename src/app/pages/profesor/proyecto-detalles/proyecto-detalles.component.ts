import { Component, OnInit } from '@angular/core';
import { EntregaProyecto } from 'src/app/shared/models/entregaProyecto.model';
import { Proyecto } from 'src/app/shared/models/proyecto.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-proyecto-detalles',
  templateUrl: './proyecto-detalles.component.html',
  styleUrls: ['./proyecto-detalles.component.scss']
})
export class ProyectoDetallesComponent implements OnInit {

  public id: string;
  public proyecto: Proyecto = {} as Proyecto;
  public entregas: EntregaProyecto[] = []; 
  public coleccion: string = "proyectos";
  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.afs
      .collection("proyectos")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.proyecto = res;
        console.log(this.proyecto);
      });


      this.afs.collection('entregasProyecto', ref =>ref.where('proyectoID', '==', this.id) ).valueChanges()
      .subscribe((res: any) => {
        console.log(res)
        this.entregas = [];
        res.forEach(e => {
          this.entregas.push(e);
        });
      }
      );
  }


  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
