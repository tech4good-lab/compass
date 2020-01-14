import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterMapComponent } from './quarter-map.component';

describe('QuarterMapComponent', () => {
  let component: QuarterMapComponent;
  let fixture: ComponentFixture<QuarterMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterMapComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
