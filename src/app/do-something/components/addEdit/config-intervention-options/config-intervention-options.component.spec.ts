import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigInterventionOptionsComponent } from './config-intervention-options.component';

describe('ConfigInterventionOptionsComponent', () => {
  let component: ConfigInterventionOptionsComponent;
  let fixture: ComponentFixture<ConfigInterventionOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigInterventionOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigInterventionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
