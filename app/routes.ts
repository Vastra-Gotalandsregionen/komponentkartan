
import { KomponentkartaComponent } from "./komponentkarta/komponentkarta.component";
import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    { path: "", redirectTo: "/komponentkarta", pathMatch: "full" },
    { path: "komponentkarta", component: KomponentkartaComponent },
    { path: "**", component: KomponentkartaComponent }
];