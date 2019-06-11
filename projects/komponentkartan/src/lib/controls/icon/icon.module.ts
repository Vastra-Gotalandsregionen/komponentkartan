import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        FontAwesomeModule
    ]
})

export class IconModule {
    constructor() {
        // Add an icon to the library for convenient access in other components
        library.add(fas, far);
    }
}