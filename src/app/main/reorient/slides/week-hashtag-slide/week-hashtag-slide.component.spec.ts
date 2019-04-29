import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekHashtagSlideComponent } from './week-hashtag-slide.component';

describe('WeekHashtagSlideComponent', () => {
  let component: WeekHashtagSlideComponent;
  let fixture: ComponentFixture<WeekHashtagSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekHashtagSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekHashtagSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});