import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { FilterTagGroupComponent, FilterTagComponent as FilterTagComponentElement } from '../../../projects/komponentkartan/src/lib';

interface FilterTag {
  id: number;
  text: string;
  remove: () => void;
}

@Component({
  selector: 'app-filter-tag',
  templateUrl: './filter-tag.component.html',
  styles: ['.list-row { width: 500px; display: flex}', '.list-column { width: 120px; }', '.list-header { font-weight: bold;}']
})
export class FilterTagComponent implements OnInit {
  @ViewChild('myFilterGroup', {read: FilterTagGroupComponent}) myFilterGroup: FilterTagGroupComponent;
  @ViewChild('myFilterTag', {read: FilterTagComponentElement}) myFilterTag: FilterTagComponentElement;
  persons = [
    { 'firstName': 'Johanna', 'surname': 'Andersson', 'age': 25, 'gender': 'w' },
    { 'firstName': 'Anders', 'surname': 'Johansson', 'age': 51, 'gender': 'm' },
    { 'firstName': 'Elsa', 'surname': 'Andreasson', 'age': 15, 'gender': 'w' },
    { 'firstName': 'Kurt', 'surname': 'Olsson', 'age': 75, 'gender': 'm' },
    { 'firstName': 'John', 'surname': 'Stark', 'age': 30, 'gender': 'm' },
    { 'firstName': 'Lisa', 'surname': 'Lindgren', 'age': 19, 'gender': 'w' }
  ];

  ids = 0;
  filteredPersons = this.persons.slice();
  filterTags: FilterTag[] = [];
  filtersDisabled = false;

  /*** Advanced example *****/

  advancedFilteredPersons = this.persons.slice();
  advancedFilterTags: FilterTag[] = [];
  advancedSearchForm: FormGroup;

  /*****/

  ngOnInit() {
    this.advancedSearchForm = new FormGroup({
      name: new FormControl(),
      minimumAge: new FormControl(),
      women: new FormControl(),
      men: new FormControl()
    }, { updateOn: 'blur' });
  }

  getId(): number {
    return this.ids++;
  }

  addFilter(filterName: string) {
    if (filterName) {
      const tag = {
        id: this.getId(),
        text: `${filterName}`,
        remove: () => this.removeFilter(tag)
      } as FilterTag;
      this.filterTags.push(tag);
    }

    this.filterValues();
  }

  removeFilter(filter: FilterTag) {
    this.filterTags.splice(this.filterTags.indexOf(filter), 1);
    this.filterValues();
  }

  removeAllFilters() {
    this.filterTags = [];
    this.filteredPersons = this.persons.slice();
  }

  private filterValues() {
    if (this.filterTags.length) {
      this.filteredPersons = this.persons.filter(x =>
        this.filterTags.some(y => x.firstName.toLowerCase().includes(y.text.toLocaleLowerCase()))
        || this.filterTags.some(y => x.surname.toLowerCase().includes(y.text.toLocaleLowerCase()))
      );
    } else {
      this.filteredPersons = this.persons.slice();
    }
  }

  toggleDisableFilters() {
    this.filtersDisabled = !this.filtersDisabled;
  }

  /********** Advanced example withe reactive forms  **********/

  advancedFilter() {
    this.advancedFilterTags = [];
    const name = this.advancedSearchForm.get('name');
    if (name.value) {
      const tag = {
        text: `${name.value}`,
        remove: () => this.removeAdvancedFilter(name)
      } as FilterTag;
      this.advancedFilterTags.push(tag);
    }
    const minimumAge = this.advancedSearchForm.get('minimumAge');
    if (minimumAge.value) {
      const tag = {
        text: `Ålder > ${minimumAge.value}`,
        remove: () => this.removeAdvancedFilter(minimumAge)
      } as FilterTag;
      this.advancedFilterTags.push(tag);
    }
    const women = this.advancedSearchForm.get('women');
    if (women.value) {
      if (women.value) {
        const tag = {
          text: 'Kvinnor',
          remove: () => this.removeAdvancedFilter(women)
        } as FilterTag;
        this.advancedFilterTags.push(tag);
      }
    }
    const men = this.advancedSearchForm.get('men');
    if (men.value) {
      if (men.value) {
        const tag = {
          text: 'Män',
          remove: () => this.removeAdvancedFilter(men)
        } as FilterTag;
        this.advancedFilterTags.push(tag);
      }
    }

    if (this.advancedFilterTags.length) {
      this.advancedFilteredPersons = this.persons.filter(x =>
        (minimumAge.value ? x.age >= minimumAge.value : true) &&
        (name.value ? x.firstName.toLowerCase().includes(name.value.toLowerCase())
          || x.surname.toLowerCase().includes(name.value.toLowerCase()) : true) &&
        (women.value && !men.value ? x.gender === 'w' : true) &&
        (men.value && !women.value ? x.gender === 'm' : true)
      );
    } else {
      this.advancedFilteredPersons = this.persons.slice();
    }
  }

  removeAdvancedFilter(control: AbstractControl) {
    control.reset();
    this.advancedFilter();
  }

  removeAllAdvancedFilters() {
    this.advancedSearchForm.reset();
    this.advancedFilter();
  }

  setFocusOnGroup() {
    this.myFilterGroup.focus();
  }

  setFocusOnSpecificTag() {
    this.myFilterTag.focus();
  }
}