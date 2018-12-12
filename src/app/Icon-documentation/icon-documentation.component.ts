import { Component } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-icon-documentation.component',
  templateUrl: './icon-documentation.component.html',
  styleUrls: ['./icon-documentation.component.scss']
})
export class IconDocumentationComponent {
  fav = false;
  isMyFavorite = false;
  iconHtmlExample: string;
  buttonHtmlExample: string;
  iconHtml = `  <vgr-icon (click)="setFavorite()" (keydown)="onKeydown($event)" style="cursor: pointer;" role="button"
    [icon]="'star'" [solid]="fav" [ariaLabel]=" !fav? 'lägg till favorit' : 'ta bort favorit'">
  </vgr-icon>`;
  buttonHtml = `  <vgr-button [buttonStyle]="'discreet'" (click)="isMyFavorite = !isMyFavorite">
    <vgr-icon [icon]="'star'" [solid]="isMyFavorite"></vgr-icon>Min favoritknapp
  </vgr-button>`;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.iconHtmlExample = htmlEncoder.prepareHighlightedSection(this.iconHtml, 'html');
    this.buttonHtmlExample = htmlEncoder.prepareHighlightedSection(this.buttonHtml, 'html');
  }

  setFavorite() {
    this.fav = !this.fav;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.setFavorite();
    }
  }
}
