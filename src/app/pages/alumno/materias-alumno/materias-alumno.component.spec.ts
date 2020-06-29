import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasAlumnoComponent } from './materias-alumno.component';

describe('MateriasAlumnoComponent', () => {
  let component: MateriasAlumnoComponent;
  let fixture: ComponentFixture<MateriasAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
