import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorientComponent } from './reorient.component';

describe('ReorientComponent', () => {
  let component: ReorientComponent;
  let fixture: ComponentFixture<ReorientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});