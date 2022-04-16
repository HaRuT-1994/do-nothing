import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBudgetYearComponent } from './config-budget-year.component';

describe('ConfigBudgetYearComponent', () => {
  let component: ConfigBudgetYearComponent;
  let fixture: ComponentFixture<ConfigBudgetYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigBudgetYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigBudgetYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
