import { Component, HostBinding, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { trigger, style, animate, transition, state, query, animateChild, group } from '@angular/animations';

@Component({
  templateUrl: './action-panel.component.html',
  selector: 'vgr-action-panel',
  animations: [
    trigger('slide', [
      state('closed', style({
        height: 0,
        marginBottom: 0,
        boxShadow: '3px 3px 9px 0 rgba(0, 0, 0, 0)'
      })),
      state('open', style({
        height: '*',
        marginBottom: '14px',
        boxShadow: '3px 3px 9px 0 rgba(0, 0, 0, 0.5)'
      })),
      transition('closed <=> open', group([
        query('@fade', animateChild()),
        animate('600ms ease')
      ]))
    ]),
    trigger('fade', [
      state('closed', style({
        opacity: 0
      })),
      state('open', style({
        opacity: 1
      })),
      transition('closed <=> open', animate('600ms ease'))
    ])
  ]
})
export class ActionPanelComponent implements OnChanges {

  @Input() title: string;
  @Input() expanded = false;
  @Input() showCloseButton = true;
  @Output() expandedChanged = new EventEmitter<boolean>();
  @ViewChild('actionPanel') actionPanelElement;
  state = 'closed';

  ngOnChanges(changes: SimpleChanges) {
    const expandedChange = changes['expanded'];
    if (expandedChange) {
      if (expandedChange.currentValue) {
        this.state = 'open';
        this.expandedChanged.emit(true);
      } else {
        this.state = 'closed';
        this.expandedChanged.emit(false);
      }
    }
  }

  close() {
    this.expanded = false;
    this.state = 'closed';
    this.expandedChanged.emit(false);
  }
}
