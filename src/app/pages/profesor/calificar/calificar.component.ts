import { Component, OnInit } from '@angular/core';
import { Entrega } from 'src/app/shared/models/entrega.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.scss']
})
export class CalificarComponent implements OnInit {

  public id: string;
  public entrega: Entrega = {} as Entrega;

  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer
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

}
