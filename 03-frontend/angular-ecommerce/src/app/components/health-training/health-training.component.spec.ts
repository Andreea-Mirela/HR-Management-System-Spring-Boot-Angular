import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTrainingComponent } from './health-training.component';

describe('HealthTrainingComponent', () => {
  let component: HealthTrainingComponent;
  let fixture: ComponentFixture<HealthTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
