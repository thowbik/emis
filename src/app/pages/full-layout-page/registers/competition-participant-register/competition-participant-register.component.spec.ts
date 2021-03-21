import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionParticipantRegisterComponent } from './competition-participant-register.component';

describe('CompetitionParticipantRegisterComponent', () => {
  let component: CompetitionParticipantRegisterComponent;
  let fixture: ComponentFixture<CompetitionParticipantRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionParticipantRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionParticipantRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
