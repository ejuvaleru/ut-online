import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarStreamComponent } from './iniciar-stream.component';

describe('IniciarStreamComponent', () => {
  let component: IniciarStreamComponent;
  let fixture: ComponentFixture<IniciarStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
