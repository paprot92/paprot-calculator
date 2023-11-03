import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-calculator-page',
  templateUrl: './calculator-page.component.html',
  styleUrls: ['./calculator-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPageComponent {}
