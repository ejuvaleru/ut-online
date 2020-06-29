import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoDetallesAlumnoComponent } from './proyecto-detalles-alumno.component';

describe('ProyectoDetallesAlumnoComponent', () => {
  let component: ProyectoDetallesAlumnoComponent;
  let fixture: ComponentFixture<ProyectoDetallesAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoDetallesAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoDetallesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
