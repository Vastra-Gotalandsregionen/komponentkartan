import { Component, HostBinding, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  templateUrl: './action-panel.component.html',
  selector: 'vgr-action-panel',
  animations: [
    trigger('slide', [
      state('closed', style({
        height: 0,
        marginBottom: 0
      })),
      state('open', style({
        height: '*',
        marginBottom: '14px',
        boxShadow: '3px 3px 9px 0 rgba(0, 0, 0, 0.5)'
      })),
      transition('closed <=> open', animate('600ms ease'))
    ]),
    trigger('fade', [
      state('out', style({
        opacity: 0
      })),
      state('in', style({
        opacity: 1
      })),
      transition('out <=> in', animate('600ms ease'))
    ])
  ]
})
export class ActionPanelComponent implements OnChanges {

  @Input() title: string;
  @Input() expanded = false;
  @Input() showCloseButton = true;
  @Output() expandedChanged = new EventEmitter<boolean>();
  @ViewChild('actionPanel') actionPanelElement;
  slideState = 'closed';
  fadeState = 'out';

  ngOnChanges(changes: SimpleChanges) {
    const expandedChange = changes['expanded'];
    if (expandedChange) {
      if (expandedChange.currentValue) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  }

  private expand() {
    this.slideState = 'open';
    this.fadeState = 'in';
    this.expandedChanged.emit(true);
  }

  private collapse() {
    this.slideState = 'closed';
    this.fadeState = 'out';
    this.expandedChanged.emit(false);
  }
}
