import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('-');
    service.constructNumber('C');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('-');
    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('3');
  });
  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('1');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('-1');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('3');
    service.constructNumber('=');
    expect(service.resultText()).toBe('6');
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('6');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('3');
  });

  it('should handle decimal input correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('2');
    expect(service.resultText()).toBe('1.2');
  });

  it('should handle multiple decimal input correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('2');
    service.constructNumber('.');
    expect(service.resultText()).toBe('1.2');
  });

  it('should handle negative numbers correctly', () => {
    service.constructNumber('+/-');
    service.constructNumber('1');
    expect(service.resultText()).toBe('-1');
  });

  it('should handle multiple negative numbers correctly', () => {
    service.constructNumber('+/-');
    service.constructNumber('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');
  });

  it('should handle decimal numbers correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('2');
    expect(service.resultText()).toBe('1.2');
  });

  it('should handle multiple decimal numbers correctly', () => {
    service.constructNumber('.');
    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('0.4');
  });

  it('should handle percentage correctly', () => {
    service.constructNumber('100');
    service.constructNumber('÷');
    service.constructNumber('2');
    service.constructNumber('=');
    expect(service.resultText()).toBe('0');
  });

  it('should handle backspace correctly', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');
  });
  it('should handle backspace 1 step to 0 correctly', () => {
    service.constructNumber('1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should convert single digit to "0"', () => {
    service.resultText.set('5');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length correctly', () => {
    service.resultText.set('1234567890');
    service.constructNumber('1');
    expect(service.resultText()).toBe('1234567890');
    expect(service.resultText().length).toBe(10);
  });
});
