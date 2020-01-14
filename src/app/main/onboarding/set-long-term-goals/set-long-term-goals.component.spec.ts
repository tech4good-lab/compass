import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLongTermGoalsComponent } from './set-long-term-goals.component';

describe('SetLongTermGoalsComponent', () => {
  let component: SetLongTermGoalsComponent;
  let fixture: ComponentFixture<SetLongTermGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLongTermGoalsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLongTermGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
