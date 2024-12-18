import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
import { RowNotification, NotificationType } from '../../../projects/komponentkartan/src/lib';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-title-value',
    templateUrl: './title-value.component.html',
    styleUrls: ['./title-value.component.scss'],
    standalone: false
})
export class TitleValueComponent implements OnInit {
  markupExample = `
  <vgr-title-value-layout>
  <vgr-title-value>
    <vgr-title-value-heading [width]="1" for="bruttobelopp">Bruttobelopp</vgr-title-value-heading>
    <vgr-title-value-container [width]="1">
      <vgr-input id="bruttobelopp" [value]="10000" [suffix]="'kr'" textAlign="right"></vgr-input>
    </vgr-title-value-container>
  </vgr-title-value>
</vgr-title-value-layout>`;

markupExampleCode;

  notification: RowNotification = {
    icon: { name: 'exclamation-circle', color: 'success', solid: true },
    type: NotificationType.Permanent,
    message: 'title-value är nu deklarativ, och använder sig av: title-value-heading & title-value-container',
    done: true,
    removeWhenDone: false
  };
  form: FormGroup;
  locked = false;


  constructor(htmlEncoder: HtmlEncodeService, private fb: FormBuilder) {
    this.markupExampleCode =
            htmlEncoder.prepareHighlightedSection(this.markupExample, 'HTML');
  }

  ngOnInit() {
    this.form = this.fb.group({
      control1:  new FormControl('', [Validators.required]),
      control2: new FormControl('', [Validators.required]),
      control3: new FormControl('', [Validators.required])
    }, { updateOn: 'blur' });
   }
}
