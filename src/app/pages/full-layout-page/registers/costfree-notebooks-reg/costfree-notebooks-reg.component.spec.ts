import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeNotebooksRegComponent } from './costfree-notebooks-reg.component';

describe('CostfreeNotebooksRegComponent', () => {
  let component: CostfreeNotebooksRegComponent;
  let fixture: ComponentFixture<CostfreeNotebooksRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeNotebooksRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeNotebooksRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
