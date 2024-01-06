import { TestBed } from '@angular/core/testing';

import { VideoSessionService } from './video-session.service';

describe('VideoSessionService', () => {
  let service: VideoSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
