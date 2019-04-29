import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarScheduleSlideComponent } from './calendar-schedule-slide.component';

describe('CalendarScheduleSlideComponent', () => {
  let component: CalendarScheduleSlideComponent;
  let fixture: ComponentFixture<CalendarScheduleSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarScheduleSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarScheduleSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});