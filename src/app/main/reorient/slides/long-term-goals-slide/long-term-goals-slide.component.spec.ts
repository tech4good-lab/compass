import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermGoalsSlideComponent } from './long-term-goals-slide.component';

describe('LongTermGoalsSlideComponent', () => {
  let component: LongTermGoalsSlideComponent;
  let fixture: ComponentFixture<LongTermGoalsSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTermGoalsSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermGoalsSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});