import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosTableComponent } from './scenarios-table.component';

describe('ScenariosTableComponent', () => {
  let component: ScenariosTableComponent;
  let fixture: ComponentFixture<ScenariosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenariosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenariosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
