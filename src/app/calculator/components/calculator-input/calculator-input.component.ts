import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculator-input',
  templateUrl: './calculator-input.component.html',
  styleUrls: ['./calculator-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorInputComponent {
  @Input() previousInput: string = '';
  @Input() currentInput: string = '';
}
