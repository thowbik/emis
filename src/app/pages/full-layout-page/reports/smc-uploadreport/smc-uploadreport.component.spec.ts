import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmcUploadreportComponent } from './smc-uploadreport.component';

describe('SmcUploadreportComponent', () => {
  let component: SmcUploadreportComponent;
  let fixture: ComponentFixture<SmcUploadreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmcUploadreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmcUploadreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
