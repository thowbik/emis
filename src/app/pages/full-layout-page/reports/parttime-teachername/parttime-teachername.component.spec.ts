import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParttimeTeachernameComponent } from './parttime-teachername.component';

describe('ParttimeTeachernameComponent', () => {
  let component: ParttimeTeachernameComponent;
  let fixture: ComponentFixture<ParttimeTeachernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParttimeTeachernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParttimeTeachernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
