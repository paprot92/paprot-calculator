import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalculatorInputComponent } from './components/calculator-input/calculator-input.component';

@NgModule({
  declarations: [CalculatorComponent, CalculatorInputComponent],
  imports: [CommonModule],
  exports: [CalculatorComponent],
})
export class CalculatorModule {}
