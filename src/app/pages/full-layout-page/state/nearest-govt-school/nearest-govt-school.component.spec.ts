import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestGovtSchoolComponent } from './nearest-govt-school.component';

describe('NearestGovtSchoolComponent', () => {
  let component: NearestGovtSchoolComponent;
  let fixture: ComponentFixture<NearestGovtSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearestGovtSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearestGovtSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
