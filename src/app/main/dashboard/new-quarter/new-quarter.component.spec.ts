import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuarterComponent } from './new-quarter.component';

describe('NewQuarterComponent', () => {
  let component: NewQuarterComponent;
  let fixture: ComponentFixture<NewQuarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});