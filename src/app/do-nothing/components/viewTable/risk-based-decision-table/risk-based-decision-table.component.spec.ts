import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskBasedDecisionTableComponent } from './risk-based-decision-table.component';

describe('RiskBasedDecisionTableComponent', () => {
  let component: RiskBasedDecisionTableComponent;
  let fixture: ComponentFixture<RiskBasedDecisionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskBasedDecisionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskBasedDecisionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
