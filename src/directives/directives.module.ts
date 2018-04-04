import { NgModule } from '@angular/core';
import { MoneyDirective } from './money/money';
import { OnlyNumberDirective } from './only-number/only-number';
import { ModelMaskDirective } from './model-mask/model-mask';
@NgModule({
	declarations: [MoneyDirective,
    OnlyNumberDirective,
    ModelMaskDirective],
	imports: [],
	exports: [MoneyDirective,
    OnlyNumberDirective,
    ModelMaskDirective]
})
export class DirectivesModule {}
