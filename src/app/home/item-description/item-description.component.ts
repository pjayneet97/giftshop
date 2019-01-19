import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/data/item.interface';

@Component({
  selector: 'app-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.scss']
})
export class ItemDescriptionComponent implements OnInit {
  @Input() item:Item
  constructor() { }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
