import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaDetallesAlumnoComponent } from './tarea-detalles-alumno.component';

describe('TareaDetallesAlumnoComponent', () => {
  let component: TareaDetallesAlumnoComponent;
  let fixture: ComponentFixture<TareaDetallesAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaDetallesAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaDetallesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
