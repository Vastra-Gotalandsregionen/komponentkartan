import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-component-docs',
    templateUrl: './component-docs.component.html',
    styleUrls: ['./component-docs.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ComponentDocsComponent implements OnInit {
  @Input() componentName: string;
  constructor() { }

  ngOnInit() {
  }
}
