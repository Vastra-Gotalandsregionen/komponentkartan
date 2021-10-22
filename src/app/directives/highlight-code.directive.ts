import { Directive, ElementRef } from '@angular/core';
import hljs from 'highlight.js';

@Directive({
  selector: '[vgrHighlightCode]'
})
export class HighlightCodeDirective {

  constructor(private eltRef: ElementRef) {
  }

  ngAfterViewInit() {
    hljs.highlightBlock(this.eltRef.nativeElement);
  }

}
