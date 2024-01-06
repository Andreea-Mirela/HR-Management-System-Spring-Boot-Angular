import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTrainingPdfComponent } from './health-training-pdf.component';

describe('HealthTrainingPdfComponent', () => {
  let component: HealthTrainingPdfComponent;
  let fixture: ComponentFixture<HealthTrainingPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthTrainingPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthTrainingPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
