import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanWeeklyGoalsComponent } from './plan-weekly-goals.component';

describe('PlanWeeklyGoalsComponent', () => {
  let component: PlanWeeklyGoalsComponent;
  let fixture: ComponentFixture<PlanWeeklyGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanWeeklyGoalsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanWeeklyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
