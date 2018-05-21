import { Component, OnInit } from '@angular/core';
import {
  ExpandableRow, RowNotification, NotificationType, ModalService,
  SortChangedArgs, ListHeaderComponent, SortDirection, Notification
} from 'vgr-komponentkartan';
import { Examples } from '../examples';
import { HtmlEncodeService } from '../../../html-encode.service';

@Component({
  selector: 'app-listexample',
  templateUrl: './listexample.component.html',
  styleUrls: ['./listexample.component.scss']
})
export class ListexampleComponent {
  typeScriptAdvancedListMarkup: string;
  htmlAdvancedListMarkup: string;
  examples: Examples = new Examples();
  panelNotification: RowNotification;
  listNotification: Notification;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.typeScriptAdvancedListMarkup =
      htmlEncoder.prepareHighlightedSection(this.examples.typescriptListNotificationMarkup, 'typescript');
    this.htmlAdvancedListMarkup =
      htmlEncoder.prepareHighlightedSection(this.examples.htmlListNotificationMarkup);

    this.listNotification = {
      message: 'Här är ett exempel på en list-notifikation. De kan användas om det t.ex. blir något fel när man hämtar datan från servicen.',
      icon: 'vgr-icon-exclamation--red'
    };

  }
}
