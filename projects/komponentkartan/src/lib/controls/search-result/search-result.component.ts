import { Component, OnChanges, Input, HostBinding, Output, EventEmitter, ElementRef, HostListener, OnInit } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  DOWN_ARROW = 40,
  UP_ARROW = 38,
  ESCAPE = 27
}

@Component({
  selector: 'vgr-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnChanges, OnInit {

  @Input() description: string;
  @Input() noResultsText: string;
  @Input() items: any;
  @Input() maxItems = 25;
  displayItems: any;
  focusItem = -1;
  @Input() @HostBinding('class.search-results--open') visible = false;
  @Output() itemClick = new EventEmitter();
  scrollbarConfig: PerfectScrollbarConfig = new PerfectScrollbarConfig({ minScrollbarLength: 40 } as PerfectScrollbarConfigInterface);
  descriptionHeight: number;

  /*@HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
      const target = event.target || event.srcElement || event.currentTarget;
      if (!this.elementRef.nativeElement.parentNode.contains(target)) {
          console.log('inne i if');
          this.visible = false;
      }
  }*/

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes) {
    console.log(changes);
    if (this.items) {
      this.filterItems();
      setTimeout(() => {
        if (this.elementRef.nativeElement.querySelector('.search-results__description')) {
          this.descriptionHeight = this.elementRef.nativeElement.querySelector('.search-results__description').offsetHeight;
        } else {
          this.descriptionHeight = 0;
        }
      }, 20);
    }
  }

  handleKeyevents(event) {
    console.log('handlekeyevents', this.visible, this.displayItems);
    this.setFocusedElement();
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.visible = false;
    } else if (event.keyCode === KEY_CODE.DOWN_ARROW || event.keyCode === KEY_CODE.UP_ARROW) {
      const nodes = this.elementRef.nativeElement.querySelectorAll('.search-results__menu__items li');

      if (event.keyCode === KEY_CODE.DOWN_ARROW && this.focusItem < nodes.length - 1) {
        this.focusItem++;
      } else if (event.keyCode === KEY_CODE.UP_ARROW && this.focusItem > 0) {
        this.focusItem--;
      }

      const activeNode = nodes[this.focusItem];
      console.log(this.focusItem);
      activeNode.focus();
    }
    console.log(this.focusItem);
  }

  indexInParent(node) {
    const children = node.parentNode.childNodes;
    let num = 0;
    for (let i = 0; i < children.length; i++) {
        if (children[i] === node) { return num; }
        if (children[i].nodeType === 1) { num++; }
    }
    return -1;
  }

  setFocusedElement() {
    const node = this.elementRef.nativeElement.querySelector('li:focus');
    this.focusItem = node ? this.indexInParent(node) : -1;
  }

  ngOnInit() {
    // Kanske använda closest?
    const parent = this.elementRef.nativeElement.parentNode;
    parent.onkeyup = () => this.handleKeyevents(event);
  }

  getHeight() {
    // 264px Is the size of the viewport that's available.
    return 264 + this.descriptionHeight;
  }

  filterItems() {
    this.displayItems = this.items.slice(0, this.maxItems);
  }

  onItemClick (item) {
    this.itemClick.emit(item);
  }

}
