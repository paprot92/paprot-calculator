import { Pipe, PipeTransform } from '@angular/core';
import { ICalculatorState } from './calculator.service';

@Pipe({
  name: 'currentInput',
})
export class CurrentInputPipe implements PipeTransform {
  transform(calculatorState: ICalculatorState): string {
    return Number.isInteger(calculatorState?.currentNumber)
      ? calculatorState?.currentNumber!.toString()
      : '';
  }
}
