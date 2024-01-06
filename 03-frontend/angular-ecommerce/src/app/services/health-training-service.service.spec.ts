import { TestBed } from '@angular/core/testing';

import { HealthTrainingServiceService } from './health-training-service.service';

describe('HealthTrainingServiceService', () => {
  let service: HealthTrainingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthTrainingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
