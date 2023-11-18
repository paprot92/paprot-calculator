import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculator-prompt',
  templateUrl: './calculator-prompt.component.html',
  styleUrls: ['./calculator-prompt.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPromptComponent {
  @Input() previousInput: string | null = null;
  @Input() operator: string | null = null;
  @Input() currentInput: string | null = null;
  @Input() result: string | null = null;
}
