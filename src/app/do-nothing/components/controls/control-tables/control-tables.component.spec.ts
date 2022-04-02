import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTablesComponent } from './control-tables.component';

describe('ControlTablesComponent', () => {
  let component: ControlTablesComponent;
  let fixture: ComponentFixture<ControlTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
