import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostfreeSocksRegComponent } from './costfree-socks-reg.component';

describe('CostfreeSocksRegComponent', () => {
  let component: CostfreeSocksRegComponent;
  let fixture: ComponentFixture<CostfreeSocksRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostfreeSocksRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostfreeSocksRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
