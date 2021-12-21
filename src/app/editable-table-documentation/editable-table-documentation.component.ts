import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'vgr-editable-table-documentation',
  templateUrl: './editable-table-documentation.component.html',
  styleUrls: ['./editable-table-documentation.component.scss']
})
export class EditableTableDocumentationComponent {
  data3 = [];
  data = [
    {
      produktkod: '010',
      rubrik: 'Ersättning viktad utifrån ålder och kön (kapitation)',
      konto: '0041',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '020',
      rubrik: 'Ersättning viktad utifrån vårdtyngd',
      konto: '0042',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '030',
      rubrik: 'Tolkersättning',
      konto: '0089',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '040',
      rubrik: 'Målrelaterad ersättning för täckningsgrad',
      konto: '0255',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '060',
      rubrik: 'Ersättning baserad på socioekonomi (CNI)',
      konto: '0088',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '070',
      rubrik: 'Ersättning baserad på geografi',
      konto: '0088',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '080',
      rubrik: 'Tillägg för besök från andra vårdcentraler',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: true
    },
    {
      produktkod: '090',
      rubrik: 'Tillägg för besök från andra landsting',
      konto: '0090',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: true
    },
    {
      produktkod: '100',
      rubrik: 'Ersättning för familjecentral',
      konto: '0123',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '110',
      rubrik: 'SÄBO (Ersättning för särskilt boende)',
      konto: '0123',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '115',
      rubrik: 'Korttidsboende',
      konto: '0123',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '120',
      rubrik: 'Avdrag för besök hos andra vårcentraler',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: true
    },
    {
      produktkod: '130',
      rubrik: 'Avdrag för besök hos andra landsting',
      konto: '0090',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: true
    },
    {
      produktkod: '140',
      rubrik: 'Avdrag för besök hos andra specialistläkare i allmänmedicin',
      konto: '0090',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: true
    },
    {
      produktkod: '151',
      rubrik: 'Dos-tjänst',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: false
    },
    {
      produktkod: '152',
      rubrik: 'Receptläkemedel',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: false
    },
    {
      produktkod: '153',
      rubrik: 'Hjälpmedel inom förmån',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: false
    },
    {
      produktkod: '155',
      rubrik: 'Dos-läkemedel',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: false
    },
    {
      produktkod: '156',
      rubrik: 'Inkontinens',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: false
    },
    {
      produktkod: '170',
      rubrik: 'Avdrag för patientavgift (inklusive frikortsavräkning)',
      konto: '0390',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: false
    },
    {
      produktkod: '220',
      rubrik: 'Tillfällig utbetalning/avdrag',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: false
    },
    {
      produktkod: '221',
      rubrik: 'Tillfällig utbetalning/avdrag (som momskompenseras)',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: true
    },
    {
      produktkod: '230',
      rubrik: 'Momskompensation',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: false
    },
    {
      produktkod: '250',
      rubrik: 'Tillägg för besök från andra länder',
      konto: '0123',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: true
    },
    {
      produktkod: '260',
      rubrik: 'Ersättning ST-läkare',
      konto: '0011',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: true
    },
    {
      produktkod: '270',
      rubrik: 'Ersättning från HSS',
      konto: '0022',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: false
    },
    {
      produktkod: '280',
      rubrik: 'Regionövergripande grupper',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: false
    },
    {
      produktkod: '300',
      rubrik: 'Ersättning STRAMA',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '340',
      rubrik: 'Mobil hemsjukvårdsläkare',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '310',
      rubrik: 'Särskild ersättning kväll och helg',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '330',
      rubrik: 'Särskild ersättning för utökat öppethållande',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '350',
      rubrik: 'Särskild ersättning för extern mellanliggande provtagning',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '360',
      rubrik: 'Särskild ersättning för samordnad individuell plan',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '370',
      rubrik: 'Ersättning för PTP-psykologer',
      konto: '0011',
      ansvarOffentlig: '56789',
      ansvarPrivat: '56789',
      momsKompensation: true
    },
    {
      produktkod: '380',
      rubrik: 'Avdrag IS/IT-tjänster Vårdval vårdcentral',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: false
    },
    {
      produktkod: '400',
      rubrik: 'Särskild ersättning förhälsoundersökning',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '420',
      rubrik: 'Särskild ersättning för fast läkarkontakt',
      konto: '0022',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: true
    },
    {
      produktkod: '440',
      rubrik: 'Säsongsinfluensavaccinering',
      konto: '0123',
      ansvarOffentlig: '12345',
      ansvarPrivat: '35647',
      momsKompensation: false
    },
  ]
  data2 = [
    {
      nummer: '440',
      datum: '2022-01-01',
      text: 'hej hej'
    },
    {
      nummer: '450',
      datum: '2022-01-02',
      text: 'hej'
    },
    {
      nummer: '460',
      datum: '2022-01-03',
      text: 'hejsan'
    },
    {
      nummer: '470',
      datum: '2022-01-04',
      text: ''
    },
    {
      nummer: '480',
      datum: '2022-01-05',
      text: 'hejdå'
    },
    {
      nummer: '490',
      datum: '2022-01-06',
      text: 'Välkommen!'
    },
    {
      nummer: '500',
      datum: '2022-01-07',
      text: 'hej!'
    },
  ]
  rows = [];
  redigera = true;
  redigera2 = true;

