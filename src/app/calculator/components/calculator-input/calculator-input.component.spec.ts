import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorInputComponent } from './calculator-input.component';

describe('CalculatorInputComponent', () => {
  let component: CalculatorInputComponent;
  let fixture: ComponentFixture<CalculatorInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorInputComponent]
    });
    fixture = TestBed.createComponent(CalculatorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
