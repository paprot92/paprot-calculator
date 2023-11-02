import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface ICalculatorState {
  sum?: number;
  operator?: string;
  currentNumber?: number;
}

@Injectable()
export class CalculatorService {
  private _state$: BehaviorSubject<ICalculatorState> = new BehaviorSubject({});

  constructor() {}

  getStateAsync(): Observable<ICalculatorState> {
    return this._state$.asObservable();
  }

  processNumberInput(number: Number) {
    const currentNumberString = Number.isInteger(
      this._state$.value.currentNumber
    )
      ? this._state$.value.currentNumber!.toString()
      : '';
    const newCurrentNumberString = currentNumberString + number.toString();
    this._state$.next({
      ...this._state$.value,
      currentNumber: Number.parseInt(newCurrentNumberString) ?? 0,
    });
  }
}
