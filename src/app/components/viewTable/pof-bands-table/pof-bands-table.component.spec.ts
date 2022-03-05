import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoFBandsTableComponent } from './pof-bands-table.component';

describe('PoFBandsTableComponent', () => {
  let component: PoFBandsTableComponent;
  let fixture: ComponentFixture<PoFBandsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoFBandsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoFBandsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
