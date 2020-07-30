import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePostTestComponent } from './pre-post-test.component';

describe('PrePostTestComponent', () => {
  let component: PrePostTestComponent;
  let fixture: ComponentFixture<PrePostTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrePostTestComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePostTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
