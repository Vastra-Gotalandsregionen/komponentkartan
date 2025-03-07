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

  exampleCode = `<div style="margin-bottom: 30px;">
      <h3 style="margin-bottom: 10px; font-weight: bold;">Text exempel</h3>
      <div *ngIf="exampleLoading">
        <vgr-skeleton-loader [active]="exampleLoading" width="90%"></vgr-skeleton-loader>
        <vgr-skeleton-loader [active]="exampleLoading" width="100%"></vgr-skeleton-loader>
        <vgr-skeleton-loader [active]="exampleLoading" width="60%"></vgr-skeleton-loader>
      </div>
      <section *ngIf="!exampleLoading">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in feugiat lorem.
        Phasellus vel lacus ac dui eleifend condimentum. Nunc et mi in leo vehicula fringilla.
        Pellentesque luctus tortor nec pharetra condimentum. Aliquam varius iaculis neque, sit amet sollicitudin neque porttitor quis.
        Phasellus eu placerat felis, sed condimentum lectus. Morbi id interdum mauris, ac gravida lorem.
      </section>
    </div>

    <h3 style="margin-bottom: 10px; font-weight: bold;">Olika former</h3>

    <div style="align-self:middle">
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

  exampleLoading: boolean = true;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');

    setTimeout(() => {
      this.exampleLoading = false;
    }, 3000);
  }

  get buttonText(): string {
    if (!this.actionInProgress) {
      return 'Start';
    } else {
      return 'Stop';
    }
  }
}
