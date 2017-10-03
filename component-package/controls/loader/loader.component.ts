import { Component, Input, EventEmitter, Output, HostBinding, OnInit, ElementRef } from '@angular/core'

@Component({
    selector: 'vgr-loader',
    moduleId: module.id,
    templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

    @HostBinding('class.validated-input') hasClass = true;
    @Input() @HostBinding('class.readonly') readonly?: boolean;
    @Input() @HostBinding('class.input__small') small: boolean;

    ngOnInit() {

    }
}
