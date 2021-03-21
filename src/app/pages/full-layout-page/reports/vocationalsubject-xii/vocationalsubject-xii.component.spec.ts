import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocationalsubjectXIIComponent } from './vocationalsubject-xii.component';

describe('VocationalsubjectXIIComponent', () => {
  let component: VocationalsubjectXIIComponent;
  let fixture: ComponentFixture<VocationalsubjectXIIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocationalsubjectXIIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocationalsubjectXIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
