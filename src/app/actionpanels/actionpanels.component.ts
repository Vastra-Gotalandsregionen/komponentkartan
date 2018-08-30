import { Component } from '@angular/core';
import { NotificationType } from 'vgr-komponentkartan';
import { HtmlEncodeService } from '../html-encode.service';


@Component({
  selector: 'app-action-panel',
  templateUrl: './actionpanels.component.html'
})
export class ActionPanelsComponent {

  expanded = false;

  exampleCode = `
  <vgr-action-panel [showCloseButton]="true" (expandedChanged)="expanded=$event" [expanded]="expanded"
    [title]="'Ett exempel på en action panel'">
    <vgr-button>En knapp</vgr-button>
    <p>Lite text...</p>
  </vgr-action-panel>`;

  exampleCodeMarkup;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');
  }

}
