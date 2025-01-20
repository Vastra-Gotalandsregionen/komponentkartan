import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
@Component({
    selector: 'app-sizes',
    templateUrl: './sizes.component.html',
    styleUrls: ['./sizes.component.scss'],
    standalone: false
})
export class SizesComponent implements OnInit {

  mediaQueryCode = `
  // Importera _settings.sizes.scss från komponentkartan.
  @use '../../../node_modules/vgr-komponentkartan/assets/partials/_settings.sizes.scss' as sizes;

  // Sätt default-storlek utan media query. Detta är den lilla storleken.
  .sizeInfo {
    &:after {
      content: "Liten";
      height: auto;
      width: auto;
      font-weight: bold;
    }
  }

  // Definiera media query baserat på variabel för stor storlek.
  @media screen and (min-width: sizes.$desktop-width--medium) {
    .sizeInfo {
      &:after {
        content: "Stor";
      }
    }
  }
  `;

  mediaQueryExample: string;
  constructor(htmlEncoder: HtmlEncodeService) {
    this.mediaQueryExample = htmlEncoder.prepareHighlightedSection(this.mediaQueryCode, 'scss');
  }

  ngOnInit() {
  }

}
