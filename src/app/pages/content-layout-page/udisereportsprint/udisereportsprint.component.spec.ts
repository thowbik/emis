import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdisereportsprintComponent } from './udisereportsprint.component';

describe('UdisereportsprintComponent', () => {
  let component: UdisereportsprintComponent;
  let fixture: ComponentFixture<UdisereportsprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdisereportsprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdisereportsprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
