import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsqfCompletionComponent } from './nsqf-completion.component';

describe('NsqfCompletionComponent', () => {
  let component: NsqfCompletionComponent;
  let fixture: ComponentFixture<NsqfCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsqfCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsqfCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
