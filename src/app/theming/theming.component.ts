import { Component, OnInit } from '@angular/core';
import { SelectableItem, ModalService } from 'vgr-komponentkartan';

@Component({
  selector: 'app-theming',
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss']
})
export class ThemingComponent implements OnInit {

  themes: SelectableItem<string>[];
  pinkieMeter = 0;

  constructor(private modalService: ModalService) {
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
    document.getElementById('theme-root').classList.remove('theme--pinkie');

    if (this.isPinkeModeActive(theme)) {
      document.getElementById('theme-root').classList.add('theme--pinkie');
      this.modalService.openDialog('myModalId');
    } else {
      document.getElementById('theme-root').classList.add(theme);
    }
  }

  isThemeActive(themeName: string): boolean {
    return document.getElementById('theme-root').classList.contains(themeName);
  }

  isPinkeModeActive(theme: string): boolean {
    if (this.pinkieMeter >= 3) {
      this.pinkieMeter = 0;
    }

    if (theme === 'theme--red') {
      this.pinkieMeter++;
    }

    return this.pinkieMeter === 3;
  }

}
