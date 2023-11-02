import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorPageComponent } from './components/calculator-page/calculator-page.component';

const routes: Routes = [
  { path: 'calculator', component: CalculatorPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'calculator' },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
