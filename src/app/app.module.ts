import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorModule } from './calculator/calculator.module';
import { CalculatorPageComponent } from './components/calculator-page/calculator-page.component';

@NgModule({
  declarations: [AppComponent, CalculatorPageComponent],
  imports: [BrowserModule, AppRoutingModule, CalculatorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
