import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
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
    class: 'w-1/4 border-r border-b border-indigo-400',
  },
})
export class CalculatorButtonComponent {
  public isCommand = input(false, { transform: booleanAttribute });
  public isDoubleSize = input(false, { transform: booleanAttribute });
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public onClick = output<string>();

  public value = input<string>();

  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerHTML;
    this.onClick.emit(value.trim());
  }
}
