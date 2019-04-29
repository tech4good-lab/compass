import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekProgressCardComponent } from './week-progress-card.component';

describe('WeekProgressCardComponent', () => {
  let component: WeekProgressCardComponent;
  let fixture: ComponentFixture<WeekProgressCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekProgressCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekProgressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});