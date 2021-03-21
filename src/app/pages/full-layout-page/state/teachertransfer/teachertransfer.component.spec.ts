import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachertransferComponent } from './teachertransfer.component';

describe('TeachertransferComponent', () => {
  let component: TeachertransferComponent;
  let fixture: ComponentFixture<TeachertransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachertransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachertransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
