import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCompetitionComponent } from './school-competition.component';

describe('SchoolCompetitionComponent', () => {
  let component: SchoolCompetitionComponent;
  let fixture: ComponentFixture<SchoolCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolCompetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
