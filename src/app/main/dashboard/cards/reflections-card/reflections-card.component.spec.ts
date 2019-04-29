import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectionsCardComponent } from './reflections-card.component';

describe('ReflectionsCardComponent', () => {
  let component: ReflectionsCardComponent;
  let fixture: ComponentFixture<ReflectionsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReflectionsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReflectionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});