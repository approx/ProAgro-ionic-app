import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { PhonePipe } from './phone/phone';
import { MoneyPipe } from './money/money';
import { EspecificationsPipe } from './especifications/especifications';
@NgModule({
	declarations: [FilterPipe,
    PhonePipe,
    MoneyPipe,
    MoneyPipe,
    EspecificationsPipe],
	imports: [],
	exports: [FilterPipe,
    PhonePipe,
    MoneyPipe,
    MoneyPipe,
    EspecificationsPipe]
})
export class PipesModule {}
