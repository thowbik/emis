import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidPhonecountComponent } from './invalid-phonecount.component';

describe('InvalidPhonecountComponent', () => {
  let component: InvalidPhonecountComponent;
  let fixture: ComponentFixture<InvalidPhonecountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidPhonecountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidPhonecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
