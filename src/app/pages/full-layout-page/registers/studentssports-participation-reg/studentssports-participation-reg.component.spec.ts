import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentssportsParticipationRegComponent } from './studentssports-participation-reg.component';

describe('StudentssportsParticipationRegComponent', () => {
  let component: StudentssportsParticipationRegComponent;
  let fixture: ComponentFixture<StudentssportsParticipationRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentssportsParticipationRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentssportsParticipationRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
