import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortTableComponent } from './cohort-table.component';

describe('CohortTableComponent', () => {
  let component: CohortTableComponent;
  let fixture: ComponentFixture<CohortTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CohortTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
