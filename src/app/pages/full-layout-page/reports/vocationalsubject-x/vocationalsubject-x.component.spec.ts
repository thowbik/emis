import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationalsubjectXComponent } from './vocationalsubject-x.component';

describe('VocationalsubjectXComponent', () => {
  let component: VocationalsubjectXComponent;
  let fixture: ComponentFixture<VocationalsubjectXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocationalsubjectXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationalsubjectXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
