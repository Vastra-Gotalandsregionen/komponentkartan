import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { Subscription } from 'rxjs';
@Component({
  selector: 'vgr-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() description: string;
  @Input() noResultsText = 'Inget resultat';
  @Input() items: any;
  @Input() maxItems = 25;
  @Input() width: string;
  displayItems: any;
  focusItem = -1;
  @Input() @HostBinding('class.search-results--open') visible = false;
  @Output() visibleChange = new EventEmitter();
  @Output() itemClick = new EventEmitter();
  descriptionHeight: number;

  @ViewChild(NgScrollbar) scrollbarRef: NgScrollbar;


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    const target = event.target || event.srcElement || event.currentTarget;
    if ((this.elementRef.nativeElement.parentNode && !this.elementRef.nativeElement.parentNode.contains(target)) && this.visible) {
      this.visible = false;
      this.visibleChange.emit(this.visible);
      this.resetScrollPosition();
    }
  }

  constructor(private elementRef: ElementRef, private ngZone: NgZone) { }


  ngOnInit() {
    console.log('ngOninit', this.scrollbarRef)
    const parent = this.getParentNode();
    if (parent && parent.classList.contains('search-result-wrapper')) {
      parent.onkeydown = () => this.handleKeyevents(event);
    } else {
      throw new Error('Du har glömt att lägga din search-result komponent i en wrapper');
    }
  }

  ngAfterViewInit() {
    this.scrollbarRef.scrolled.subscribe(e => console.log(e))

  }

  ngOnChanges() {
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

  resetScrollPosition() {
    // const psNode = this.elementRef.nativeElement.querySelector('#scroll-container-searchResult');


    // this.ngZone.run(() => this.scrollbarRef.scrollTo({top: 15}))
    this.scrollbarRef.scrollTo({top: 15}).then(e => console.log('hello'));
    // psNode.scrollTop = 0;

    console.log('resetScroll', this.scrollbarRef)
    this.focusItem = -1;
  }

  handleKeyevents(event) {
    if (!this.visible) {
      return;
    }

    this.setFocusedElement();

    if (['Esc', 'Escape', 'Tab'].includes(event.key)) {
      this.visible = false;
      this.visibleChange.emit(this.visible);
      this.resetScrollPosition();
    } else if (['Up', 'Down', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      const nodes = this.elementRef.nativeElement.querySelectorAll('.search-results__items li');

      if (nodes.length === 0) {
        return;
      }

      if (['Down', 'ArrowDown'].includes(event.key)) {
        if (this.focusItem === nodes.length - 1) {
          this.focusItem = 0;
        } else {
          this.focusItem++;
        }
      } else if (['Up', 'ArrowUp'].includes(event.key)) {
        if (this.focusItem === 0 || this.focusItem === -1) {
          this.focusItem = nodes.length - 1;
        } else {
          this.focusItem--;
        }
      }
      const activeNode = nodes[this.focusItem];
      activeNode.focus();
      event.preventDefault();
      event.stopPropagation();
    } else if (['Enter', 'Spacebar', ' '].includes(event.key)) {
      const target = event.target || event.srcElement || event.currentTarget;
      if (this.elementRef.nativeElement.contains(target)) {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.onItemClick(this.displayItems[this.focusItem]);
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  indexInParent(node) {
    const children = node.parentNode.childNodes;
    let num = 0;
    for (let i = 0; i < children.length; i++) {
      if (children[i] === node) { return num; }
      if (children[i].nodeType === 1) { num++; }
    }
  }

  setFocusedElement() {
    const node = this.elementRef.nativeElement.querySelector('li:focus');
    this.focusItem = node ? this.indexInParent(node) : -1;
  }

  public getParentNode() {
    return this.elementRef.nativeElement.parentNode;
  }

  getHeight() {
    // 264px Is the size of the viewport that's available.
    return 264 + this.descriptionHeight;
  }

  filterItems() {
    this.displayItems = this.items.slice(0, this.maxItems);
  }

  onItemClick(item) {
    this.itemClick.emit(item);
  }

}
