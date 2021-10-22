import { AfterViewInit, Component } from '@angular/core';
import { HighlightCodeDirective } from '../directives/highlight-code.directive';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-action-panel',
  templateUrl: './actionpanels.component.html',
  styleUrls: ['./actionpanels.component.scss']
})
export class ActionPanelsComponent {

  open1 = false;
  showCloseButton1 = true;
  open2 = false;
  openError = false;

  exampleCode = `
  <pre>
  <vgr-action-panel [showCloseButton]="true" (openChanged)="open=$event" [open]="open"
    [title]="'Ett exempel på en action panel'">
    <vgr-button>En knapp</vgr-button>
    <p>Lite text...</p>
  </vgr-action-panel>
  </pre>`;

  exampleCodeMarkup;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');

  }

  getActionText(open: boolean): string {
    if (open) {
      return 'Stäng';
    } else {
      return 'Öppna';
    }
  }

}
