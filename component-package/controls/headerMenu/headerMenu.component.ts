import { Component,Input } from "@angular/core"
import {IHeaderMenu} from "../../models/headermenu.model"

@Component({
    selector: "vgr-header-menu",
    moduleId: module.id,
    templateUrl: "./headerMenu.component.html",
       
})

export class HeaderMenuComponent {
 @Input() menuoptions: IHeaderMenu[];
 hidden: boolean;


 constructor() {
     this.hidden = false;
 }
 

    toggleHeaderMenu(event: Event){

        //let target = event.target || event.srcElement || event.currentTarget;
        //let element = $(target);
        //if (!element.is("input") && !element.is(".scroll-bar")) {
       //    this.hidden = !this.hidden;
       //}
        }
    }


