import { Component, OnInit, Output, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RowNotification, NotificationType, DropdownComponent, SaveCancelComponent, SortDirection, SortChangedArgs, SelectableItem, DropdownItem, ExpandableRow } from 'vgr-komponentkartan';
import { ExampleUnit, ExampleUnitDetails, ExampleUnitJusteringar } from './unit.model';
import { ActionPanelComponent } from '../../lib';

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

  examplenamnd: DropdownItem<string>[];

  exampleagare: DropdownItem<string>[];

  exempelUtbetalningssatt: DropdownItem<string>[];

  exempelMedverkanIfamiljecentral: DropdownItem<string>[];

  cardLocked: boolean;
  newCardLocked: boolean;
  includeInactiveUnits = false;
  startdate: Date;
  enddate: Date;
  exempelVersions: DropdownItem<string>[] = [];
  submitted = false;
  newUnitForm: FormGroup;
  privateOwnerForm: FormGroup;
  editUnitForm: FormGroup;
  editprivateOwnerForm: FormGroup;
  agarOwnerForm: FormGroup;
  onChangeForm: FormGroup;
  userFormSubmitted = false;

  @ViewChild(SaveCancelComponent) saveCancelComponent: SaveCancelComponent;
  @ViewChild('unitVersions') unitVersions: DropdownComponent;

  validationMessages = {
    avtalskod: {
      'minlength': 'Avtalskoden skall vara fyra siffror',
      'maxlength': 'Avtalskoden skall vara fyra siffror',
    },
    enhetskod: {
      'minlength': 'Enhetskoden skall vara sex siffror',
      'maxlength': 'Enhetskoden skall vara sex siffror',
    }
  };

  constructor(private changeDetector: ChangeDetectorRef) {

    this.newUnits = [{ displayName: 'Närhälsan Lerum', value: 'SE2321000131-E000000011801' } as DropdownItem<any>,
    { displayName: 'Fredriks Rehab/Massage', value: 'SE2321000131-E000000011802' } as DropdownItem<any>,
    { displayName: 'Bvc för alla', value: 'SE2321000131-E000000011803' } as DropdownItem<any>] as DropdownItem<any>[];

    this.exampleDetail = {
      enhetschef: 'Sarah Larsson',
      enhetschef_epost: 'sarah.larsson@minmail.se',
      enhetschef_telefon: '+461 111 1111',
      agare_kod: 101,
      avtalskod: 1234,
      kontonummer: '1234 1234 12',
      utbetalningsssätt: 'PG',
      geokod: 'x:6471784 y:6471784',
      kommun: 'Mölndal', kommunkod: 123,
      telefon: '123456789',
      organisationsnummer: '123456789',
      versions: [],
      leverantorsid_RD: '123456',
      kundreferens: 'A233',
      postadress_stad: 'Vänersborg',
      postadress_gata: 'Regeringsgatan 12',
      postadress_postnummer: '12345',
      besoksadress_stad: 'Göteborg',
      besoksadress_gata: 'Torgatan',
      besoksadress_postnummer: '32133',
      regionsovergripandegrupper: '1000 kr',
      medverkanfamiljecentral: 'nej'

    } as ExampleUnitDetails;

    this.exampleagare = [{ displayName: 'Närhälsan', value: 'Närhälsan' } as DropdownItem<string>,
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

    this.exempelMedverkanIfamiljecentral = [{ value: 'ja', displayName: 'Ja' } as DropdownItem<string>,
    { value: 'nej', displayName: 'Nej' } as DropdownItem<string>] as DropdownItem<string>[];

    this.initExampleData();

    this.cardLocked = true;
    this.newCardLocked = true;
    this.includeInactiveUnits = false;
  }

  ngOnInit() {
    this.createNewUnitForm();
    this.createPrivateOwnerForm();
    this.createEditForm();
    this.createEditPrivateOwnerForm();
    this.createAgarOwnerForm();
    this.agareChanged();
    this.createOnChangeForm();

    this.onSortChanged({ key: 'enhet', direction: SortDirection.Ascending } as SortChangedArgs);
  }

  createOnChangeForm() {
    this.onChangeForm = new FormGroup({
      namnd: new FormControl('', { validators: [Validators.required] }),
      avtalsperiod_start: new FormControl('', { validators: [Validators.required] }),
      avtalsperiod_slut: new FormControl('', { validators: [Validators.required] }),
    }, { updateOn: 'change' });
  }

  createAgarOwnerForm() {
    this.agarOwnerForm = new FormGroup({
      agare: new FormControl('', { validators: [Validators.required] }),
    }, { updateOn: 'change' });
  }

  createNewUnitForm() {
    this.newUnitForm = new FormGroup({
      hsaid: new FormControl('', {}),
      avtalskod: new FormControl('', { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)] }),
      enhetskod: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)] }),

      enhetschef: new FormControl('', { validators: [Validators.required] }),
      enhetschef_telefon: new FormControl('', {}),
      enhetschef_epost: new FormControl('', {}),

      leverantorsid: new FormControl('', { validators: [Validators.required] }),
      agarkod: new FormControl('', {}),
      agarform: new FormControl('', {}),
      kundreferens: new FormControl('', {}),
      regionsovergripandegrupper: new FormControl('', {}),
      medverkanIFamiljecentral: new FormControl('', { validators: [Validators.required] }),

    }, { updateOn: 'blur' });

  }

  createEditForm() {
    this.editUnitForm = new FormGroup({
      hsaid: new FormControl('', {}),
      avtalskod: new FormControl('', { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(4)] }),
      enhetskod: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)] }),
      namnd: new FormControl('', { validators: [Validators.required] }),
      avtalsperiod_start: new FormControl('', { validators: [Validators.required] }),
      avtalsperiod_slut: new FormControl('', { validators: [Validators.required] }),
      enhetschef: new FormControl('', { validators: [Validators.required] }),
      enhetschef_telefon: new FormControl('', {}),
      enhetschef_epost: new FormControl('', {}),
      agare: new FormControl('', { validators: [Validators.required] }),
      leverantorsid: new FormControl('', { validators: [Validators.required] }),
      agarkod: new FormControl('', {}),
      agarform: new FormControl('', {}),
      kundreferens: new FormControl('', {}),
      regionsovergripandegrupper: new FormControl('', {}),
      medverkanIFamiljecentral: new FormControl('', { validators: [Validators.required] }),
    }, { updateOn: 'change' });

  }

  createPrivateOwnerForm() {
    this.privateOwnerForm = new FormGroup({
      organisationsnummer: new FormControl('', { validators: [Validators.required] }),
      utbetalningssatt: new FormControl('', { validators: [Validators.required] }),
      kontonummer: new FormControl('', { validators: [Validators.required] })
    }, { updateOn: 'blur' });
  }

  createEditPrivateOwnerForm() {
    this.editprivateOwnerForm = new FormGroup({
      organisationsnummer: new FormControl('', { validators: [Validators.required] }),
      utbetalningssatt: new FormControl('', { validators: [Validators.required] }),
      kontonummer: new FormControl('', { validators: [Validators.required] })
    }, { updateOn: 'blur' });
  }

  onFormSubmitted() {
    this.userFormSubmitted = true;
  }

  setAgareDetaljer(unit: ExampleUnit) {
    switch (unit.agare) {
      case 'Närhälsan': {
        unit.details.agare_form = 'Offentlig';
        unit.details.agare_kod = 1000;
        break;
      }
      case 'Kalle Karlsson': {
        unit.details.agare_form = 'Privat';
        unit.details.agare_kod = 1001;
        break;
      }
      case 'Hemmabolaget': {
        unit.details.agare_form = 'Privat';
        unit.details.agare_kod = 1002;
        break;
      }
      case 'Närhälsan Rehab': {
        unit.details.agare_form = 'Offentlig';
        unit.details.agare_kod = 1003;
        break;
      }
      case 'Hälsoakuten': {
        unit.details.agare_form = 'Privat';
        unit.details.agare_kod = 1004;
        break;
      }
    }

  }

  updateAgarDetaljerForm(agare: string, form: FormGroup, agarForm: FormGroup) {

    let agareform: string;
    let agarekod: number;
    switch (agare) {
      case 'Närhälsan': {
        agareform = 'Offentlig';
        agarekod = 1000;
        break;
      }
      case 'Kalle Karlsson': {
        agareform = 'Privat';
        agarekod = 1001;
        break;
      }
      case 'Hemmabolaget': {
        agareform = 'Privat';
        agarekod = 1002;
        break;
      }
      case 'Närhälsan Rehab': {
        agareform = 'Offentlig';
        agarekod = 1003;
        break;
      }
      case 'Hälsoakuten': {
        agareform = 'Privat';
        agarekod = 1004;
        break;
      }
    }

    form.controls.agarform.setValue(agareform);
    form.controls.agarkod.setValue(agarekod);

    if (agareform === 'Privat') {
      Object.keys(agarForm.controls).forEach(key => {
        agarForm.controls[key].setValidators([Validators.required]);
        agarForm.controls[key].updateValueAndValidity();

      });
    } else {
      Object.keys(agarForm.controls).forEach(key => {
        agarForm.controls[key].setValidators(null);
        agarForm.controls[key].updateValueAndValidity();

      });
    }

  }

  agareChanged() {
    const agareControl = this.editUnitForm.get('agare');
    agareControl.valueChanges.subscribe(
      (value: string) => this.updateAgarDetaljerForm(value, this.editUnitForm, this.editprivateOwnerForm));

    const nyAgareControl = this.agarOwnerForm.get('agare');
    nyAgareControl.valueChanges.subscribe(
      (value: string) => this.updateAgarDetaljerForm(value, this.newUnitForm, this.privateOwnerForm));

  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  initExampleData() {
    const items: ExampleUnit[] = [];
    const exampleNames: string[] = ['Närhälsan Mellerud', 'Närhälsan Lunden', 'Närhälsan Kungälv',
      'Närhälsan psykologenheten för mödravård', 'BB-mottagningen Östra', 'Kalle Karlssons fotvårdsenhet',
      'Närhälsan rehabmottagning', 'Närhälsan Kristinedal', 'Janne Karlssons hudvårdsspecialist',
      'Hälsoakuten Mölndal', 'Hälsoakuten Göteborg', 'Hälsoakuten Alingsås',
      'Rehabmottagningen Hemma'];
    const examplehsaid = 'SE2321000131-E000000011';
    const examplehenhetskod: number[] = [802200, 663300, 663200, 623300, 627600, 432300, 435600, 806600, 834500, 678500, 458700, 648900, 804500];
    let item: ExampleUnit;
    for (let i = 1; i <= 200; i++) {
      const indexForNames = this.getRandomInt(0, 12);
      const indexForAgare = this.getRandomInt(0, 4);
      const indexForEnhetskod = this.getRandomInt(0, 12);
      const indexForNamnd = this.getRandomInt(0, 4);
      let isActive;
      let year;
      const details = Object.create(this.exampleDetail);

      details.enhet = 'copy';
      details.versions = [1, 2, 3];

      if (1 === this.getRandomInt(0, 3)) {
        isActive = false;
        year = (new Date().getFullYear() - 1);
      } else {
        isActive = true;
        year = (new Date().getFullYear());
      }

      if (1 === this.getRandomInt(1, 20)) {
        details.medverkanfamiljecentral = '';
      }

      details.avtalsperiod_start = new Date(year, 0, 1);
      details.avtalsperiod_slut = new Date(year, 11, 0);

      item = {
        vald: false,
        id: i,
        enhet: exampleNames[indexForNames] + ' ' + i.toString(),
        hsaid: examplehsaid + (200 + i).toString(),
        agare: this.exampleagare[indexForAgare].displayName,
        enhetskod: examplehenhetskod[indexForEnhetskod],
        namnd: this.examplenamnd[indexForNamnd].displayName,
        isActive: isActive,
        details: details
      } as ExampleUnit;

      this.setAgareDetaljer(item);
      items.push(item);
    }

    this.exampleData = items.map(x => new ExpandableRow<ExampleUnit, ExampleUnit>(x));

    this.exampleData.forEach(element => {
      if (element.previewObject.details.medverkanfamiljecentral === '') {
        element.setNotification('Information saknas, medverkan i familjecentral ej ifylld', 'vgr-icon-exclamation--red');
      }
    });

  }

  onSelectedChangedVersion(selectedItem: string, row: ExampleUnit) {
    if (this.saveCancelComponent) {
      if (selectedItem === (row.details.versions.length).toString()) {
        this.saveCancelComponent.hideLock = false;
      } else {
        this.saveCancelComponent.hideLock = true;
      }
    }
  }

  onSelectedChangedUnit(selectedItem: string) {
    this.itemSelected = true;
    this.selectedUnit = this.newUnits.find(u => u.value === selectedItem).displayName;
  }

  onExpandedChanged(expanded: boolean, item: ExpandableRow<ExampleUnit, ExampleUnit>) {
    if (expanded && !item.previewObject.vald) {
      item.previewObject.vald = true;
      this.updateCardDropdowns(item.previewObject);
      this.updateCardForm(item.previewObject);
    } else {
      item.previewObject.vald = false;
      this.cardLocked = true;
      this.submitted = false;
    }
    this.changeDetector.detectChanges();
  }

  updateRowValues(row: ExpandableRow<ExampleUnit, ExampleUnit>) {
    row.previewObject.agare = this.editUnitForm.controls.agare.value;
    row.previewObject.details.avtalskod = this.editUnitForm.controls.avtalskod.value;
    row.previewObject.enhetskod = this.editUnitForm.controls.enhetskod.value;
    row.previewObject.namnd = this.editUnitForm.controls.namnd.value;
    row.previewObject.details.avtalsperiod_start = this.editUnitForm.controls.avtalsperiod_start.value;
    row.previewObject.details.avtalsperiod_slut = this.editUnitForm.controls.avtalsperiod_slut.value;
    row.previewObject.details.enhetschef = this.editUnitForm.controls.enhetschef.value;
    row.previewObject.details.enhetschef_telefon = this.editUnitForm.controls.enhetschef_telefon.value;
    row.previewObject.details.enhetschef_epost = this.editUnitForm.controls.enhetschef_epost.value;
    row.previewObject.details.agare_kod = this.editUnitForm.controls.agarkod.value;
    row.previewObject.details.agare_form = this.editUnitForm.controls.agarform.value;
    row.previewObject.details.regionsovergripandegrupper = this.editUnitForm.controls.regionsovergripandegrupper.value;
    row.previewObject.details.medverkanfamiljecentral = this.editUnitForm.controls.medverkanIFamiljecentral.value;
    row.previewObject.details.kundreferens = this.editUnitForm.controls.kundreferens.value;
    row.previewObject.details.leverantorsid_RD = this.editUnitForm.controls.leverantorsid.value;

    if (row.previewObject.details.agare_form === 'Privat') {
      row.previewObject.details.organisationsnummer = this.editprivateOwnerForm.controls.organisationsnummer.value;
      row.previewObject.details.utbetalningsssätt = this.editprivateOwnerForm.controls.utbetalningssatt.value;
      row.previewObject.details.kontonummer = this.editprivateOwnerForm.controls.kontonummer.value;

    } else {
      row.previewObject.details.organisationsnummer = '';
      row.previewObject.details.utbetalningsssätt = '';
      row.previewObject.details.kontonummer = '';
    }

    // Öka versionen
    row.previewObject.details.versions.push(row.previewObject.details.versions.length + 1);
  }


  updateCardForm(item: ExampleUnit) {
    if (!item.vald) {
      return;
    }

    this.editUnitForm.reset();

    this.editUnitForm.setValue({
      hsaid: item.hsaid,
      avtalskod: item.details.avtalskod,
      enhetskod: item.enhetskod,
      namnd: item.namnd,
      avtalsperiod_start: item.details.avtalsperiod_start,
      avtalsperiod_slut: item.details.avtalsperiod_slut,
      enhetschef: item.details.enhetschef,
      leverantorsid: item.details.leverantorsid_RD,
      enhetschef_telefon: item.details.enhetschef_telefon ? item.details.enhetschef_telefon : '',
      enhetschef_epost: item.details.enhetschef_epost ? item.details.enhetschef_epost : '',
      agare: item.agare,
      agarkod: item.details.agare_kod,
      agarform: item.details.agare_form,
      kundreferens: item.details.kundreferens ? item.details.kundreferens : '',
      regionsovergripandegrupper: item.details.regionsovergripandegrupper ? item.details.regionsovergripandegrupper : '',
      medverkanIFamiljecentral: item.details.medverkanfamiljecentral ? item.details.medverkanfamiljecentral : ''
    });

    if (item.details.agare_form === 'Privat') {
      this.editprivateOwnerForm.controls.organisationsnummer.setValue(item.details.organisationsnummer);
      this.editprivateOwnerForm.controls.utbetalningssatt.setValue(item.details.utbetalningsssätt);
      this.editprivateOwnerForm.controls.kontonummer.setValue(item.details.kontonummer);


      Object.keys(this.editprivateOwnerForm.controls).forEach(key => {
        this.editprivateOwnerForm.controls[key].setValidators([Validators.required]);
        this.editprivateOwnerForm.controls[key].updateValueAndValidity();
      });
    } else {
      Object.keys(this.editprivateOwnerForm.controls).forEach(key => {
        this.editprivateOwnerForm.controls[key].setValidators(null);
        this.editprivateOwnerForm.controls[key].updateValueAndValidity();
      });
    }
    this.editUnitForm.updateValueAndValidity();
  }

  updateNewCardForm() {
    const agare = this.newUnit.agare ? this.newUnit.agare : '';
    this.agarOwnerForm.controls.agare.setValue(agare);

    this.newUnitForm.setValue({
      hsaid: this.newUnit.hsaid,
      avtalskod: this.newUnit.details.avtalskod ? this.newUnit.details.avtalskod : '',
      enhetskod: this.newUnit.enhetskod ? this.newUnit.enhetskod : '',
      enhetschef: this.newUnit.details.enhetschef ? this.newUnit.details.enhetschef : '',
      leverantorsid: this.newUnit.details.leverantorsid_RD ? this.newUnit.details.leverantorsid_RD : '',
      enhetschef_telefon: this.newUnit.details.enhetschef_telefon ? this.newUnit.details.enhetschef_telefon : '',
      enhetschef_epost: this.newUnit.details.enhetschef_epost ? this.newUnit.details.enhetschef_epost : '',

      agarkod: this.newUnit.details.agare_kod ? this.newUnit.details.agare_kod : '',
      agarform: this.newUnit.details.agare_form ? this.newUnit.details.agare_form : '',
      kundreferens: this.newUnit.details.kundreferens ? this.newUnit.details.kundreferens : '',
      regionsovergripandegrupper: this.newUnit.details.regionsovergripandegrupper ? this.newUnit.details.regionsovergripandegrupper : '',
      medverkanIFamiljecentral: this.newUnit.details.medverkanfamiljecentral ? this.newUnit.details.medverkanfamiljecentral : ''
    });

    this.onChangeForm.setValue({
      namnd: this.newUnit.namnd ? this.newUnit.namnd : '',
      avtalsperiod_start: this.newUnit.details.avtalsperiod_start ? this.newUnit.details.avtalsperiod_start : '',
      avtalsperiod_slut: this.newUnit.details.avtalsperiod_slut ? this.newUnit.details.avtalsperiod_slut : '',

    });

    if (this.newUnit.details.agare_form === 'Privat') {
      this.privateOwnerForm.controls.organisationsnummer.setValue(this.newUnit.details.organisationsnummer);
      this.privateOwnerForm.controls.utbetalningssatt.setValue(this.newUnit.details.utbetalningsssätt);
      this.privateOwnerForm.controls.kontonummer.setValue(this.newUnit.details.kontonummer);


      Object.keys(this.privateOwnerForm.controls).forEach(key => {
        this.privateOwnerForm.controls[key].setValidators([Validators.required]);
        this.privateOwnerForm.controls[key].updateValueAndValidity();
      });
    } else {
      Object.keys(this.privateOwnerForm.controls).forEach(key => {
        this.privateOwnerForm.controls[key].setValidators(null);
        this.privateOwnerForm.controls[key].updateValueAndValidity();
      });

      this.newUnitForm.updateValueAndValidity();
    }
  }

  updateCardDropdowns(item: ExampleUnit) {

    this.exempelVersions = [];
    item.details.versions.forEach(x => {

      this.exempelVersions.push({
        displayName: x.toString(),
        value: x.toString(),
        marked: x === item.details.versions.length,
        selected: x === item.details.versions.length
      } as DropdownItem<any>);
    });

    this.changeDetector.detectChanges();
  }

  onCardCancel(row: ExpandableRow<ExampleUnit, any>) {
    this.cardLocked = true;

    row.notifyOnCollapse('Redigering av ' + row.previewObject.enhet + ' avbröts', 'vgr-icon-exclamation');
  }

  onCardSave(event: Event, row: ExpandableRow<ExampleUnit, any>) {
    this.submitted = true;

    if (!this.editprivateOwnerForm.valid || !this.editUnitForm.valid) {
      this.saveCancelComponent.unlocked = true;
      return;
    }
    this.updateRowValues(row);

    this.cardLocked = true;
    if (this.editUnitForm.valid) {
      row.notifyOnCollapse(row.previewObject.enhet + ' sparades', 'vgr-icon-ok-check-green', true);

    }
  }

  onCardUnlocked() {
    this.cardLocked = false;
    this.changeDetector.detectChanges();
    if (this.unitVersions) {
      this.unitVersions.readonly = true;
    }
  }

  openActionPanel() {
    this.showActionPanel = true;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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
    this.newCardLocked = false;
    this.updateNewCardForm();

  }

  onNewUnitCancel() {
    this.actionPanelClose();
    this.newCardLocked = true;
    this.newUnit = null;
  }

  onNewUnitSave() {
    this.submitted = true;

    if (!this.privateOwnerForm.valid || !this.newUnitForm.valid) {
      return;
    }

    this.newUnit.details.avtalskod = this.newUnitForm.controls.avtalskod.value;

    this.newUnit.namnd = this.onChangeForm.controls.namnd.value;
    this.newUnit.details.avtalsperiod_slut = this.onChangeForm.controls.avtalsperiod_slut.value;
    this.newUnit.details.avtalsperiod_start = this.onChangeForm.controls.avtalsperiod_start.value;

    this.newUnit.agare = this.agarOwnerForm.controls.agare.value;
    this.newUnit.details.agare_kod = this.newUnitForm.controls.agarkod.value;
    this.newUnit.details.agare_form = this.newUnitForm.controls.agarform.value;
    if (this.newUnit.details.agare_form === 'Privat') {

      this.newUnit.details.organisationsnummer = this.privateOwnerForm.controls.organisationsnummer.value;
      this.newUnit.details.kontonummer = this.privateOwnerForm.controls.kontonummer.value;
      this.newUnit.details.utbetalningsssätt = this.privateOwnerForm.controls.utbetalningssatt.value;
    }
    this.newUnit.details.leverantorsid_RD = this.newUnitForm.controls.leverantorsid.value;

    this.newUnit.enhetskod = this.newUnitForm.controls.enhetskod.value;
    this.newUnit.enhet = this.selectedUnit;
    this.newUnit.details.enhetschef = this.newUnitForm.controls.enhetschef.value;

    this.newUnit.details.medverkanfamiljecentral = this.newUnitForm.controls.medverkanIFamiljecentral.value;
    this.newUnit.details.versions = [1];
    this.newUnit.isActive = true;

    const newRow = new ExpandableRow<ExampleUnit, ExampleUnit>(this.newUnit);
    newRow.notifyOnCollapse(newRow.previewObject.enhet + ' sparades', 'vgr-icon-ok-check-green');
    this.exampleData.unshift(newRow);

    this.actionPanelClose();
    this.newUnit = null;
  }

  onActionPanelClose() {
    this.actionPanelClose();
  }

  actionPanelClose() {
    this.showActionPanel = false;
    this.addNewUnit = false;
    this.newUnits.forEach(u => u.selected = false);
    this.itemSelected = false;
    this.newCardLocked = true;
    this.newUnitForm.reset();
    this.onChangeForm.reset();
    this.privateOwnerForm.reset();
    this.agarOwnerForm.reset();
    this.submitted = false;
  }

  onPanelExpandedChanged(expanded: boolean) {
    if (!expanded) {
      this.actionPanelClose();
    }
  }

  onSortChanged(event: SortChangedArgs) {
    this.exampleData = this.exampleData.sort((row1, row2) => {
      return row1.previewObject[event.key] > row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? 1 : -1) :
        row1.previewObject[event.key] < row2.previewObject[event.key] ? (event.direction === SortDirection.Ascending ? -1 : 1) : 0;
    });
  }
}
