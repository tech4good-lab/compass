import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekGoalsSlideComponent } from './week-goals-slide.component';

describe('WeekGoalsSlideComponent', () => {
  let component: WeekGoalsSlideComponent;
  let fixture: ComponentFixture<WeekGoalsSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekGoalsSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekGoalsSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});