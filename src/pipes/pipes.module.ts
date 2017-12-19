import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';
import { PhonePipe } from './phone/phone';
@NgModule({
	declarations: [FilterPipe,
    PhonePipe],
	imports: [],
	exports: [FilterPipe,
    PhonePipe]
})
export class PipesModule {}
