import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);

  public isCommand = input(false, { transform: booleanAttribute });
  public isDoubleSize = input(false, { transform: booleanAttribute });
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public onClick = output<string>();

  public value = input<string>();

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerHTML;
    this.onClick.emit(value.trim());
  }
}
