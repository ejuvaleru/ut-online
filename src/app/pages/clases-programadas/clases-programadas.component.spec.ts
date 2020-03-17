import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesProgramadasComponent } from './clases-programadas.component';

describe('ClasesProgramadasComponent', () => {
  let component: ClasesProgramadasComponent;
  let fixture: ComponentFixture<ClasesProgramadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesProgramadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesProgramadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
