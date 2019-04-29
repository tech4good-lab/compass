import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInfoSlideComponent } from './calendar-info-slide.component';

describe('CalendarInfoSlideComponent', () => {
  let component: CalendarInfoSlideComponent;
  let fixture: ComponentFixture<CalendarInfoSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarInfoSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarInfoSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});