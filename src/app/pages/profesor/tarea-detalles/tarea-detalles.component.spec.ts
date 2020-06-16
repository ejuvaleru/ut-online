import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaDetallesComponent } from './tarea-detalles.component';

describe('TareaDetallesComponent', () => {
  let component: TareaDetallesComponent;
  let fixture: ComponentFixture<TareaDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
