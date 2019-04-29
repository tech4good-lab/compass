import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingCardComponent } from './upcoming-card.component';

describe('UpcomingCardComponent', () => {
  let component: UpcomingCardComponent;
  let fixture: ComponentFixture<UpcomingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});