import { CalculatorService } from '@/calculator/services/calculator.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine
    .createSpy('subResultText')
    .and.returnValue('20');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');
  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useClass: MockCalculatorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    mockCalculatorService = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;
    // fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('30');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();
    expect(compiled.querySelector('span')?.innerText).toBe('30 -');
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('30');
    expect(component.lastOperator()).toBe('-');
  });

  it('should handle keyboard events', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
    const eventESC = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventESC);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    fixture.detectChanges();
    expect(component.resultText()).toBe('123');
  });
});
