import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalculatorInputComponent } from './components/calculator-input/calculator-input.component';
import { CurrentInputPipe } from './components/calculator/current-input.pipe';
import { PreviousInputPipe } from './components/calculator/previous-input.pipe';

@NgModule({
  declarations: [
    CalculatorComponent,
    CalculatorInputComponent,
    CurrentInputPipe,
    PreviousInputPipe,
  ],
  imports: [CommonModule],
  exports: [CalculatorComponent],
})
export class CalculatorModule {}
