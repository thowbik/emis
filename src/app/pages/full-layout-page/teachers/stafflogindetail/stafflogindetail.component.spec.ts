import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StafflogindetailComponent } from './stafflogindetail.component';

describe('StafflogindetailComponent', () => {
  let component: StafflogindetailComponent;
  let fixture: ComponentFixture<StafflogindetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StafflogindetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StafflogindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
