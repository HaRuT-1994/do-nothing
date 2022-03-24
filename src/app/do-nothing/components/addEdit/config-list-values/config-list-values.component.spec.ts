import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigListValuesComponent } from './config-list-values.component';

describe('ConfigListValuesComponent', () => {
  let component: ConfigListValuesComponent;
  let fixture: ComponentFixture<ConfigListValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigListValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigListValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
