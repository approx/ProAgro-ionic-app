import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar';
import { UserComponent } from './user/user';
import { ContactComponent } from './contact/contact';
import { AddressComponent } from './address/address';
@NgModule({
	declarations: [NavBarComponent,
    UserComponent,
    ContactComponent,
    AddressComponent],
	imports: [],
	exports: [NavBarComponent,
    UserComponent,
    ContactComponent,
    AddressComponent]
})
export class ComponentsModule {}
