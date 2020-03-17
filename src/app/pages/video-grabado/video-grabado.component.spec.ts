import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGrabadoComponent } from './video-grabado.component';

describe('VideoGrabadoComponent', () => {
  let component: VideoGrabadoComponent;
  let fixture: ComponentFixture<VideoGrabadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoGrabadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGrabadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
