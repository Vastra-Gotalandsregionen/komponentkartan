import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SortDirection, SortChangedArgs, SelectableItem, DropdownItem, ExpandableRow } from '../../lib/index';
import { ExampleUnit, ExampleUnitDetails, ExampleUnitJusteringar } from './unit.model';

@Component({
  selector: 'app-examples-listwithcards',
  templateUrl: './examples-listwithcards.component.html',
  styleUrls: ['./examples-listwithcards.component.scss']
})
export class ExamplesListwithcardsComponent implements OnInit {
  exampleDetail: ExampleUnitDetails;
  sortDirections = SortDirection;
  exampleData: ExpandableRow<ExampleUnit, any>[] = [];
  filtertext = '';
  newUnits: DropdownItem<any>[] = [];
  itemSelected = false;
  addNewUnit = false;
  newUnit: ExampleUnit;
  showActionPanel = false;
  selectedUnit = '';
  unitInFocus = '';
  examplenamnd: DropdownItem<string>[];
  exampleagare: DropdownItem<string>[];
  exempelUtbetalningssatt: DropdownItem<string>[];
  exempelMedverkanIfamiljecentral: DropdownItem<string>[];
  cardLocked: boolean;
  includeInactiveUnits = false;
  startdate: Date;
  enddate: Date;
  exempelVersions: DropdownItem<any>[] = [];

  newUnitForm: FormGroup;
  userFormSubmitted = false;

  constructor(private changeDetecor: ChangeDetectorRef) {

    this.newUnits = [{ displayName: 'Närhälsan Lerum', value: 'SE2321000131-E000000011801' } as DropdownItem<any>,
    { displayName: 'Fredriks Rehab/Massage', value: 'SE2321000131-E000000011802' } as DropdownItem<any>,
    { displayName: 'Bvc för alla', value: 'SE2321000131-E000000011803' } as DropdownItem<any>] as DropdownItem<any>[];

    this.exampleDetail = {
      enhetschef: 'Sarah Larsson',
      enhetschef_epost: 'sarah.larsson@minmail.se',
      enhetschef_telefon: '+461 111 1111',
      agare_kod: 101,
      agare_form: 'privat',
      avtalskod: 1234,
      kontonummer: '1234 1234 12',
      geokod: 'x:6471784 y:6471784',
      kommun: 'Mölndal', kommunkod: 123,
      telefon: '123456789',
      organisationsnummer: '123456789',
      versions: [1, 2, 3, 4, 5, 6],
      leverantorsid_RD: '123456',
      kundreferens: 'A233',
      postadress_stad: 'Vänersborg',
      postadress_gata: 'Regeringsgatan 12',
      postadress_postnummer: '12345',
      besoksadress_stad: 'Göteborg',
      besoksadress_gata: 'Torgatan',
      besoksadress_postnummer: '32133',
      regionsovergripandegrupper: '1000 kr'
    } as ExampleUnitDetails;

    this.exampleagare = [{ displayName: 'Närhälsan', value: 'Närhälsan' } as DropdownItem<any>,
    { displayName: 'Hälsoakuten', value: 'Hälsoakuten' } as DropdownItem<any>,
    { displayName: 'Kalle Karlsson', value: 'Kalle Karlsson' } as DropdownItem<any>,
    { displayName: 'Närhälsan Rehab', value: 'Närhälsan Rehab' } as DropdownItem<any>,
    { displayName: 'Hemmabolaget', value: 'Hemmabolaget' } as DropdownItem<any>] as DropdownItem<any>[];

    this.examplenamnd = [{ displayName: 'Göteborgs hälso- och sjukvårdsnämnden', value: 'Göteborgs hälso- och sjukvårdsnämnden' } as DropdownItem<string>,
    { displayName: 'Norra hälso- och sjukvårdsnämnden', value: 'Norra hälso- och sjukvårdsnämnden' } as DropdownItem<string>,
    { displayName: 'Södra hälso- och sjukvårdsnämnden', value: 'Södra hälso- och sjukvårdsnämnden' } as DropdownItem<string>,
    { displayName: 'Västra hälso- och sjukvårdsnämnden', value: 'Västra hälso- och sjukvårdsnämnden' } as DropdownItem<string>,
    { displayName: 'Östra hälso- och sjukvårdsnämnden', value: 'Östra hälso- och sjukvårdsnämnden' } as DropdownItem<string>] as DropdownItem<string>[];
    this.exempelUtbetalningssatt = [{ displayName: 'BG', value: 'BG' } as DropdownItem<string>,
    { displayName: 'PG', value: 'PG' } as DropdownItem<string>] as DropdownItem<string>[];

    this.exempelMedverkanIfamiljecentral = [{ value: 'ja' } as DropdownItem<string>,
    { value: 'nej' } as DropdownItem<string>] as DropdownItem<string>[];
    this.initExampleData();

    this.cardLocked = true;
    this.includeInactiveUnits = false;
  }

