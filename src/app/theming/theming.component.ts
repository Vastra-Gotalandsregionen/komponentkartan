import { Component, OnInit } from '@angular/core';
import { SelectableItem } from '@komponentkartan/index';

@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss']
})
export class ThemingComponent implements OnInit {

  themes: SelectableItem<string>[];
  constructor() {
    this.themes = [
      { displayName: 'Neutralt', value: 'theme--neutral' } as SelectableItem<string>,
      { displayName: 'Blått', value: 'theme--blue' } as SelectableItem<string>,
      { displayName: 'Rött', value: 'theme--red' } as SelectableItem<string>,
      { displayName: 'Grönt', value: 'theme--green' } as SelectableItem<string>
    ] as SelectableItem<string>[];
  }

  ngOnInit() {
    this.themes.forEach(x => x.selected = this.isThemeActive(x.value));
  }

  themeChanged(theme: string) {
    document.getElementById('theme-root').classList.remove('theme--neutral');
    document.getElementById('theme-root').classList.remove('theme--blue');
    document.getElementById('theme-root').classList.remove('theme--red');
    document.getElementById('theme-root').classList.remove('theme--green');
    document.getElementById('theme-root').classList.add(theme);
  }

  isThemeActive(themeName: string): boolean {
    return document.getElementById('theme-root').classList.contains(themeName);
  }

}
