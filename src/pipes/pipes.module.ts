import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { PhonePipe } from './phone/phone';
import { MoneyPipe } from './money/money';
@NgModule({
	declarations: [FilterPipe,
    PhonePipe,
    MoneyPipe,
    MoneyPipe],
	imports: [],
	exports: [FilterPipe,
    PhonePipe,
    MoneyPipe,
    MoneyPipe]
})
export class PipesModule {}
