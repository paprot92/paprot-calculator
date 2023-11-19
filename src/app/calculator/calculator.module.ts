import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalculatorPromptComponent } from './components/calculator-prompt/calculator-prompt.component';
import { CalculatorParser } from './services/calculator-parser.service';

@NgModule({
  declarations: [CalculatorComponent, CalculatorPromptComponent],
  imports: [CommonModule],
  exports: [CalculatorComponent],
  providers: [CalculatorParser],
})
export class CalculatorModule {}
