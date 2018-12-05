import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vgr-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() faIcon: string;
  @Input() size: string;

  prefix = 'fas';

  ngOnInit() {
    // console.log(this.size);
  }
}
