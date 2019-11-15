import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, OnInit } from '@angular/core';
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
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden <=> visible', animate('400ms ease'))
    ])
  ]
})
export class ActionPanelComponent implements OnChanges, OnInit {

  @Input() title: string;
  @Input() open = false;
  @Input() showCloseButton = true;
  @Output() openChanged = new EventEmitter<boolean>();
  @ViewChild('actionPanel', { static: true }) actionPanelElement;
  private readonly slideStateOpen = 'open';
  private readonly slideStateClosed = 'closed';
  private readonly fadeStateVisible = 'visible';
  private readonly fadeStateHidden = 'hidden';
  slideState = this.slideStateClosed;
  fadeState = this.fadeStateVisible;
  isOpened: boolean;
  isClosed: boolean;

  ngOnInit() {
    this.isOpened = this.open;
    this.isClosed = !this.open;
  }

  ngOnChanges(changes: SimpleChanges) {
    const openChange = changes['open'];
    if (openChange) {
      if (openChange.currentValue) {
        this.slideState = this.slideStateOpen;
        this.openChanged.emit(true);
      } else {
        this.slideState = this.slideStateClosed;
        this.openChanged.emit(false);
      }
    }

    const showCloseButtonChange = changes['showCloseButton'];
    if (showCloseButtonChange) {
      if (showCloseButtonChange.currentValue) {
        this.fadeState = this.fadeStateVisible;
      } else {
        this.fadeState = this.fadeStateHidden;
      }
    }
  }

  close() {
    this.open = false;
    this.slideState = this.slideStateClosed;
    this.openChanged.emit(false);
  }

  onSlideStart(event: AnimationEvent) {
    if (event.fromState === this.slideStateOpen) {
      this.isOpened = false;
    }
    if (event.fromState === this.slideStateClosed) {
      this.isClosed = false;
    }
  }

  onSlideEnd(event: AnimationEvent) {
    if (event.fromState === this.slideStateClosed) {
      this.isOpened = true;
    }
    if (event.fromState === this.slideStateOpen) {
      this.isClosed = true;
    }
  }
}
