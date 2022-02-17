import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService, TabManagementService } from '../../../projects/komponentkartan/src/lib';

@Component({
  selector: 'app-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.css']
})
export class TabButtonComponent implements OnInit {
  pages = [
    { 'text': 'Favoriter' },
    { 'text': 'Avtal' , 'active': true},
    { 'text': 'Valda' }
  ];
  centrera = false;
  constructor(private router: Router, public modalService: ModalService, private tabManagementService: TabManagementService) { }

  ngOnInit() {
    this.router.navigate( ['/tab-start'],  { skipLocationChange: true });
  }

  navigate(id) {

    const page = this.pages.filter(tab => tab.text === id)[0];
    this.pages.forEach(element => {
      element.active = false;
      if (element.text === page.text) {
        element.active = true;
      }
    });

    switch (id) {
      case 'Favoriter':
        this.router.navigate( ['/favoriter'],  { skipLocationChange: true });
        break;
      case 'Valda':
        this.modalService.openDialog('modal1');
        break;
        case 'Avtal':
          this.router.navigate( ['/tab-start'],  { skipLocationChange: true });
          break;
      default:
        this.router.navigate(['/tab-button']);
        break;
    }
  }

  lamnaTab() {
    console.log('lämna')
    this.router.navigate( ['/valda'],  { skipLocationChange: true });
    this.closeModal();
  }

  stannaPaTab() {
    console.log('stanna')
    this.tabManagementService.navigationCancelled(true);
    this.closeModal();
  }

  closeModal() {
    this.modalService.closeDialog('modal1');
  }
}