  ngOnInit() {
    this.createOnSubmitForm();
    this.onSortChanged({ key: 'enhet', direction: SortDirection.Ascending } as SortChangedArgs);
  }

  createOnSubmitForm() {
    this.newUnitForm = new FormGroup({
      avtalskod: new FormControl('', { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)] }),
      enhetskod: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)] }),
      namnd: new FormControl('', { validators: [Validators.required] }),
      avtalsperiod_start: new FormControl('', { validators: [Validators.required] }),
      avtalsperiod_slut: new FormControl('', { validators: [Validators.required] }),
      agare: new FormControl('', { validators: [Validators.required] }),
      organisationsnummer: new FormControl('', { validators: [Validators.required] }),
      utbetalningssatt: new FormControl('', { validators: [Validators.required] }),
      kontonummer: new FormControl('', { validators: [Validators.required] }),
      leverantorsid: new FormControl('', { validators: [Validators.required] }),
      kundreferens: new FormControl('', { validators: [Validators.required] }),

    }, { updateOn: 'blur' });



  }
  onFormSubmitted() {
    this.userFormSubmitted = true;
  }

  onNewUnitAgareChanged(value: string) {
    switch (value) {
      case 'Närhälsan': {
        this.newUnit.details.agare_form = 'Offentlig';
        this.newUnit.details.agare_kod = 1000;
        break;
      }
      case 'Kalle Karlsson': {
        this.newUnit.details.agare_form = 'Privat';
        this.newUnit.details.agare_kod = 1001;
        break;
      }
      case 'Hemmabolaget': {
        this.newUnit.details.agare_form = 'Privat';
        this.newUnit.details.agare_kod = 1002;
        break;
      }
      case 'Närhälsan Rehab': {
        this.newUnit.details.agare_form = 'Offentlig';
        this.newUnit.details.agare_kod = 1003;
        break;
      }
      case 'Hälsoakuten': {
        this.newUnit.details.agare_form = 'Privat';
        this.newUnit.details.agare_kod = 1004;
        break;
      }
    }


  }


  validationMessages = {
    avtalskod: {
      'minlength': 'Avtalskoden skall vara fyra siffror',
      'maxlength': 'Avtalskoden skall vara fyra siffror',
    },
    enhetskod: {
      'minlength': 'Avtalskoden skall vara sex siffror',
      'maxlength': 'Avtalskoden skall vara sex siffror',
    },
    // age: {
    //   'invalidNumber': 'Ange en siffra',
    //   'min': 'Ange en ålder på minst 18 år',
    //   'max': 'Ange en ålder under 120',
    // },
    // email: {
    //   'email': 'Ange en giltig e-post',
    // },
    // salary: {
    //   'invalidNumber': 'Ange ett giltigt belopp',
    //   'required': 'Detta skriver över default meddelandet för obligatoriska fält'
    // }
  };


  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
  }

  initExampleData() {
    const items: ExampleUnit[] = [];
    const exampleNames: string[] = ['Närhälsan Mellerud', 'Närhälsan Lunden', 'Närhälsan Kungälv',
      'Närhälsan psykologenheten för mödravård', 'BB-mottagningen Östra', 'Kalle Karlssons fotvårdsenhet',
      'Närhälsan rehabmottagning', 'Närhälsan Kristinedal', 'Janne Karlssons hudvårdsspecialist',
      'Hälsoakuten Mölndal', 'Hälsoakuten Göteborg', 'Hälsoakuten Alingsås',
      'Rehabmottagningen Hemma'];
    const examplehsaid = 'SE2321000131-E000000011800';
    const examplehenhetskod: number[] = [802200, 663300, 663200, 623300, 627600, 432300, 435600, 806600, 834500, 678500, 458700, 648900, 804500];

    for (let i = 1; i <= 100; i++) {
      const indexForNames = this.getRandomInt(0, 12);
      const indexForAgare = this.getRandomInt(0, 4);
      const indexForEnhetskod = this.getRandomInt(0, 12);
      const indexForNamnd = this.getRandomInt(0, 4);
      let isActive;
      let year;
      const details = Object.create(this.exampleDetail);
      details.enhet = 'copy';

      if (i < 2) {
        isActive = false;
        year = (new Date().getFullYear() - 1);
      } else {
        isActive = true;
        year = (new Date().getFullYear());
      }

      details.avtalsperiod_start = new Date(year, 0, 1);
      details.avtalsperiod_slut = new Date(year, 11, 0);

      items.push({
        vald: false,
        id: i,
        enhet: exampleNames[indexForNames],
        hsaid: examplehsaid,
        agare: this.exampleagare[indexForAgare].displayName,
        enhetskod: examplehenhetskod[indexForEnhetskod],
        namnd: this.examplenamnd[indexForNamnd].displayName,
        isActive: isActive,
        details: details
      } as ExampleUnit);
    }
    this.exampleData = items.map(x => new ExpandableRow<ExampleUnit, ExampleUnit>(x));
  }

  onSelectedChangedVersion(selectedItem: string) {
    this.itemSelected = true;
    this.selectedUnit = this.newUnits.find(u => u.value === selectedItem).displayName;
  }


  onSelectedChangedUnit(selectedItem: string) {
    this.itemSelected = true;
    this.selectedUnit = this.newUnits.find(u => u.value === selectedItem).displayName;
  }

  onExpandedChanged(expanded: boolean, item: ExpandableRow<ExampleUnit, ExampleUnit>) {

    if (expanded && !item.previewObject.vald) {
      this.unitInFocus = item.previewObject.enhet;
      item.previewObject.vald = true;

      this.updateCardDropdowns(item.previewObject);

    } else { item.previewObject.vald = false; }
  }

  updateCardDropdowns(item: ExampleUnit) {
    this.exampleagare.forEach(a => a.selected = false);
    this.exampleagare.find(a => a.displayName === item.agare).selected = true;
    this.exempelVersions = [];
    item.details.versions.forEach(x => {
      this.exempelVersions.push({ displayName: x.toString(), value: x.toString(), marked: false } as DropdownItem<any>);
    });
    this.changeDetecor.detectChanges();
  }
  onCardCancel(row: ExpandableRow<ExampleUnit, any>) {
    this.cardLocked = true;
    row.notifyOnCollapse('redigering av ' + row.previewObject.enhet + ' avbröts', 'vgr-icon-exclamation');
  }

  onCardSave(row: ExpandableRow<ExampleUnit, any>) {
    this.cardLocked = true;
    row.notifyOnCollapse(row.previewObject.enhet + ' sparades', 'vgr-icon-ok-check-green');
  }

  onCardUnlocked() {

    this.cardLocked = false;
  }

  onNewUnitClick() {
    this.addNewUnit = true;
    this.newUnit = {
      hsaid: this.newUnits.find(u => u.displayName === this.selectedUnit).value,
      details: {
        enhet: this.selectedUnit,
        postadress_stad: 'Vänersborg',
        postadress_gata: 'Regeringsgatan 12',
        postadress_postnummer: '12345',
        besoksadress_stad: 'Göteborg',
        besoksadress_gata: 'Torgatan',
        besoksadress_postnummer: '32133',
        geokod: 'x:6471784 y:6471784',
        kommun: 'Mölndal', kommunkod: 123,
      }
    } as ExampleUnit;
    this.cardLocked = false;
  }

  onNewUnitCancel() {
    this.actionPanelClose();
    this.cardLocked = true;
    this.newUnitForm.reset();
  }

  onNewUnitSave() {

    if (this.newUnitForm.valid) {
      this.newUnit.details.avtalskod = this.newUnitForm.controls.avtalskod.value;
      this.newUnit.details.avtalsperiod_slut = this.newUnitForm.controls.avtalsperiod_slut.value;
      this.newUnit.details.avtalsperiod_start = this.newUnitForm.controls.avtalsperiod_start.value;

      this.newUnit.details.organisationsnummer = this.newUnitForm.controls.organisationsnummer.value;
      this.newUnit.details.leverantorsid_RD = this.newUnitForm.controls.leverantorsid.value;
      this.newUnit.details.kontonummer = this.newUnitForm.controls.kontonummer.value;

      this.newUnit.namnd = this.newUnitForm.controls.namnd.value;
      this.newUnit.enhetskod = this.newUnitForm.controls.enhetskod.value;
      this.newUnit.agare = this.newUnitForm.controls.agare.value;
      this.newUnit.enhet = this.selectedUnit;

      this.newUnit.isActive = true;

      //   let unitTosave = this.newUnit
      const newRow = new ExpandableRow<ExampleUnit, ExampleUnit>(this.newUnit);
      newRow.notifyOnCollapse(newRow.previewObject.enhet + ' sparades', 'vgr-icon-ok-check-green');

      this.exampleData.push(newRow);

      this.actionPanelClose();
    }
  }

  onActionPanelClose() {
    this.actionPanelClose();
  }

  actionPanelClose() {
    this.showActionPanel = false;
    this.addNewUnit = false;
    this.newUnits.forEach(u => u.selected = false);
    this.itemSelected = false;
    this.cardLocked = true;

  }

  onSortChanged(event: SortChangedArgs) {
    this.exampleData = this.exampleData.sort((row1, row2) => {
      return row1.previewObject[event.key] > row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? 1 : -1) :
        row1.previewObject[event.key] < row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
    });
  }



}
