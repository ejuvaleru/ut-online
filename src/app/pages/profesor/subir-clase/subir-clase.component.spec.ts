import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirClaseComponent } from './subir-clase.component';

describe('SubirClaseComponent', () => {
  let component: SubirClaseComponent;
  let fixture: ComponentFixture<SubirClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
