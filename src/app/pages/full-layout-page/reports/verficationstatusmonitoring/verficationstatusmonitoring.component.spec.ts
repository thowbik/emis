import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerficationstatusmonitoringComponent } from './verficationstatusmonitoring.component';

describe('VerficationstatusmonitoringComponent', () => {
  let component: VerficationstatusmonitoringComponent;
  let fixture: ComponentFixture<VerficationstatusmonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerficationstatusmonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerficationstatusmonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
