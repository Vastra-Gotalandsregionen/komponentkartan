import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'vgr-editable-table-documentation',
  templateUrl: './editable-table-documentation.component.html',
  styleUrls: ['./editable-table-documentation.component.scss']
})
export class EditableTableDocumentationComponent {
  data = [
    {
      produktkod: '010',
      rubrik: 'Ersättning viktad utifrån ålder och kön (kapitation)',
      konto: '5041',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '020',
      rubrik: 'Ersättning viktad utifrån vårdtyngd',
      konto: '5042',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '030',
      rubrik: 'Tolkersättning',
      konto: '5043',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '040',
      rubrik: 'Målrelaterad ersättning för täckningsgrad',
      konto: '5045',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '060',
      rubrik: 'Ersättning baserad på socioekonomi (CNI)',
      konto: '5044',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '070',
      rubrik: 'Ersättning baserad på geografi',
      konto: '5044',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '080',
      rubrik: 'Tillägg för besök från andra vårdcentraler',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: true
    },
    {
      produktkod: '090',
      rubrik: 'Tillägg för besök från andra landsting',
      konto: '5049',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: true
    },
    {
      produktkod: '100',
      rubrik: 'Ersättning för familjecentral',
      konto: '5047',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '110',
      rubrik: 'SÄBO (Ersättning för särskilt boende)',
      konto: '5047',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '115',
      rubrik: 'Korttidsboende',
      konto: '5047',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '120',
      rubrik: 'Avdrag för besök hos andra vårcentraler',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: true
    },
    {
      produktkod: '130',
      rubrik: 'Avdrag för besök hos andra landsting',
      konto: '5049',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: true
    },
    {
      produktkod: '140',
      rubrik: 'Avdrag för besök hos andra specialistläkare i allmänmedicin',
      konto: '5049',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: true
    },
    {
      produktkod: '151',
      rubrik: 'Dos-tjänst',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: false
    },
    {
      produktkod: '152',
      rubrik: 'Receptläkemedel',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: false
    },
    {
      produktkod: '153',
      rubrik: 'Hjälpmedel inom förmån',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: false
    },
    {
      produktkod: '155',
      rubrik: 'Dos-läkemedel',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: false
    },
    {
      produktkod: '156',
      rubrik: 'Inkontinens',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: false
    },
    {
      produktkod: '170',
      rubrik: 'Avdrag för patientavgift (inklusive frikortsavräkning)',
      konto: '3919',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: false
    },
    {
      produktkod: '220',
      rubrik: 'Tillfällig utbetalning/avdrag',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: false
    },
    {
      produktkod: '221',
      rubrik: 'Tillfällig utbetalning/avdrag (som momskompenseras)',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: true
    },
    {
      produktkod: '230',
      rubrik: 'Momskompensation',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: false
    },
    {
      produktkod: '250',
      rubrik: 'Tillägg för besök från andra länder',
      konto: '5047',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: true
    },
    {
      produktkod: '260',
      rubrik: 'Ersättning ST-läkare',
      konto: '5411',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: true
    },
    {
      produktkod: '270',
      rubrik: 'Ersättning från HSS',
      konto: '5447',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: false
    },
    {
      produktkod: '280',
      rubrik: 'Regionövergripande grupper',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: false
    },
    {
      produktkod: '300',
      rubrik: 'Ersättning STRAMA',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '340',
      rubrik: 'Mobil hemsjukvårdsläkare',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '310',
      rubrik: 'Särskild ersättning kväll och helg',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '330',
      rubrik: 'Särskild ersättning för utökat öppethållande',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '350',
      rubrik: 'Särskild ersättning för extern mellanliggande provtagning',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '360',
      rubrik: 'Särskild ersättning för samordnad individuell plan',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '370',
      rubrik: 'Ersättning för PTP-psykologer',
      konto: '5411',
      ansvarOffentlig: '61015',
      ansvarPrivat: '61015',
      momsKompensation: true
    },
    {
      produktkod: '380',
      rubrik: 'Avdrag IS/IT-tjänster Vårdval vårdcentral',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: false
    },
    {
      produktkod: '400',
      rubrik: 'Särskild ersättning förhälsoundersökning',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '420',
      rubrik: 'Särskild ersättning för fast läkarkontakt',
      konto: '5447',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
      momsKompensation: true
    },
    {
      produktkod: '440',
      rubrik: 'Säsongsinfluensavaccinering',
      konto: '5047',
      ansvarOffentlig: '61000',
      ansvarPrivat: '61010',
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

  myForm: FormGroup = new FormGroup({
    myFormArray: new FormArray([]) as FormArray,

  });
  myData: any;
  constructor(private fb: FormBuilder) {
    this.myData = this.myForm.get('myFormArray') as FormArray;
    this.myData.clear;
    this.data2.forEach(data => {
      let date = new Date();
      date.setDate(new Date(+data.datum.substring(0,4), +data.datum.substring(5,7), +data.datum.substring(9,10)).getDate());
      const g =  this.fb.group({
        datum: new FormControl(date),
        text: new FormControl(data.text, [ Validators.maxLength(6) ]),
      });
      this.myData.push(g)
    });
  }

}
