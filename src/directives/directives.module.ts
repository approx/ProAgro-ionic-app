import { NgModule } from '@angular/core';
import { MoneyDirective } from './money/money';
import { OnlyNumberDirective } from './only-number/only-number';
@NgModule({
	declarations: [MoneyDirective,
    OnlyNumberDirective],
	imports: [],
	exports: [MoneyDirective,
    OnlyNumberDirective]
})
export class DirectivesModule {}
