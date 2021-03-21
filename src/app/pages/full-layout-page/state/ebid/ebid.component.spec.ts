import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbidComponent } from './ebid.component';

describe('EbidComponent', () => {
  let component: EbidComponent;
  let fixture: ComponentFixture<EbidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
