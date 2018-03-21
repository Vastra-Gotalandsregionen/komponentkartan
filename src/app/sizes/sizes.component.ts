import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss']
})
export class SizesComponent implements OnInit {

  mediaQueryCode = `
  // Importera _settings.sizes.scss från komponentkartan.
  @import '../../../node_modules/vgr-komponentkartan/assets/partials/_settings.sizes.scss';

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
  @media screen and (min-width: $desktop-width--medium) {
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
