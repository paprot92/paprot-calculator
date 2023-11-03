import { Pipe, PipeTransform } from '@angular/core';
import { ICalculatorState } from './calculator.service';

@Pipe({
  name: 'previousInput',
})
export class PreviousInputPipe implements PipeTransform {
  transform(calculatorState: ICalculatorState): string {
    const sumPart = calculatorState?.sum ? calculatorState.sum.toString() : '';
    const operatorPart = calculatorState?.operator
      ? calculatorState.operator
      : '';
    return sumPart + operatorPart;
  }
}
