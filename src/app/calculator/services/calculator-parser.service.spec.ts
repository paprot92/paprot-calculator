import { TestBed } from '@angular/core/testing';

import { CalculatorParser } from './calculator-parser.service';

describe('CalculatorParser', () => {
  let service: CalculatorParser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorParser);
  });

  it('parseToNumber: should be created', () => {
    expect(service).toBeTruthy();
  });

  it('parseToNumber: should parse empty string to 0', () => {
    const result = service.parseToNumber('');
    expect(result).toBe(0);
  });

  it('parseToNumber: should parse zero string', () => {
    const result = service.parseToNumber('0');
    expect(result).toBe(0);
  });

  it('parseToNumber: should parse positive number string', () => {
    const result = service.parseToNumber('1');
    expect(result).toBe(1);
  });

  it('parseToNumber: should parse positive number string with leading +', () => {
    const result = service.parseToNumber('+1');
    expect(result).toBe(1);
  });

  it('parseToNumber: should parse negative number string', () => {
    const result = service.parseToNumber('-1');
    expect(result).toBe(-1);
  });

  it('parseToNumber: should parse handle max number', () => {
    const result = service.parseToNumber(Number.MAX_SAFE_INTEGER.toString());
    expect(result).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('parseToNumber: should parse handle min number', () => {
    const result = service.parseToNumber((-Number.MAX_SAFE_INTEGER).toString());
    expect(result).toBe(-Number.MAX_SAFE_INTEGER);
  });

  it('parseToNumber: should parse handle extra big number', () => {
    const result = service.parseToNumber('9007199254740990');
    expect(result).toBe(9007199254740990);
  });

  it('parseToNumber: should parse handle extra small number', () => {
    const result = service.parseToNumber('-9007199254740990');
    expect(result).toBe(-9007199254740990);
  });

  it('parseToNumber: should parse handle too big number', () => {
    const result = service.parseToNumber('99999999999999999');
    expect(result).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('parseToNumber: should parse handle too small number', () => {
    const result = service.parseToNumber('-99999999999999999');
    expect(result).toBe(-Number.MAX_SAFE_INTEGER);
  });

  it('parseToNumber: should parse decimal number', () => {
    const result = service.parseToNumber('0.00000001');
    expect(result).toBe(0.00000001);
  });

  it('parseToNumber: should parse extra small decimal number', () => {
    const result = service.parseToNumber('0.00000000000000000000000001');
    expect(result).toBe(0.00000000000000000000000001);
  });

  it('parseToString: should parse integer to string', () => {
    const result = service.parseToString(12345);
    expect(result).toBe('12345');
  });

  it('parseToString: should parse decimal to string', () => {
    const result = service.parseToString(0.0001);
    expect(result).toBe('0.0001');
  });

  it('removeLeadingZeroes: should do nothing', () => {
    const result = service.removeLeadingZeroes('0.00000010');
    expect(result).toBe('0.00000010');
  });

  it('removeLeadingZeroes: should remove leading zeroes', () => {
    const result = service.removeLeadingZeroes('0001234');
    expect(result).toBe('1234');
  });

  it('removeLeadingZeroes: should not remove trailing dot', () => {
    const result = service.removeLeadingZeroes('0.');
    expect(result).toBe('0.');
  });

  it('removeLeadingZeroes: should not remove trailing zero', () => {
    const result = service.removeLeadingZeroes('0.0');
    expect(result).toBe('0.0');
  });

  it('isNumber: should return true for 0', () => {
    const result = service.isNumber('0');
    expect(result).toBeTruthy();
  });

  it('isNumber: should return false for empty string', () => {
    const result = service.isNumber('');
    expect(result).toBeFalsy();
  });
});