  exampleCode = `
  <vgr-editable-table [editMode]="!redigera" [height]="'500px'">
        <vgr-editable-table-header>
          <vgr-editable-table-header-column [width]="'100px'">Produktkod</vgr-editable-table-header-column>
          <vgr-editable-table-header-column [width]="'350px'">Rubrik</vgr-editable-table-header-column>
          <vgr-editable-table-header-column [width]="'70px'" [align]="'center'">Konto</vgr-editable-table-header-column>
          <vgr-editable-table-header-column [width]="'100px'" [align]="'center'">Ansvar offentlig</vgr-editable-table-header-column>
          <vgr-editable-table-header-column [width]="'100px'" [align]="'center'">Ansvar privat</vgr-editable-table-header-column>
          <vgr-editable-table-header-column [width]="'100px'" [align]="'center'">Momskomp.</vgr-editable-table-header-column>
        </vgr-editable-table-header>
        <vgr-editable-table-row *ngFor="let d of data">
            <vgr-editable-table-column><div><span>61 </span><span style="font-weight: bold;">{{d.produktkod}}</span></div></vgr-editable-table-column>
            <vgr-editable-table-column>
              {{ d.rubrik }}
            </vgr-editable-table-column>
            <vgr-editable-table-column>
              <vgr-input [readonly]="redigera" [value]="d.konto" textAlign="right" [width]="'70px'"></vgr-input>
            </vgr-editable-table-column>
            <vgr-editable-table-column>
              <vgr-input [readonly]="redigera" [value]="d.ansvarOffentlig" textAlign="right" [width]="'100px'"></vgr-input>
            </vgr-editable-table-column>
            <vgr-editable-table-column>
              <vgr-input [readonly]="redigera" [value]="d.ansvarPrivat" textAlign="right" [width]="'100px'"></vgr-input>
            </vgr-editable-table-column>
            <vgr-editable-table-column>
              <vgr-checkbox [checked]="d.momsKompensation" [disabled]="redigera" style="display: inline-block;"></vgr-checkbox>
            </vgr-editable-table-column>
          </vgr-editable-table-row>
      </vgr-editable-table>`;

  exampleCodeMarkup;

  myForm: FormGroup = new FormGroup({
    myFormArray: new FormArray([]) as FormArray,

  });
  myData: any;
  constructor(private fb: FormBuilder, htmlEncoder: HtmlEncodeService) {
    this.exampleCodeMarkup =
      htmlEncoder.prepareHighlightedSection(this.exampleCode, 'HTML');

    this.myData = this.myForm.get('myFormArray') as FormArray;
    this.myData.clear;
    this.data2.forEach(data => {
      let date = new Date();
      date.setDate(new Date(+data.datum.substring(0,4), +data.datum.substring(5,7), +data.datum.substring(9,10)).getDate());
      const g =  this.fb.group({
        datum: new FormControl(date),
        text: new FormControl(data.text, [ Validators.maxLength(6) ]),
        combobox: new FormControl('', [ Validators.required ]),
      });
      this.myData.push(g)
    });
  }

  addData() {
    this.data3.push({})
  }

  removeData() {
    if (this.data3.length > 0){
      this.data3.splice(this.data3.length-1, 1);
    }
  }

}
