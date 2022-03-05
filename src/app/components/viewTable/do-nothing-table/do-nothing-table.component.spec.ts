import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoNothingTableComponent } from './do-nothing-table.component';

describe('DoNothingTableComponent', () => {
  let component: DoNothingTableComponent;
  let fixture: ComponentFixture<DoNothingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoNothingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoNothingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
