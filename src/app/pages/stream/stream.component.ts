import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/shared/subject.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  idSubject = '';
  subjectElement: any;

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
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paraMap => {
      if (!paraMap.has('id')) {
        this.router.navigateByUrl('/clases-en-vivo');
      } else {
        this.idSubject = paraMap.get('id');
        console.log(this.idSubject);
        this.subjectElement = this.subjectService.getSubjectByID(this.idSubject);
      }
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
        this.router.navigateByUrl('/clases-en-vivo');
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

}
