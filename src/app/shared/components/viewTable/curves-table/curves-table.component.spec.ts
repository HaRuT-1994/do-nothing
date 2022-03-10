import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvesTableComponent } from './curves-table.component';

describe('CurvesTableComponent', () => {
  let component: CurvesTableComponent;
  let fixture: ComponentFixture<CurvesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurvesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
