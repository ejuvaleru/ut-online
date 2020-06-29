import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasAlumnoDetallesComponent } from './materias-alumno-detalles.component';

describe('MateriasAlumnoDetallesComponent', () => {
  let component: MateriasAlumnoDetallesComponent;
  let fixture: ComponentFixture<MateriasAlumnoDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasAlumnoDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasAlumnoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
