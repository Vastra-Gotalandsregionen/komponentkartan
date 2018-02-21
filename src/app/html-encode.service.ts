import { Injectable } from '@angular/core';

@Injectable()
export class HtmlEncodeService {

  constructor() { }

  escape(string: string): string {
    return string
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  prepareHighlightedSection(htmlCode: string, language: string = 'html') {
    return '<pre><code class="highlight ' + language + '">' + this.escape(htmlCode) + '</code></pre>';
  }

}
