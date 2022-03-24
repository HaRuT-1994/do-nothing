import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigListsComponent } from './config-lists.component';

describe('ConfigListsComponent', () => {
  let component: ConfigListsComponent;
  let fixture: ComponentFixture<ConfigListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
