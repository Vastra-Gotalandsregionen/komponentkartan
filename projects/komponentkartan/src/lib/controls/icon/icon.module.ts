import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        FontAwesomeModule
    ]
})

export class IconModule {
    constructor(library: FaIconLibrary) {
        // Add an icon to the library for convenient access in other components
        library.addIconPacks(fas, far);
    }
}