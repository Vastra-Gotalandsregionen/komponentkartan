import { AfterViewInit, Directive, ElementRef } from '@angular/core';
declare var hljs: any;

@Directive({
  selector: '[vgrHighlightCode]'
})
export class HighlightCodeDirective implements AfterViewInit {

  constructor(private eltRef: ElementRef) {
  }

  ngAfterViewInit() {
    hljs.highlightBlock(this.eltRef.nativeElement);
  }

}
