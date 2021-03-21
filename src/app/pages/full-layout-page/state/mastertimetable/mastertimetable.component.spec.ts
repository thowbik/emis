import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastertimetableComponent } from './mastertimetable.component';

describe('MastertimetableComponent', () => {
  let component: MastertimetableComponent;
  let fixture: ComponentFixture<MastertimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastertimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastertimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
