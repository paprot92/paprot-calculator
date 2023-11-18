import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalculatorPromptComponent } from './components/calculator-prompt/calculator-prompt.component';

@NgModule({
  declarations: [CalculatorComponent, CalculatorPromptComponent],
  imports: [CommonModule],
  exports: [CalculatorComponent],
})
export class CalculatorModule {}
