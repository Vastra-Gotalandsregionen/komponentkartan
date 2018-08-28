import { Component, HostBinding, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  templateUrl: './action-panel.component.html',
  selector: 'vgr-action-panel',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('400ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('400ms', style({ opacity: 0 }))
        ])
      ]
    )
  ]
})
export class ActionPanelComponent {

  @Input() title: string;
  @Input() showCloseButton = true;
  @Input() expansionSpeed: 'slow' | 'normal' | 'fast' | 'noanimation';
  @Input() set expanded(value: boolean) {
    if (value && !this._expanded) {
      this.expand();
    } else if (!value && this._expanded) {
      this.collapse();
    }
  }
  get expanded(): boolean {
    return this._expanded;
  }
  readonly showNotificationDurationMs = 1500;
  collapsed = true;
  private pageHeaderHeight = 0;
  private _expanded: boolean;

  get animationDelayMs(): number {
    if (this.expansionSpeed === 'slow') {
      return 1000;
    } else if (this.expansionSpeed === 'fast') {
      return 300;
    } else if (this.expansionSpeed === 'noanimation') {
      return 0;
    } else {
      return 600;
    }
  }

  @HostBinding('class.action-panel--slow') get slow() {
    return this.expansionSpeed === 'slow';
  }
  @HostBinding('class.action-panel--fast') get fast() {
    return this.expansionSpeed === 'fast';
  }
  @HostBinding('class.action-panel--noanimation') get noanimation() {
    return this.expansionSpeed === 'noanimation';
  }

  @Output() expandedChanged = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) { }

  public setPageHeaderHeight(height: number) {
    this.pageHeaderHeight = height;
    this.elementRef.nativeElement.children[0].style.top = height + 'px';
  }

  private expand() {
    this.elementRef.nativeElement.children[0].style.height = this.elementRef.nativeElement.children[0].scrollHeight + 'px';
    this._expanded = true;
    this.collapsed = false;
    this.expandedChanged.emit(this.expanded);
    setTimeout(() => {
      this.elementRef.nativeElement.children[0].style.height = 'auto';
      this.elementRef.nativeElement.children[0].style.overflow = 'visible';
    }, this.animationDelayMs);
  }

  private collapse() {
    this.elementRef.nativeElement.children[0].style.height = this.elementRef.nativeElement.children[0].scrollHeight + 'px';
    this._expanded = false;
    this.collapsed = true;
    this.expandedChanged.emit(false);
    setTimeout(() => {
      this.elementRef.nativeElement.children[0].style.height = '0px';
      this.elementRef.nativeElement.children[0].style.overflow = 'hidden';
    }, 50);
  }
}
