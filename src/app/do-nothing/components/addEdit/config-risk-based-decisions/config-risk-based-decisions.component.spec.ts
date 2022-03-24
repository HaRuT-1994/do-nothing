import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRiskBasedDecisionsComponent } from './config-risk-based-decisions.component';

describe('ConfigRiskBasedDecisionsComponent', () => {
  let component: ConfigRiskBasedDecisionsComponent;
  let fixture: ComponentFixture<ConfigRiskBasedDecisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigRiskBasedDecisionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRiskBasedDecisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
