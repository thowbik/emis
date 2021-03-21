import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsValidaadharRegComponent } from './students-validaadhar-reg.component';

describe('StudentsValidaadharRegComponent', () => {
  let component: StudentsValidaadharRegComponent;
  let fixture: ComponentFixture<StudentsValidaadharRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsValidaadharRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsValidaadharRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
