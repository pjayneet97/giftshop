import { Component, OnInit } from '@angular/core';
import { Item } from 'src/data/item.interface';
import { ModalController } from '@ionic/angular';
import { ItemService } from '../services/item.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mode="list"
  items:Item[]
  selectedItem:Item
  constructor(private modalCtrl:ModalController,public itemService:ItemService ){

  }
  ngOnInit(){
    this.items=this.itemService.getAll()
  }


}
