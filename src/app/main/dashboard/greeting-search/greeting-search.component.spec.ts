import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingSearchComponent } from './greeting-search.component';

describe('GreetingSearchComponent', () => {
  let component: GreetingSearchComponent;
  let fixture: ComponentFixture<GreetingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreetingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});