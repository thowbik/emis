import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubParticipationRegistersComponent } from './club-participation-registers.component';

describe('ClubParticipationRegistersComponent', () => {
  let component: ClubParticipationRegistersComponent;
  let fixture: ComponentFixture<ClubParticipationRegistersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubParticipationRegistersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubParticipationRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
