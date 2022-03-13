import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunHistoryTableComponent } from './run-history-table.component';

describe('RunHistoryTableComponent', () => {
  let component: RunHistoryTableComponent;
  let fixture: ComponentFixture<RunHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunHistoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
