import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewGoalsSlideComponent } from './review-goals-slide.component';

describe('ReviewGoalsSlideComponent', () => {
  let component: ReviewGoalsSlideComponent;
  let fixture: ComponentFixture<ReviewGoalsSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewGoalsSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewGoalsSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});