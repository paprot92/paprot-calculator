import { TestBed } from '@angular/core/testing';

import { CalculatorService, ICalculatorState } from './calculator.service';

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
    expectStateToBeEqualTo(service, { currentNumber: 0 });
  });

  it('should process valid digit input', () => {
    service.processDigitInput(2);
    expectStateToBeEqualTo(service, { currentNumber: 2 });
  });

  it('should process valid digit inputs', () => {
    processMultipleInput(service, [1, 2, 3, 4]);
    expectStateToBeEqualTo(service, { currentNumber: 1234 });
  });

  it('should merge zeros', () => {
    processMultipleInput(service, [0, 0, 0]);
    expectStateToBeEqualTo(service, { currentNumber: 0 });
  });

  it('should handle number max limit', () => {
    setUpCurrentNumberToMaxValue(service);
    expectStateToBeEqualTo(service, { currentNumber: Number.MAX_VALUE });
  });

  it('should handle number min limit', () => {
    setUpCurrentNumberToMaxValue(service);
    service.processDigitInput(9);
    service.changeCurrentNumberSign();
    expectStateToBeEqualTo(service, { currentNumber: -Number.MAX_VALUE });
  });

  it('should handle number beyond max limit', () => {
    setUpCurrentNumberToMaxValue(service);
    service.processDigitInput(9);
    expectStateToBeEqualTo(service, { currentNumber: Number.MAX_VALUE });
  });

  it('should handle number beyond min limit', () => {
    setUpCurrentNumberToMaxValue(service);
    service.changeCurrentNumberSign();
    expectStateToBeEqualTo(service, { currentNumber: -Number.MAX_VALUE });
  });

  it('should remove nothing', () => {
    service.removeDigit();
    expectStateToBeEqualTo(service, { currentNumber: 0 });
  });

  it('should remove digit', () => {
    processMultipleInput(service, [1, 2, 3]);
    service.removeDigit();
    expectStateToBeEqualTo(service, { currentNumber: 12 });
  });

  it('should remove last positive digit', () => {
    service.processDigitInput(2);
    service.removeDigit();
    expectStateToBeEqualTo(service, { currentNumber: 0 });
  });

  it('should remove last negative digit', () => {
    service.processDigitInput(2);
    service.changeCurrentNumberSign();
    service.removeDigit();
    expectStateToBeEqualTo(service, { currentNumber: 0 });
  });

  it('should reset current number', () => {});

  it('should reset state', () => {});

  it('should change current number sign', () => {
    service.processDigitInput(2);
    service.changeCurrentNumberSign();
    expectStateToBeEqualTo(service, { currentNumber: -2 });
  });

  it('should add numbers', () => {});

  it('should handle number max limit + 1', () => {});

  it('should subtract numbers', () => {});

  it('should handle number min limit - 1', () => {});

  it('should multiply numbers', () => {});

  it('should divide numbers', () => {});

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
