import { Component, OnInit } from '@angular/core';
import { Entrega } from 'src/app/shared/models/entrega.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { Grupo } from 'src/app/shared/models/grupo.model';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.scss']
})
export class CalificarComponent implements OnInit {

  public id: string;
  public entrega= {} as Entrega;
  grupo = '';

  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.afs
      .collection("entregas")
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.entrega = res;
        console.log(this.entrega);

        this.afs.collection('grupos').doc(this.entrega.alumno.grupoID).valueChanges().subscribe( (g: Grupo) => {
          this.grupo = g.nombre;
        })
      });
  }


  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  calificar( calificacion) {

    const cal = parseInt(calificacion); 
    this.afs.collection('entregas').doc(this.id).update({
      calificacion: cal
    })

  }


  
  backClicked() {
    this._location.back();
  }

}
