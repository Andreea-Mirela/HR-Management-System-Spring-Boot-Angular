import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMenuComponent } from './portal-menu.component';

describe('PortalMenuComponent', () => {
  let component: PortalMenuComponent;
  let fixture: ComponentFixture<PortalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
