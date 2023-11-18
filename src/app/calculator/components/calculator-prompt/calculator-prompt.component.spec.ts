import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorPromptComponent } from './calculator-prompt.component';

describe('CalculatorPromptComponent', () => {
  let component: CalculatorPromptComponent;
  let fixture: ComponentFixture<CalculatorPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorPromptComponent]
    });
    fixture = TestBed.createComponent(CalculatorPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
