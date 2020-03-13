import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/shared/subject.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  idSubject = '';
  subjectElement: any;

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

  }

}
