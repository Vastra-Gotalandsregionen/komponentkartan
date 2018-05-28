import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-tag',
  templateUrl: './filter-tag.component.html'
})
export class FilterTagComponent {
  values = [
    'Första',
    'Andra',
    'Tredje',
    'Fjärde',
    'Femte'
  ];
  filteredValues = this.values.slice();
  filters: string[] = [];

  addFilter(filter: string) {
    this.filters.push(filter);
    this.filterValues();
  }

  removeFilter(filter: string) {
    this.filters.splice(this.filters.indexOf(filter), 1);
    this.filterValues();
  }

  removeAllFilters() {
    this.filters = [];
    this.filteredValues = this.values.slice();
  }

  private filterValues() {
    if (this.filters.length) {
      this.filteredValues = this.values.filter(x =>
        this.filters.some(y => x.includes(y))
      );
    } else {
      this.filteredValues = this.values.slice();
    }
  }
}