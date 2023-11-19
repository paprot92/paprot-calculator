import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CalculatorParser } from '../../services/calculator-parser.service';

export interface ICalculatorState {
  previousInput: string | null;
  currentInput: string;
  operator: string | null;
  result: string | null;
}

export const CALCULATOR_DEFAULT_STATE: ICalculatorState = {
  previousInput: null,
  operator: null,
  currentInput: '0',
  result: null,
};

@Injectable()
export class CalculatorService {
  private _parser: CalculatorParser = inject(CalculatorParser);
  private _state$: BehaviorSubject<ICalculatorState> = new BehaviorSubject(
    CALCULATOR_DEFAULT_STATE
  );

  getStateAsync(): Observable<ICalculatorState> {
    return this._state$.asObservable();
  }

  processDigitInput(number: number): void {
    if (number.toString().length > 1) {
      throw new Error(`Invalid input: ${number} is not a digit.`);
    }
    const newCurrentInput = this._parser.removeLeadingZeroes(
      this.getCurrentInput() + number.toString()
    );
    const parsedNewCurrentInput = this._parser
      .parseToNumber(newCurrentInput)
      .toString();
    const keepOriginalInput = this._parser.isNumber(newCurrentInput);
    console.log('processDigitInput1', { ...this._state$.value });

    this._state$.next({
      ...this._state$.value,
      previousInput: this._state$.value.operator
        ? this._state$.value.previousInput
        : null,
      currentInput: keepOriginalInput ? newCurrentInput : parsedNewCurrentInput,
      result: null,
    });
    console.log('processDigitInput2', { ...this._state$.value });
  }

  addComma(): void {
    if (this.getCurrentInput().includes('.')) return;
    const newCurrentInput = this.getCurrentInput() + '.';
    this._state$.next({
      ...this._state$.value,
      currentInput: newCurrentInput,
      result: null,
    });
  }

  changeCurrentNumberSign(): void {
    this._state$.next({
      ...this._state$.value,
      currentInput: (-this._parser.parseToNumber(
        this.getCurrentInput()
      )).toString(),
      result: null,
    });
  }

  sum(): void {
    const argA = this._parser.parseToNumber(
      this._state$.value.previousInput ?? '0'
    );
    const argB = this._parser.parseToNumber(this.getCurrentInput());
    this._state$.next({
      previousInput: (argA + argB).toString(),
      operator: '+',
      currentInput: '0',
      result: (argA + argB).toString(),
    });
  }

  subtract(): void {
    const argA = this._state$.value.previousInput
      ? this._parser.parseToNumber(this._state$.value.previousInput)
      : null;
    const argB = this._parser.parseToNumber(this.getCurrentInput());
    this._state$.next({
      previousInput: argA ? (argA - argB).toString() : argB.toString(),
      operator: '-',
      currentInput: '0',
      result: argA ? (argA - argB).toString() : argB.toString(),
    });
  }

  execute(): void {
    switch (this._state$.value.operator) {
      case '+':
        this.sum();
        this._state$.next({ ...this._state$.value, operator: null });
        break;
      case '-':
        this.subtract();
        this._state$.next({ ...this._state$.value, operator: null });
        break;

      default:
        break;
    }
  }

  removeDigit(): void {
    const isRemovalProhibited = this.getCurrentInput().includes('e');
    if (isRemovalProhibited) return;

    const newCurrentInput = this.getCurrentInput().slice(0, -1);
    this._state$.next({
      ...this._state$.value,
      currentInput: +newCurrentInput ? newCurrentInput : '0',
    });
  }

  resetCurrentNumber(): void {
    this._state$.next({
      ...this._state$.value,
      currentInput: '0',
    });
  }

  reset(): void {
    this._state$.next(CALCULATOR_DEFAULT_STATE);
  }

  private getCurrentInput(): string {
    return this._state$.value.currentInput;
  }
}
