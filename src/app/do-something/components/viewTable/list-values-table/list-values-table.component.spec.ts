import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListValuesTableComponent } from './list-values-table.component';

describe('ListValuesTableComponent', () => {
  let component: ListValuesTableComponent;
  let fixture: ComponentFixture<ListValuesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListValuesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListValuesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
