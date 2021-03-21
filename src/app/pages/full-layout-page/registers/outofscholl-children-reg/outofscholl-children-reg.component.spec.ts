import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutofschollChildrenRegComponent } from './outofscholl-children-reg.component';

describe('OutofschollChildrenRegComponent', () => {
  let component: OutofschollChildrenRegComponent;
  let fixture: ComponentFixture<OutofschollChildrenRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutofschollChildrenRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutofschollChildrenRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
