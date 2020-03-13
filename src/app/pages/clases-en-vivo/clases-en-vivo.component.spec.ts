import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesEnVivoComponent } from './clases-en-vivo.component';

describe('ClasesEnVivoComponent', () => {
  let component: ClasesEnVivoComponent;
  let fixture: ComponentFixture<ClasesEnVivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesEnVivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesEnVivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
