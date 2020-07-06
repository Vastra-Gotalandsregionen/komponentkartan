import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'vgr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges {
  @Input() disabled = false;
  @Input() buttonStyle = 'primary';
  @Input() type = 'button';
  @ViewChild('button', { static: true }) button: ElementRef;
  reenabled = false;
  private wasDisabled = false;

  ngOnChanges() {
    this.reenabled = this.wasDisabled && !this.disabled;
    this.wasDisabled = this.disabled;
  }

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }

  focus() {
    this.button.nativeElement.focus();
  }
}
