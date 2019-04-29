import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermGoalsCardComponent } from './long-term-goals-card.component';

describe('LongTermGoalsCardComponent', () => {
  let component: LongTermGoalsCardComponent;
  let fixture: ComponentFixture<LongTermGoalsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTermGoalsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermGoalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});