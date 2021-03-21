import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolNeedCsrComponent } from './school-need-csr.component';

describe('SchoolNeedCsrComponent', () => {
  let component: SchoolNeedCsrComponent;
  let fixture: ComponentFixture<SchoolNeedCsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolNeedCsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolNeedCsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
