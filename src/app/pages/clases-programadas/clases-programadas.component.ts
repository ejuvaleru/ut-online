import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/shared/subject.service';

@Component({
  selector: 'app-clases-programadas',
  templateUrl: './clases-programadas.component.html',
  styleUrls: ['./clases-programadas.component.scss']
})
export class ClasesProgramadasComponent implements OnInit {

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
