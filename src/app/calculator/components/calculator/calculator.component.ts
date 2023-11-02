import { Component, inject } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [CalculatorService],
})
export class CalculatorComponent {
  private _calculatorService = inject(CalculatorService);

  calculatorState$ = this._calculatorService.getStateAsync();

  onNumberButtonClick(number: number): void {
    this._calculatorService.processNumberInput(number);
  }
}
