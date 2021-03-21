import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitIndiaFormComponent } from './fit-india-form.component';

describe('FitIndiaFormComponent', () => {
  let component: FitIndiaFormComponent;
  let fixture: ComponentFixture<FitIndiaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitIndiaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitIndiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
