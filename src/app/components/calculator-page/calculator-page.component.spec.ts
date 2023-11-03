import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorPageComponent } from './calculator-page.component';
import { CalculatorModule } from 'src/app/calculator/calculator.module';

describe('CalculatorPageComponent', () => {
  let component: CalculatorPageComponent;
  let fixture: ComponentFixture<CalculatorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorPageComponent],
      imports: [CalculatorModule],
    });
    fixture = TestBed.createComponent(CalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
