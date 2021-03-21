import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationalstudentNSQFRegComponent } from './vocationalstudent-nsqf-reg.component';

describe('VocationalstudentNSQFRegComponent', () => {
  let component: VocationalstudentNSQFRegComponent;
  let fixture: ComponentFixture<VocationalstudentNSQFRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocationalstudentNSQFRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationalstudentNSQFRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
