import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vgr-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {

  @Input() rows: number;
  @Input() cols: number;
  @Input() placeholder: number;

  constructor() {
    this.rows = 3999;
    this.cols = 3999;
  }

  ngOnInit() {
  }

}
