import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PindicsHmevaluationComponent } from './pindics-hmevaluation.component';

describe('PindicsHmevaluationComponent', () => {
  let component: PindicsHmevaluationComponent;
  let fixture: ComponentFixture<PindicsHmevaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PindicsHmevaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PindicsHmevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
