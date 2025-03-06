import { Component } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
    selector: 'app-skeleton-loader',
    templateUrl: 'skeleton-loader.component.html',
    standalone: false
})

export class SkeletonLoaderComponent {
  title = 'app';
  actionInProgress = false;

  exampleCode = `<div style="align-self:middle">
      <span>Default</span>
      <vgr-skeleton-loader [active]="actionInProgress"></vgr-skeleton-loader>
    </div>
    <div style="align-self:middle">
      <span>Cirkulär (med default)</span>
      <vgr-skeleton-loader [active]="actionInProgress" [circle]="true"></vgr-skeleton-loader>
    </div>
    <div style="align-self:middle">
      <span>width (130px) och height (130px)</span>
      <vgr-skeleton-loader [active]="actionInProgress" width="130px" height="130px"></vgr-skeleton-loader>
    </div>
    <div style="align-self:middle">
      <span>width (130px) och height (130px) och cirkulär</span>
      <vgr-skeleton-loader [active]="actionInProgress" width="130px" height="130px" [circle]="true"></vgr-skeleton-loader>
    </div>`;

  exampleCodeMarkup;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');
  }

  get buttonText(): string {
    if (!this.actionInProgress) {
      return 'Start';
    } else {
      return 'Stop';
    }
  }
}
