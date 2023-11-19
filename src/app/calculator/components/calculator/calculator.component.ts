import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [CalculatorService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  private _calculatorService = inject(CalculatorService);

  calculatorState$ = this._calculatorService.getStateAsync();

  onNumberButtonClick(number: number): void {
    this._calculatorService.processDigitInput(number);
  }

  onChangeSignButtonClick(): void {
    this._calculatorService.changeCurrentNumberSign();
  }

  onRemoveDigitButtonClick(): void {
    this._calculatorService.removeDigit();
  }

  onResetCurrentNumberButtonClick(): void {
    this._calculatorService.resetCurrentNumber();
  }

  onResetButtonClick(): void {
    this._calculatorService.reset();
  }

  onCommaButtonClick(): void {
    this._calculatorService.addComma();
  }

  onSumButtonClick(): void {
    this._calculatorService.sum();
  }

  onSubtractButtonClick(): void {
    this._calculatorService.subtract();
  }

  onEqualsButtonClick(): void {
    this._calculatorService.execute();
  }
}
