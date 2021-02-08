import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingCardComponent } from './scheduling-card.component';

describe('SchedulingCardComponent', () => {
  let component: SchedulingCardComponent;
  let fixture: ComponentFixture<SchedulingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});