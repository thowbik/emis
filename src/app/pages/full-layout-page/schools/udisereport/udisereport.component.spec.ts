import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdisereportComponent } from './udisereport.component';

describe('UdisereportComponent', () => {
  let component: UdisereportComponent;
  let fixture: ComponentFixture<UdisereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdisereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
