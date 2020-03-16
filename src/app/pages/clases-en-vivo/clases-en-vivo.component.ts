import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/shared/subject.service';

@Component({
  selector: 'app-clases-en-vivo',
  templateUrl: './clases-en-vivo.component.html',
  styleUrls: ['./clases-en-vivo.component.scss']
})
export class ClasesEnVivoComponent implements OnInit {

  subjectsLive = [];
  subjectsNext = [];

  constructor(
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.subjectsLive = this.subjectService.getSubjectsLive();
    console.log(this.subjectsLive);

    this.subjectsNext = this.subjectService.getSubjectsNext();
  }

}
