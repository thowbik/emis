import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlasschooldistrictwiseComponent } from './slasschooldistrictwise.component';

describe('SlasschooldistrictwiseComponent', () => {
  let component: SlasschooldistrictwiseComponent;
  let fixture: ComponentFixture<SlasschooldistrictwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlasschooldistrictwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlasschooldistrictwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
