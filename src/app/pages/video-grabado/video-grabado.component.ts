import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/shared/subject.service';

@Component({
  selector: 'app-video-grabado',
  templateUrl: './video-grabado.component.html',
  styleUrls: ['./video-grabado.component.scss']
})
export class VideoGrabadoComponent implements OnInit {

  idSubject = '';
  subjectElement: any;
  curso: any;
  video = '';

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
        this.curso = this.subjectService.getCursoById(this.idSubject);
        this.video = this.subjectElement.video;
      }
    });
  }


  cambiarVideo(video: string) {
    this.video = video;
    console.log(this.video, 'SOY EL LINK');
  }
}
