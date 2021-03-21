import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TRSTSEScholarshipSchemeComponent } from './trstse-scholarship-scheme.component';

describe('TRSTSEScholarshipSchemeComponent', () => {
  let component: TRSTSEScholarshipSchemeComponent;
  let fixture: ComponentFixture<TRSTSEScholarshipSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TRSTSEScholarshipSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TRSTSEScholarshipSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
