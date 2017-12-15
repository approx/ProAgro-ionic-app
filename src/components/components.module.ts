import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar';
import { UserComponent } from './user/user';
@NgModule({
	declarations: [NavBarComponent,
    UserComponent],
	imports: [],
	exports: [NavBarComponent,
    UserComponent]
})
export class ComponentsModule {}
