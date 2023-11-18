import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
    const newCurrentInput = this.getCurrentInput() + number.toString();
    this._state$.next({
      ...this._state$.value,
      previousInput: this._state$.value.operator
        ? this._state$.value.previousInput
        : null,
      currentInput: this.parseStringToNumber(newCurrentInput).toString(),
      result: null,
    });
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
      currentInput: (-this.parseStringToNumber(
        this.getCurrentInput()
      )).toString(),
      result: null,
    });
  }

  sum(): void {
    const argA = this.parseStringToNumber(
      this._state$.value.previousInput ?? '0'
    );
    const argB = this.parseStringToNumber(this.getCurrentInput());
    this._state$.next({
      previousInput: (argA + argB).toString(),
      operator: '+',
      currentInput: '0',
      result: (argA + argB).toString(),
    });
  }

  execute(): void {
    switch (this._state$.value.operator) {
      case '+':
        this.sum();
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

  private parseStringToNumber(numberAsString: string): number {
    const defaultValue = numberAsString.startsWith('-')
      ? -Number.MAX_VALUE
      : Number.MAX_VALUE;
    let parsedNumber: number | undefined = +numberAsString;
    if (Number.isNaN(parsedNumber)) parsedNumber = 0;
    if (parsedNumber < -Number.MAX_VALUE || parsedNumber > Number.MAX_VALUE)
      parsedNumber = undefined;
    return parsedNumber ?? defaultValue;
  }
}
