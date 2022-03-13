import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRatesComponent } from './config-rates.component';

describe('ConfigRatesComponent', () => {
  let component: ConfigRatesComponent;
  let fixture: ComponentFixture<ConfigRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
