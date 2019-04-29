import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterGoalsCardComponent } from './quarter-goals-card.component';

describe('QuarterGoalsCardComponent', () => {
  let component: QuarterGoalsCardComponent;
  let fixture: ComponentFixture<QuarterGoalsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterGoalsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterGoalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});