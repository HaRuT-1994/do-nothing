import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportModelComponent } from './export-model.component';

describe('ExportModelComponent', () => {
  let component: ExportModelComponent;
  let fixture: ComponentFixture<ExportModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
