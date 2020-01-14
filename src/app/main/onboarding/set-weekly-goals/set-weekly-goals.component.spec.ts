import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetWeeklyGoalsComponent } from './set-weekly-goals.component';

describe('SetWeeklyGoalsComponent', () => {
  let component: SetWeeklyGoalsComponent;
  let fixture: ComponentFixture<SetWeeklyGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetWeeklyGoalsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetWeeklyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
