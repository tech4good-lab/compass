import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiceWorkComponent } from './nice-work.component';

describe('NiceWorkComponent', () => {
  let component: NiceWorkComponent;
  let fixture: ComponentFixture<NiceWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiceWorkComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiceWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
