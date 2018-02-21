import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtertexbox',
  templateUrl: './filtertexbox.component.html',
  styleUrls: ['./filtertexbox.component.scss']
})
export class FiltertexboxComponent implements OnInit {

  @Output() searchvalue: string;

  constructor() { }

  ngOnInit() {
  }

}
