import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CalculatorParser } from '../../services/calculator-parser.service';

export interface ICalculatorState {
  previousInput: string | null;
  currentInput: string | null;
  operator: string | null;
  result: string | null;
}

export const CALCULATOR_DEFAULT_STATE: ICalculatorState = {
  previousInput: null,
  operator: null,
  currentInput: null,
  result: null,
};

@Injectable()
export class CalculatorService {
  private _parser: CalculatorParser = inject(CalculatorParser);
  private _state$: BehaviorSubject<ICalculatorState> = new BehaviorSubject(
    CALCULATOR_DEFAULT_STATE
  );

  protected get state(): ICalculatorState {
    return this._state$.getValue();
  }

  protected get currentInput(): string | null {
    return this.state.currentInput;
  }

  protected get previousInput(): string | null {
    return this.state.previousInput;
  }

  protected get operator(): string | null {
    return this.state.operator;
  }

  getStateAsync(): Observable<ICalculatorState> {
    return this._state$.asObservable();
  }

  processDigitInput(number: number): void {
    if (number.toString().length > 1) {
      throw new Error(`Invalid input: ${number} is not a digit.`);
    }

    const newCurrentInput = this._parser.removeLeadingZeroes(
      `${this.currentInput ?? '0'}${number}`
    );
    const parsedNewCurrentInput = this._parser
      .parseToNumber(newCurrentInput)
      .toString();
    const keepOriginalInput = this._parser.isNumber(newCurrentInput);
    this._state$.next({
      ...this.state,
      previousInput: this.operator ? this.previousInput : null,
      currentInput: keepOriginalInput ? newCurrentInput : parsedNewCurrentInput,
      result: null,
    });
  }

  addComma(): void {
    const currentInput = this.currentInput ?? '0';
    if (currentInput.includes('.')) return;
    const newCurrentInput = currentInput + '.';
    this._state$.next({
      ...this._state$.value,
      currentInput: newCurrentInput,
      result: null,
    });
  }

  changeCurrentNumberSign(): void {
    const currentInput = this.currentInput;
    if (!currentInput) return;
    this._state$.next({
      ...this._state$.value,
      currentInput: (-this._parser.parseToNumber(currentInput)).toString(),
      result: null,
    });
  }

  sum(): void {
    this.execute();
    this.executeSum();
  }

  subtract(): void {
    this.execute();
    this.executeSubtract();
  }

  multiply(): void {
    this.execute();
    this.executeMultiply();
  }

  divide(): void {
    this.execute();
    this.executeDivide();
  }

  execute(): void {
    const isValidOperation =
      this.previousInput && this.currentInput && this.operator;
    if (!isValidOperation) return;
    switch (this.operator) {
      case '+':
        this.executeSum();
        this._state$.next({ ...this._state$.value, operator: null });
        break;
      case '-':
        this.executeSubtract();
        this._state$.next({ ...this._state$.value, operator: null });
        break;
      case '*':
        this.executeMultiply();
        this._state$.next({ ...this._state$.value, operator: null });
        break;
      case '/':
        if (this.executeDivide()) {
          this._state$.next({ ...this._state$.value, operator: null });
        }
        break;

      default:
        break;
    }
  }

  removeDigit(): void {
    const currentInput = this.currentInput;
    const isRemovalProhibited = !currentInput || currentInput.includes('e');
    if (isRemovalProhibited) return;

    const newCurrentInput = currentInput.slice(0, -1);
    this._state$.next({
      ...this._state$.value,
      currentInput: this._parser.isNumber(newCurrentInput)
        ? newCurrentInput
        : null,
    });
  }

  resetCurrentNumber(): void {
    this._state$.next({
      ...this._state$.value,
      currentInput: null,
    });
  }

  reset(): void {
    this._state$.next(CALCULATOR_DEFAULT_STATE);
  }

  private executeSum(): void {
    const argA = this._parser.parseToNumber(this.previousInput ?? '0');
    const argB = this._parser.parseToNumber(this.currentInput ?? '0');
    this._state$.next({
      previousInput: (argA + argB).toString(),
      operator: '+',
      currentInput: null,
      result: (argA + argB).toString(),
    });
  }

  private executeSubtract(): void {
    const argA = this.previousInput
      ? this._parser.parseToNumber(this.previousInput)
      : null;
    const argB = this._parser.parseToNumber(this.currentInput ?? '0');
    this._state$.next({
      previousInput: argA ? (argA - argB).toString() : argB.toString(),
      operator: '-',
      currentInput: null,
      result: argA ? (argA - argB).toString() : argB.toString(),
    });
  }

  private executeMultiply(): void {
    const argA = this.previousInput
      ? this._parser.parseToNumber(this.previousInput)
      : null;
    const argB = this._parser.parseToNumber(this.currentInput ?? '1');
    this._state$.next({
      previousInput: argA ? (argA * argB).toString() : argB.toString(),
      operator: '*',
      currentInput: null,
      result: argA ? (argA * argB).toString() : argB.toString(),
    });
  }

  private executeDivide(): boolean {
    const isDividingByZero =
      this.currentInput != null &&
      this._parser.parseToNumber(this.currentInput) == 0;
    if (isDividingByZero) return false;

    const argA = this.previousInput
      ? this._parser.parseToNumber(this.previousInput)
      : null;
    const argB = this._parser.parseToNumber(this.currentInput ?? '1');
    this._state$.next({
      previousInput: argA ? (argA / argB).toString() : argB.toString(),
      operator: '/',
      currentInput: null,
      result: argA ? (argA / argB).toString() : argB.toString(),
    });
    return true;
  }
}
