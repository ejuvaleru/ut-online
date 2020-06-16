import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Materia } from 'src/app/shared/models/materia.model';
import { DomSanitizer} from '@angular/platform-browser';
import { Tarea } from 'src/app/shared/models/tarea.model';

@Component({
  selector: 'app-materia-detalles',
  templateUrl: './materia-detalles.component.html',
  styleUrls: ['./materia-detalles.component.scss']
})
export class MateriaDetallesComponent implements OnInit {

  public modal = false; 
  public id: string;
  public materia: Materia = {} as Materia;
  public tareas: Tarea[] = [];
  public coleccion = {
    nombre: "materias"
  }
  
  constructor(
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer
  ) { 
    
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.afs.collection('materias' ).doc(this.id).valueChanges()
    .subscribe((res: any) => {
      console.log(res)
      this.materia = res; 
      console.log(this.materia);

    }
    );

    this.afs.collection('tareas', ref =>ref.where('materiaID', '==', this.id) ).valueChanges()
      .subscribe((res: any) => {
        console.log(res)
        this.tareas = [];
        res.forEach(e => {
          this.tareas.push(e);
        });
      }
      );
  }

  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleModal(){
    this.modal= !this.modal; 
  }

}
