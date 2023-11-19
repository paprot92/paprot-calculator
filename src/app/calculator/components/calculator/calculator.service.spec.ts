import { TestBed } from '@angular/core/testing';

import {
  CALCULATOR_DEFAULT_STATE,
  CalculatorService,
  ICalculatorState,
} from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CalculatorService] });
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial state', () => {
    expectStateToBeEqualTo(service, CALCULATOR_DEFAULT_STATE);
  });

  it('processDigitInput: should process valid digit input', () => {
    service.processDigitInput(2);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '2',
    });
  });

  it('processDigitInput: should process valid digit inputs', () => {
    processMultipleInput(service, [1, 2, 3, 4]);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '1234',
    });
  });

  it('processDigitInput: should merge zeros', () => {
    processMultipleInput(service, [0, 0, 0]);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '0',
    });
  });

  it('processDigitInput: should handle number max limit', () => {
    setUpCurrentNumberToMaxValue(service);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: Number.MAX_SAFE_INTEGER.toString(),
    });
  });

  it('processDigitInput: should handle number beyond max limit', () => {
    setUpCurrentNumberToMaxValue(service);
    service.processDigitInput(9);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: Number.MAX_SAFE_INTEGER.toString(),
    });
  });

  it('processDigitInput: should handle 0.00001', () => {
    service.processDigitInput(0);
    service.addComma();
    processMultipleInput(service, [0, 0, 0, 0]);
    service.processDigitInput(1);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '0.00001',
    });
  });

  it('changeCurrentNumberSign: should change current number sign', () => {
    service.processDigitInput(2);
    service.changeCurrentNumberSign();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '-2',
    });
  });

  it('changeCurrentNumberSign: should handle number min limit', () => {
    setUpCurrentNumberToMaxValue(service);
    service.processDigitInput(9);
    service.changeCurrentNumberSign();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: (-Number.MAX_SAFE_INTEGER).toString(),
    });
  });

  it('changeCurrentNumberSign: should handle number beyond min limit', () => {
    setUpCurrentNumberToMaxValue(service);
    service.changeCurrentNumberSign();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: (-Number.MAX_SAFE_INTEGER).toString(),
    });
  });

  it('addComma: should add comma', () => {
    processMultipleInput(service, [1, 2, 3, 4]);
    service.addComma();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '1234.',
    });
  });

  it('addComma: should not add double comma', () => {
    processMultipleInput(service, [1, 2, 3, 4]);
    service.addComma();
    service.addComma();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '1234.',
    });
  });

  it('addComma: should not add comma twice', () => {
    processMultipleInput(service, [1, 2]);
    service.addComma();
    processMultipleInput(service, [3, 4]);
    service.addComma();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '12.34',
    });
  });

  it('remove digit should do nothing', () => {
    service.removeDigit();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
    });
  });

  it('removeDigit: should remove digit', () => {
    processMultipleInput(service, [1, 2, 3]);
    service.removeDigit();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '12',
    });
  });

  it('removeDigit: should remove last positive digit', () => {
    service.processDigitInput(2);
    service.removeDigit();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
    });
  });

  it('removeDigit: should remove last negative digit', () => {
    service.processDigitInput(2);
    service.changeCurrentNumberSign();
    service.removeDigit();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
    });
  });

  it('removeDigit: should remove comma', () => {
    service.addComma();
    service.removeDigit();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '0',
    });
  });

  it('resetCurrentNumber: reset current number should do nothing', () => {
    service.resetCurrentNumber();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
    });
  });

  it('resetCurrentNumber: should reset current number', () => {
    service.processDigitInput(2);
    service.resetCurrentNumber();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
    });
  });

  it('reset: should reset state', () => {
    service.processDigitInput(2);
    service.reset();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
    });
  });

  it('should reset result and previous input', () => {
    service.processDigitInput(2);
    service.sum();
    service.processDigitInput(3);
    service.execute();
    service.processDigitInput(1);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      currentInput: '1',
    });
  });

  it('sum should set operator and result 1', () => {
    service.sum();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '0',
      operator: '+',
      result: '0',
    });
  });

  it('sum should set operator and result 2', () => {
    service.processDigitInput(2);
    service.sum();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '2',
      operator: '+',
      result: '2',
    });
  });

  it('sum should set operator and result 2', () => {
    service.processDigitInput(2);
    service.sum();
    service.processDigitInput(3);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '2',
      operator: '+',
      currentInput: '3',
    });
  });

  it('should sum numbers 1', () => {
    service.processDigitInput(2);
    service.sum();
    service.processDigitInput(3);
    service.sum();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '5',
      operator: '+',
      result: '5',
    });
  });

  it('should sum numbers 2', () => {
    service.processDigitInput(2);
    service.sum();
    service.processDigitInput(3);
    service.execute();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '5',
      result: '5',
    });
  });

  it('should sum numbers 3', () => {
    service.processDigitInput(3);
    service.multiply();
    service.processDigitInput(2);
    service.execute();
    service.sum();
    service.processDigitInput(2);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '6',
      operator: '+',
      currentInput: '2',
    });
  });

  it('should subtract numbers 1', () => {
    service.processDigitInput(2);
    service.subtract();
    service.processDigitInput(3);
    service.subtract();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '-1',
      operator: '-',
      result: '-1',
    });
  });

  it('should subtract numbers 2', () => {
    service.processDigitInput(3);
    service.subtract();
    service.processDigitInput(2);
    service.execute();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '1',
      result: '1',
    });
  });

  it('should subtract numbers 3', () => {
    service.processDigitInput(3);
    service.sum();
    service.processDigitInput(2);
    service.execute();
    service.subtract();
    service.processDigitInput(2);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '5',
      operator: '-',
      currentInput: '2',
    });
  });

  it('should multiply numbers 1', () => {
    service.processDigitInput(2);
    service.multiply();
    service.processDigitInput(3);
    service.multiply();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '6',
      operator: '*',
      result: '6',
    });
  });

  it('should multiply numbers 2', () => {
    service.processDigitInput(3);
    service.multiply();
    service.processDigitInput(2);
    service.execute();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '6',
      result: '6',
    });
  });

  it('should multiply numbers 3', () => {
    service.processDigitInput(3);
    service.sum();
    service.processDigitInput(2);
    service.execute();
    service.multiply();
    service.processDigitInput(2);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '5',
      operator: '*',
      currentInput: '2',
    });
  });

  it('should divide numbers 1', () => {
    service.processDigitInput(6);
    service.divide();
    service.processDigitInput(2);
    service.divide();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '3',
      operator: '/',
      result: '3',
    });
  });

  it('should divide numbers 2', () => {
    service.processDigitInput(6);
    service.divide();
    service.processDigitInput(2);
    service.execute();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '3',
      result: '3',
    });
  });

  it('should divide numbers 3', () => {
    service.processDigitInput(6);
    service.multiply();
    service.processDigitInput(2);
    service.execute();
    service.divide();
    service.processDigitInput(2);
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '12',
      operator: '/',
      currentInput: '2',
    });
  });

  it('divide: should not divide by 0', () => {
    service.processDigitInput(6);
    service.divide();
    service.processDigitInput(0);
    service.divide();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '6',
      currentInput: '0',
      operator: '/',
    });
  });

  it('execute: should not divide by 0', () => {
    service.processDigitInput(6);
    service.divide();
    service.processDigitInput(0);
    service.execute();
    expectStateToBeEqualTo(service, {
      ...CALCULATOR_DEFAULT_STATE,
      previousInput: '6',
      currentInput: '0',
      operator: '/',
    });
  });

  function setUpCurrentNumberToMaxValue(service: CalculatorService) {
    processMultipleInput(
      service,
      [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
    );
  }

  function processMultipleInput(service: CalculatorService, inputs: number[]) {
    inputs.forEach((input) => service.processDigitInput(input));
  }

  function expectStateToBeEqualTo(
    service: CalculatorService,
    expectedState: ICalculatorState
  ) {
    service.getStateAsync().subscribe((state) => {
      expect(state).toEqual(expectedState);
    });
  }
});
