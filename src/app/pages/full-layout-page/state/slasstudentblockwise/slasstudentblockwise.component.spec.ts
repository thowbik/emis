import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlasstudentblockwiseComponent } from './slasstudentblockwise.component';

describe('SlasstudentblockwiseComponent', () => {
  let component: SlasstudentblockwiseComponent;
  let fixture: ComponentFixture<SlasstudentblockwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlasstudentblockwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlasstudentblockwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
