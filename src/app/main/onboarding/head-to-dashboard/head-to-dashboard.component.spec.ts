import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadToDashboardComponent } from './head-to-dashboard.component';

describe('HeadToDashboardComponent', () => {
  let component: HeadToDashboardComponent;
  let fixture: ComponentFixture<HeadToDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadToDashboardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadToDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
