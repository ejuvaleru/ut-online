import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/shared/subject.service';

@Component({
  selector: 'app-clases-en-vivo',
  templateUrl: './clases-en-vivo.component.html',
  styleUrls: ['./clases-en-vivo.component.scss']
})
export class ClasesEnVivoComponent implements OnInit {

  subjects = [];

  constructor(
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.subjects = this.subjectService.getSubjects();
    console.log(this.subjects);
  }

}
