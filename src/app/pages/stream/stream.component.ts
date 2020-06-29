import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/shared/subject.service';
import swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';
import { Materia } from 'src/app/shared/models/materia.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from "@angular/common";

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  idSubject = '';
  subjectElement: any;
  materia = {} as Materia;


  // Array para chat
  chat: any[] = [];
  chat2 = [{ usuario: 'Profesor', mensaje: 'Buenos días chicos' },
  { usuario: 'Luis', mensaje: 'Buenos días profesor' },
  { usuario: 'Alejandra', mensaje: 'Hola a todos' },
  { usuario: 'Ramiro', mensaje: 'Coronavirus time' },
  { usuario: 'Miranda', mensaje: 'Ya no sé qué poner' }];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer,
    private _location: Location
    
  ) { }

  ngOnInit(): void {
    

    this.idSubject = this.route.snapshot.paramMap.get("id");

    this.afs
      .collection("materias")
      .doc(this.idSubject)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
        this.materia = res;
        console.log(this.materia);
      });

    this.startChat();
  }



  openAlert() {
    swal.fire({
      title: 'Cuidado',
      text: '¿Realmente desea abandonar el stream?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar'
    }).then(res => {
      if (res.value) {
        this.backClicked();
        this.afs.collection('materias').doc(this.idSubject).update({
          envivo: false
        });
      }
    });
  }

  // Método para iniciar chat
  async startChat() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.chat2.length; ++i) {
      this.chat.push(this.chat2[i]);
      await this.delay(3000);
    }
  }
  // Delay para el chat
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  // Send a message

  sendMessage(nuevoMensaje: string) {
    if (nuevoMensaje) {
      this.chat.push({ usuario: 'YO', mensaje: nuevoMensaje });
    }
  }


  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://192.168.1.82/${url}`);
  }

  backClicked() {
    this._location.back();
  }


}
