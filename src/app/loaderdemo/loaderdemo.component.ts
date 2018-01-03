import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'vgr-loader-demo',
    templateUrl: 'loaderdemo.component.html'
})
export class LoaderDemoComponent {
    title = 'app';
    actionInProgress = false;

    get buttonText(): string {
        if (!this.actionInProgress) {
            return 'Start';
        } else {
            return 'Stop';
        }
    }

    onClick(event: MouseEvent) {
        console.log('Click! ');
        this.actionInProgress = !this.actionInProgress
    }
}
