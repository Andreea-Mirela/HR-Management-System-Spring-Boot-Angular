import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConferenceeComponent } from './video-conferencee.component';

describe('VideoConferenceeComponent', () => {
  let component: VideoConferenceeComponent;
  let fixture: ComponentFixture<VideoConferenceeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoConferenceeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoConferenceeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
