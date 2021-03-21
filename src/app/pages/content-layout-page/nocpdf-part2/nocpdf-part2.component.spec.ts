import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocpdfPart2Component } from './nocpdf-part2.component';

describe('NocpdfPart2Component', () => {
  let component: NocpdfPart2Component;
  let fixture: ComponentFixture<NocpdfPart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocpdfPart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocpdfPart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
