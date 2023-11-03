import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculatorInputComponent } from '../calculator-input/calculator-input.component';
import { CurrentInputPipe } from './current-input.pipe';
import { PreviousInputPipe } from './previous-input.pipe';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalculatorComponent,
        CalculatorInputComponent,
        CurrentInputPipe,
        PreviousInputPipe,
      ],
    });
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
