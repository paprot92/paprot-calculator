import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface ICalculatorState {
  currentInput: string;
  previousInput?: string;
  operator?: string;
  total?: number;
}

export const CALCULATOR_DEFAULT_STATE: ICalculatorState = {
  currentInput: '0',
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
      currentInput: this.parseStringToNumber(newCurrentInput).toString(),
    });
  }

  addComma(): void {
    if (this.getCurrentInput().includes('.')) return;
    const newCurrentInput = this.getCurrentInput() + '.';
    this._state$.next({
      ...this._state$.value,
      currentInput: newCurrentInput,
    });
  }

  changeCurrentNumberSign(): void {
    this._state$.next({
      ...this._state$.value,
      currentInput: (-this.parseStringToNumber(
        this.getCurrentInput()
      )).toString(),
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
    });
  }

  execute(): void {
    switch (this._state$.value.operator) {
      case '+':
        this.sum();
        this._state$.next({ ...this._state$.value, operator: undefined });
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
