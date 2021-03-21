import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDefenseTrainingComponent } from './self-defense-training.component';

describe('SelfDefenseTrainingComponent', () => {
  let component: SelfDefenseTrainingComponent;
  let fixture: ComponentFixture<SelfDefenseTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfDefenseTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfDefenseTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
