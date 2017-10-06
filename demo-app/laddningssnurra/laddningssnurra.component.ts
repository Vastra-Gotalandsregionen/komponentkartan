// import { Component } from '@angular/core';

// @Component({
//   moduleId: module.id,
//   selector: 'vgr-laddning',
//   templateUrl: 'laddningssnurra.component.html'
// })
// export class LaddningsSnurraComponent {

// }

import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'vgr-laddningssnurra',
  templateUrl: 'laddningssnurra.component.html'
})
export class LaddningsSnurraComponent {
  title = 'app';
  actionInProgress = false;

  get buttonText(): string {
    if (!this.actionInProgress) {
      return 'Start';
    } else {
      return 'Stop';
    }
  }
}