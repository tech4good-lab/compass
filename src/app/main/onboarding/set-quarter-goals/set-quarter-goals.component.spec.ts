import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetQuarterGoalsComponent } from './set-quarter-goals.component';

describe('SetQuarterGoalsComponent', () => {
  let component: SetQuarterGoalsComponent;
  let fixture: ComponentFixture<SetQuarterGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetQuarterGoalsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetQuarterGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
