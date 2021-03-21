import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KgbvStudentBankingDetailsComponent } from './kgbv-student-banking-details.component';

describe('KgbvStudentBankingDetailsComponent', () => {
  let component: KgbvStudentBankingDetailsComponent;
  let fixture: ComponentFixture<KgbvStudentBankingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KgbvStudentBankingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KgbvStudentBankingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
