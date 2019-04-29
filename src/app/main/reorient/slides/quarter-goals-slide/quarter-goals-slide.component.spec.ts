import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterGoalsSlideComponent } from './quarter-goals-slide.component';

describe('QuarterGoalsSlideComponent', () => {
  let component: QuarterGoalsSlideComponent;
  let fixture: ComponentFixture<QuarterGoalsSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterGoalsSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterGoalsSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});