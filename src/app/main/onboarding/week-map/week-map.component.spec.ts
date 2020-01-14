import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekMapComponent } from './week-map.component';

describe('WeekMapComponent', () => {
  let component: WeekMapComponent;
  let fixture: ComponentFixture<WeekMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekMapComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
