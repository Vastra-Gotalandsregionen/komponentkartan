import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../projects/komponentkartan/src/lib/services/modalService';
import { PaginationManagementService } from '../../../projects/komponentkartan/src/lib/controls/pagination/pagination-management.service';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
    selector: 'app-pagination-documentation',
    templateUrl: './pagination-documentation.component.html',
    styleUrls: ['./pagination-documentation.component.scss'],
    standalone: false
})
export class PaginationDocumentationComponent {

  samplePagination = `
  <div *ngIf="pages > 1">
    <vgr-pagination [pages]="pages" (pageChanged)="onPageChanged($event)"></vgr-pagination>
  </div>`;

  constructor(private htmlEncoder: HtmlEncodeService, private paginationManagementService: PaginationManagementService, public modalService: ModalService) {
    this.samplePagination = htmlEncoder.prepareHighlightedSection(this.samplePagination);
  }

  onPageChanged(e) {
    if (e === 3 || e === 10) {
      this.modalService.openDialog('modal1');
    } else {
      this.paginationManagementService.navigationCancelled(false);
    }

  }

  lamnaTab() {
    this.paginationManagementService.navigationCancelled(false);

    this.closeModal();
  }

  stannaPaTab() {
    this.paginationManagementService.navigationCancelled(true);
    this.closeModal();
  }

  closeModal() {
    this.modalService.closeDialog('modal1');
  }
}
