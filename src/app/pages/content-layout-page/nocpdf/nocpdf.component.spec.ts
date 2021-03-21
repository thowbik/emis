import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocpdfComponent } from './nocpdf.component';

describe('NocpdfComponent', () => {
  let component: NocpdfComponent;
  let fixture: ComponentFixture<NocpdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocpdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
