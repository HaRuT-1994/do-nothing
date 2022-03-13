import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionOptionsTableComponent } from './intervention-options-table.component';

describe('InterventionOptionsTableComponent', () => {
  let component: InterventionOptionsTableComponent;
  let fixture: ComponentFixture<InterventionOptionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterventionOptionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionOptionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
