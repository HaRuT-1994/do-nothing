import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskLevelsTableComponent } from './risk-levels-table.component';

describe('RiskLevelsTableComponent', () => {
  let component: RiskLevelsTableComponent;
  let fixture: ComponentFixture<RiskLevelsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskLevelsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskLevelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
