import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface ICalculatorState {
  sum?: number;
  operator?: string;
  currentNumber: number;
}

@Injectable()
export class CalculatorService {
  private _state$: BehaviorSubject<ICalculatorState> = new BehaviorSubject({
    currentNumber: 0,
  });

  getStateAsync(): Observable<ICalculatorState> {
    return this._state$.asObservable();
  }

  changeCurrentNumberSign(): void {
    this._state$.next({
      ...this._state$.value,
      currentNumber: -this._state$.value.currentNumber,
    });
  }

  processDigitInput(number: number): void {
    if (number.toString().length > 1) {
      throw new Error(`Invalid input: ${number} is not a digit.`);
    }
    let currentNumberString = this.parseNumberToString(
      this._state$.value.currentNumber
    );
    const newCurrentNumberString = currentNumberString + number.toString();
    this._state$.next({
      ...this._state$.value,
      currentNumber: this.parseStringToNumber(newCurrentNumberString),
    });
  }

  private parseNumberToString(
    number: number | undefined,
    defaultValue: string = ''
  ): string {
    const isValidNumber = number != undefined;
    const numberAsString = isValidNumber ? number.toString() : defaultValue;
    return numberAsString;
  }

  private parseStringToNumber(numberAsString: string): number {
    const defaultValue = numberAsString.startsWith('-')
      ? -Number.MAX_VALUE
      : Number.MAX_VALUE;
    let parsedNumber: number | undefined = Number.parseFloat(numberAsString);
    if (parsedNumber < -Number.MAX_VALUE || parsedNumber > Number.MAX_VALUE)
      parsedNumber = undefined;
    return parsedNumber ?? defaultValue;
  }
}
