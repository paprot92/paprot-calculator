import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { CalculatorInputComponent } from './components/calculator-input/calculator-input.component';
import { CalculatorButtonComponent } from './components/calculator-button/calculator-button.component';

@NgModule({
  declarations: [CalculatorComponent, CalculatorInputComponent, CalculatorButtonComponent],
  imports: [CommonModule],
  exports: [CalculatorComponent],
})
export class CalculatorModule {}
