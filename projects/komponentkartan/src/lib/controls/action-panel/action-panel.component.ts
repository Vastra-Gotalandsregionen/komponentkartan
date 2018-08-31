import { Component, HostBinding, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { trigger, style, animate, transition, state, AnimationEvent } from '@angular/animations';

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
      transition('closed <=> open', animate('600ms ease'))
    ]),
    trigger('fade', [
      state('hide', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hide <=> show', animate('400ms ease'))
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
  fadeState = 'show';
  open = false;

  ngOnChanges(changes: SimpleChanges) {
    const expandedChange = changes['expanded'];
    if (expandedChange) {
      if (expandedChange.currentValue) {
        this.slideState = 'open';
        this.expandedChanged.emit(true);
      } else {
        this.slideState = 'closed';
        this.expandedChanged.emit(false);
      }
    }

    const showCloseButtonChange = changes['showCloseButton'];
    if (showCloseButtonChange) {
      if (showCloseButtonChange.currentValue) {
        this.fadeState = 'show';
      } else {
        this.fadeState = 'hide';
      }
    }
  }

  close() {
    this.expanded = false;
    this.slideState = 'closed';
    this.expandedChanged.emit(false);
  }

  onSlideStart(event: AnimationEvent) {
    if (event.fromState === 'open') {
      this.open = false;
    }
  }

  onSlideEnd(event: AnimationEvent) {
    if (event.fromState === 'closed') {
      this.open = true;
    }
  }
}
