import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtmgrNoonmealprogramRegComponent } from './ptmgr-noonmealprogram-reg.component';

describe('PtmgrNoonmealprogramRegComponent', () => {
  let component: PtmgrNoonmealprogramRegComponent;
  let fixture: ComponentFixture<PtmgrNoonmealprogramRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtmgrNoonmealprogramRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtmgrNoonmealprogramRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
