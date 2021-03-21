import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookSecComponent } from './textbook-sec.component';

describe('TextbookSecComponent', () => {
  let component: TextbookSecComponent;
  let fixture: ComponentFixture<TextbookSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextbookSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
