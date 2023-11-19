import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorParser {
  parseToString(numberAsString: number): string {
    return numberAsString.toString();
  }

  parseToNumber(numberAsString: string): number {
    const defaultValue = numberAsString.startsWith('-')
      ? -Number.MAX_SAFE_INTEGER
      : Number.MAX_SAFE_INTEGER;
    let parsedNumber: number | null = +numberAsString;
    if (Number.isNaN(parsedNumber)) parsedNumber = 0;

    if (
      parsedNumber < -Number.MAX_SAFE_INTEGER ||
      parsedNumber > Number.MAX_SAFE_INTEGER
    )
      parsedNumber = null;
    return parsedNumber ?? defaultValue;
  }

  isNumber(numberAsString: string): boolean {
    let parsedNumber: number | null = +numberAsString;
    return (
      !Number.isNaN(parsedNumber) &&
      parsedNumber >= -Number.MAX_SAFE_INTEGER &&
      parsedNumber <= Number.MAX_SAFE_INTEGER
    );
  }

  removeLeadingZeroes(numberAsString: string): string {
    const splitedStringNumber = numberAsString.split('.');
    const integerPart = splitedStringNumber[0];
    const decimalPart = splitedStringNumber[1];
    return `${this.parseToNumber(integerPart)}${decimalPart ? '.' : ''}${
      decimalPart ?? ''
    }`;
  }
}
