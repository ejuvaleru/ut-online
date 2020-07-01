import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasAddComponent } from './materias-add.component';

describe('MateriasAddComponent', () => {
  let component: MateriasAddComponent;
  let fixture: ComponentFixture<MateriasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
