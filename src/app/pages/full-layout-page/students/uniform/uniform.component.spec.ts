import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformComponent } from './uniform.component';

describe('UniformComponent', () => {
  let component: UniformComponent;
  let fixture: ComponentFixture<UniformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
