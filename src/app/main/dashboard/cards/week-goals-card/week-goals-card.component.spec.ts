import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekGoalsCardComponent } from './week-goals-card.component';

describe('WeekGoalsCardComponent', () => {
  let component: WeekGoalsCardComponent;
  let fixture: ComponentFixture<WeekGoalsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekGoalsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekGoalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});