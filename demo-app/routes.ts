
import { KomponentkartaComponent } from "./komponentkarta/komponentkarta.component";
import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    { path: "**", component: KomponentkartaComponent }
];