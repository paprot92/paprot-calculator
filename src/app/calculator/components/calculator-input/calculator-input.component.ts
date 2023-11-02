import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculator-input',
  templateUrl: './calculator-input.component.html',
  styleUrls: ['./calculator-input.component.css'],
})
export class CalculatorInputComponent {
  @Input() previousInput: string = '';
  @Input() currentInput: string = '';
}
