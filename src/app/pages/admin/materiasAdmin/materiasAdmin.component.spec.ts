import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasAdminComponent } from './materiasAdmin.component';

describe('MateriasComponent', () => {
  let component: MateriasAdminComponent;
  let fixture: ComponentFixture<MateriasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
