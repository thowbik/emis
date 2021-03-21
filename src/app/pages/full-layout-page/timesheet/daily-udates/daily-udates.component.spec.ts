import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyUdatesComponent } from './daily-udates.component';

describe('DailyUdatesComponent', () => {
  let component: DailyUdatesComponent;
  let fixture: ComponentFixture<DailyUdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyUdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyUdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
